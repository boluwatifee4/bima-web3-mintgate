"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  // useChainId,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

const contract = {
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi: CONTRACT_ABI,
};

export default function MintPage() {
  const { address, isConnected } = useAccount();
  // const chainId = useChainId();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mintCount, setMintCount] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Reads
  const {
    data: totalSupply,
    refetch: refetchSupply,
    isLoading: loadingSupply,
  } = useReadContract({
    ...contract,
    functionName: "totalSupply",
    query: { enabled: !!contract.address },
  });

  const { data: myBal, refetch: refetchBal } = useReadContract({
    ...contract,
    functionName: "balanceOf",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address && !!contract.address },
  });

  // Write
  const { writeContract, data: txHash, isPending } = useWriteContract();

  const onMint = () => {
    if (!isConnected) return toast.error("Connect your wallet first.");
    writeContract(
      { ...contract, functionName: "mint", args: [mintCount] },
      {
        onError: (e: { shortMessage?: string } | Error) =>
          toast.error(
            (e as { shortMessage?: string })?.shortMessage || "Mint failed",
          ),
      },
    );
  };

  // Wait for confirmation
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Refresh reads after success
  if (isSuccess) {
    refetchSupply();
    refetchBal();
  }

  const hasPass = ((myBal as bigint) || BigInt(0)) > BigInt(0);

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(2deg);
          }
          66% {
            transform: translateY(8px) rotate(-1deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #0f172a 0%,
            #581c87 30%,
            #1e1b4b 70%,
            #0f172a 100%
          );
          position: relative;
          overflow: hidden;
          margin: 0;
          padding: 24px;
        }

        .background-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(120, 119, 198, 0.2) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(120, 119, 198, 0.2) 1px,
              transparent 1px
            );
          background-size: 60px 60px;
          animation: pulse 6s ease-in-out infinite;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: float 10s ease-in-out infinite;
        }

        .orb-1 {
          top: 10%;
          left: 15%;
          width: 350px;
          height: 350px;
          background: rgba(6, 182, 212, 0.15);
        }

        .orb-2 {
          bottom: 15%;
          right: 10%;
          width: 450px;
          height: 450px;
          background: rgba(147, 51, 234, 0.15);
          animation-delay: -5s;
        }

        .orb-3 {
          top: 60%;
          left: 60%;
          width: 280px;
          height: 280px;
          background: rgba(236, 72, 153, 0.15);
          animation-delay: -2.5s;
        }

        .mouse-follower {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.08) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.3s ease-out;
          transform: translate(-50%, -50%);
        }

        .main-content {
          position: relative;
          z-index: 10;
          max-width: 600px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .page-title {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(
            90deg,
            #22d3ee 0%,
            #a855f7 50%,
            #ec4899 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          position: relative;
        }

        .page-title::after {
          content: "";
          position: absolute;
          inset: -8px;
          background: linear-gradient(
            90deg,
            rgba(34, 211, 238, 0.3) 0%,
            rgba(168, 85, 247, 0.3) 50%,
            rgba(236, 72, 153, 0.3) 100%
          );
          border-radius: 12px;
          filter: blur(20px);
          z-index: -1;
          animation: pulse 4s ease-in-out infinite;
        }

        .connect-wrapper {
          position: relative;
        }

        .connect-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%);
          border-radius: 12px;
          filter: blur(10px);
          opacity: 0.3;
          transition: opacity 0.5s ease;
        }

        .connect-wrapper:hover .connect-glow {
          opacity: 0.6;
        }

        .grid-container {
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          margin-bottom: 40px;
        }

        .card {
          position: relative;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(71, 85, 105, 0.3);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
        }

        .card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.5) 0%,
            rgba(168, 85, 247, 0.5) 50%,
            rgba(236, 72, 153, 0.5) 100%
          );
          border-radius: 20px;
          filter: blur(2px);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
        }

        .card:hover::before {
          opacity: 0.4;
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(168, 85, 247, 0.5);
        }

        .card-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #22d3ee, #a855f7);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-item {
          background: rgba(30, 41, 59, 0.6);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(168, 85, 247, 0.3);
          transform: translateX(4px);
        }

        .stat-label {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .loading-shimmer {
          position: relative;
          overflow: hidden;
          background: rgba(148, 163, 184, 0.1);
          border-radius: 8px;
          height: 24px;
          width: 80px;
        }

        .loading-shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        .button-group {
          display: flex;
          gap: 16px;
          flex-direction: column;
        }

        .primary-button {
          position: relative;
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .primary-button::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899);
          border-radius: 16px;
          filter: blur(8px);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .primary-button:hover::before {
          opacity: 0.7;
        }

        .primary-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -12px rgba(168, 85, 247, 0.4);
        }

        .primary-button:disabled {
          background: rgba(71, 85, 105, 0.5);
          color: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }

        .secondary-button {
          width: 100%;
          padding: 16px 24px;
          background: rgba(15, 23, 42, 0.8);
          color: #f1f5f9;
          border: 1px solid rgba(71, 85, 105, 0.5);
          border-radius: 16px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .secondary-button:hover {
          background: rgba(30, 41, 59, 0.9);
          border-color: rgba(168, 85, 247, 0.5);
          transform: translateY(-2px);
          color: #22d3ee;
        }

        .tx-hash {
          font-family: "Monaco", "Menlo", monospace;
          font-size: 0.875rem;
          background: rgba(15, 23, 42, 0.9);
          padding: 20px;
          border-radius: 12px;
          word-break: break-all;
          margin-bottom: 24px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          color: #22d3ee;
          position: relative;
          overflow: hidden;
        }

        .tx-hash::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(34, 211, 238, 0.1),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        .external-link {
          display: block;
          text-align: center;
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.8);
          color: #f1f5f9;
          text-decoration: none;
          border-radius: 12px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          transition: all 0.3s ease;
          margin-bottom: 12px;
          position: relative;
          overflow: hidden;
        }

        .external-link::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.1),
            rgba(168, 85, 247, 0.1)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .external-link:hover::before {
          opacity: 1;
        }

        .external-link:hover {
          border-color: rgba(34, 211, 238, 0.5);
          transform: translateY(-2px);
          color: #22d3ee;
        }

        .success-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .success-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .header {
            flex-direction: column;
            text-align: center;
          }

          .grid-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .card {
            padding: 24px;
          }

          .container {
            padding: 16px;
          }
        }
      `}</style>

      <Toaster
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.9)",
            color: "#f1f5f9",
            border: "1px solid rgba(71, 85, 105, 0.5)",
            backdropFilter: "blur(20px)",
          },
        }}
      />

      <div className="container">
        <div className="background-grid"></div>

        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>

        <div
          className="mouse-follower"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        ></div>

        <div className="main-content">
          <div className="header">
            <h1 className="page-title">Creator Pass</h1>
            <div className="connect-wrapper">
              <div className="connect-glow"></div>
              <ConnectButton />
            </div>
          </div>

          <div className="grid-container">
            <div className="card">
              <h2 className="card-title">
                <div className="title-icon">🎫</div>
                Mint Your Pass
              </h2>

              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Total Supply</div>
                  <div className="stat-value">
                    {loadingSupply ? (
                      <div className="loading-shimmer"></div>
                    ) : (
                      <>
                        {String(totalSupply ?? BigInt(0))}
                        {hasPass && (
                          <div className="success-badge">
                            <div className="success-dot"></div>
                            You own a pass!
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">Your Passes</div>
                  <div className="stat-value">
                    {String((myBal as bigint) ?? BigInt(0))}
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button
                  className="primary-button"
                  onClick={onMint}
                  disabled={!isConnected || isPending || confirming || hasPass}
                >
                  {isPending
                    ? "Submitting Transaction..."
                    : confirming
                      ? "Confirming on Blockchain..."
                      : hasPass
                        ? "✅ You already have a pass"
                        : "🚀 Mint Pass (Free)"}
                </button>

                {hasPass && (
                  <button
                    className="secondary-button"
                    onClick={() => (window.location.href = "/download")}
                  >
                    🔓 Access Premium Downloads
                  </button>
                )}
              </div>
            </div>

            {txHash && (
              <div className="card">
                <h2 className="card-title">
                  <div className="title-icon">📋</div>
                  Transaction Details
                </h2>

                <div className="tx-hash">{txHash}</div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    🔍 View Transaction on Etherscan
                  </a>
                  <a
                    href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    📜 View Contract on Etherscan
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
