// contracts/script/Deploy.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import { CreatorPass } from "../src/CreatorPass.sol"; // 👈 relative import

contract Deploy is Script {
    function run() external returns (address deployed) {
        // Safer key loading: keep hex key (with 0x) in .env
        bytes32 pkBytes = vm.envBytes32("PRIVATE_KEY");
        uint256 pk = uint256(pkBytes);

        vm.startBroadcast(pk);

        CreatorPass pass = new CreatorPass(
            "Creator Pass",
            "CPASS",
            "ipfs://CID_PLACEHOLDER/"
        );

        vm.stopBroadcast();

        console2.log("Deployed CreatorPass at:", address(pass));
        return address(pass);
    }
}
