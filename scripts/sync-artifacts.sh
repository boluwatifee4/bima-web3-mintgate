#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/contracts/out"
DEST="$ROOT/frontend/src/contracts"

# copy the most recent json ABI (assumes single contract build)
# adjust name later to match your actual contract
ABI_SRC="$SRC/CreatorPass.sol/CreatorPass.json"
if [ ! -f "$ABI_SRC" ]; then
  echo "ABI not found at $ABI_SRC. Build contracts first."
  exit 1
fi

mkdir -p "$DEST"
jq '.abi' "$ABI_SRC" > "$DEST/abi.json"

# address file (updated by deploy script later)
touch "$DEST/address.json"
echo "✅ Synced ABI to frontend/src/contracts/abi.json"
