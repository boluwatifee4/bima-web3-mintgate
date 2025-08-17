import abi from "@/contracts/abi.json";
import addr from "@/contracts/address.json";

type AddressJson = { address?: string };

export const CONTRACT_ABI = abi as readonly object[];
export const CONTRACT_ADDRESS = (addr as AddressJson)?.address || "0x0000000000000000000000000000000000000000";
