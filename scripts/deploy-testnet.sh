#!/usr/bin/env bash
set -euo pipefail
command -v jq >/dev/null 2>&1 || { echo >&2 "Please install jq"; exit 1; }

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/contracts"

# export env vars from contracts/.env
if [ -f ".env" ]; then
  set -a
  source .env
  set +a
else
  echo "❌ contracts/.env not found"; exit 1
fi

# Build
forge build

# Deploy (stdout JSON)
RAW_JSON=$(forge script script/Deploy.s.sol:Deploy \
  --rpc-url "${SEPOLIA_RPC:-https://rpc.sepolia.org}" \
  --broadcast \
  --json)

# Try stdout first
CONTRACT_ADDRESS=$(echo "$RAW_JSON" | jq -r '.. | .contract_address? // .deployedTo? // .contractAddress? // empty' | head -n1)

# Fallback: read broadcast file
if [ -z "${CONTRACT_ADDRESS:-}" ]; then
  CHAIN_ID=$(echo "$RAW_JSON" | jq -r '.. | .chain? // .chainId? // empty' | head -n1)
  CHAIN_ID=${CHAIN_ID:-11155111}
  FILE="$ROOT/contracts/broadcast/Deploy.s.sol/$CHAIN_ID/run-latest.json"
  if [ -f "$FILE" ]; then
    CONTRACT_ADDRESS=$(jq -r '.transactions[0].contractAddress // .receipts[0].contractAddress // empty' "$FILE")
  fi
fi

if [ -z "${CONTRACT_ADDRESS:-}" ]; then
  echo "❌ Could not parse contract address."
  echo "$RAW_JSON"
  exit 1
fi

mkdir -p "$ROOT/frontend/src/contracts"
echo "{\"address\":\"$CONTRACT_ADDRESS\"}" > "$ROOT/frontend/src/contracts/address.json"

"$ROOT/scripts/sync-artifacts.sh"
echo "✅ Deploy pipeline complete. Address: $CONTRACT_ADDRESS"
