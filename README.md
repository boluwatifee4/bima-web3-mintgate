# CreatorVault | Token-Gated Digital Downloads

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Ethereum](https://img.shields.io/badge/blockchain-Ethereum-blue.svg)](https://ethereum.org/)
[![NFTs](https://img.shields.io/badge/topic-NFTs-blue.svg)](https://opensea.io/)

## Introduction

CreatorVault is a web3 application that enables creators to offer exclusive digital downloads gated by token ownership. This project allows creators to control access to their content, providing a secure and verifiable way to distribute digital assets to their community. Key features include token-gated access, secure file storage, and a user-friendly interface for both creators and collectors.

## Features

*   **Token-Gated Access:** Restrict access to digital downloads based on NFT ownership.
*   **Secure File Storage:** Utilize a secure and reliable storage solution for digital assets.
*   **User-Friendly Interface:** Intuitive interface for creators to manage content and collectors to access downloads.
*   **Web3 Integration:** Seamless integration with Ethereum and other web3 technologies.

## Installation

To get started with CreatorVault, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd bima-web3-mintgate
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    cd frontend
    npm install
    cd ..
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```
    CONTRACT_ADDRESS=<your_contract_address>
    ALCHEMY_API_KEY=<your_alchemy_api_key>
    ```

    Replace `<your_contract_address>` with the address of your deployed smart contract and `<your_alchemy_api_key>` with your Alchemy API key.

4.  **Build the frontend:**

    ```bash
    npm run build
    ```

## Usage

1.  **Deploy the smart contract:** (This step assumes you have a smart contract ready.  The provided files do not include a contract, so this is a placeholder.)

    ```bash
    npm run deploy:testnet
    ```

2.  **Run the development server:**

    ```bash
    npm run dev:web
    ```

    This will start the frontend development server.  You can then access the application in your web browser.

3.  **Connect your wallet:**  Use a web3-enabled wallet (e.g., MetaMask) to connect to the application.

4.  **Mint or acquire the required NFT:**  Obtain the NFT that grants access to the digital download.

5.  **Access the download:**  Navigate to the download page and access the gated content.

**Example Code Snippet (Frontend - `frontend/src/app/download/page.tsx`)**

This code snippet demonstrates how to use the `useAccount` and `useReadContract` hooks from the `wagmi` library to check if a user is connected and has the required token to access the download.

```typescript
"use client";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DownloadPage() {
  const { address, isConnected } = useAccount();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [down...
```

## Contributing

Contributions are welcome!  Please follow these guidelines:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix.
3.  **Make your changes** and commit them with clear and concise messages.
4.  **Submit a pull request.**

## License

This project is licensed under the [ISC License](LICENSE).

## Roadmap

*   Implement secure file storage using IPFS or similar.
*   Add creator dashboard for managing content and access controls.
*   Integrate with more NFT marketplaces.
*   Support for multiple token standards (ERC-721, ERC-1155).
*   Improve error handling and user feedback.