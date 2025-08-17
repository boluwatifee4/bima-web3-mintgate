// contracts/src/CreatorPass.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorPass is ERC721Enumerable, Ownable {
    uint256 public nextId = 1;
    string private baseURI_;

        constructor(
            string memory name_,
            string memory symbol_,
            string memory baseURIInit
        ) ERC721(name_, symbol_) Ownable(msg.sender) {
            baseURI_ = baseURIInit;
    }

    function mint(uint256 qty) external {
        require(qty > 0, "qty=0");
        for (uint256 i = 0; i < qty; i++) {
            _safeMint(msg.sender, nextId++);
        }
    }

    function setBaseURI(string calldata u) external onlyOwner { baseURI_ = u; }

    function _baseURI() internal view override returns (string memory) {
        return baseURI_;
    }
}
