import abi from "@/contracts/abi.json";
import addr from "@/contracts/address.json";

export const CONTRACT_ABI = abi as any;
export const CONTRACT_ADDRESS = (addr as any)?.address || "0x0000000000000000000000000000000000000000";
