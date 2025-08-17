"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { useState, useEffect } from "react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getChainName = (id: number) => {
    const chains: Record<number, string> = {
      1: "Ethereum",
      137: "Polygon",
      56: "BSC",
      43114: "Avalanche",
      42161: "Arbitrum",
      10: "Optimism",
      8453: "Base",
      11155111: "Sepolia (Eth) - Testnet 11155111",
    };
    return chains[id] || `Chain ${id}`;
  };

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

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
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #0f172a 0%,
            #581c87 50%,
            #0f172a 100%
          );
          position: relative;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .background-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(120, 119, 198, 0.3) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(120, 119, 198, 0.3) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
          animation: pulse 4s ease-in-out infinite;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          top: 80px;
          left: 80px;
          width: 300px;
          height: 300px;
          background: rgba(6, 182, 212, 0.2);
        }

        .orb-2 {
          bottom: 80px;
          right: 80px;
          width: 400px;
          height: 400px;
          background: rgba(147, 51, 234, 0.2);
          animation-delay: -4s;
        }

        .orb-3 {
          top: 50%;
          left: 50%;
          width: 250px;
          height: 250px;
          background: rgba(236, 72, 153, 0.2);
          transform: translate(-50%, -50%);
          animation-delay: -2s;
        }

        .mouse-follower {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.1) 0%,
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
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .header-section {
          text-align: center;
          margin-bottom: 48px;
        }

        .title-container {
          position: relative;
          display: inline-block;
          margin-bottom: 24px;
        }

        .main-title {
          font-size: 4rem;
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
          animation: pulse 3s ease-in-out infinite;
          margin: 0;
        }

        .title-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(
            90deg,
            rgba(34, 211, 238, 0.5) 0%,
            rgba(168, 85, 247, 0.5) 50%,
            rgba(236, 72, 153, 0.5) 100%
          );
          border-radius: 8px;
          filter: blur(10px);
          opacity: 0.3;
          animation: pulse 3s ease-in-out infinite;
          z-index: -1;
        }

        .subtitle {
          font-size: 1.5rem;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .highlight-cyan {
          color: #22d3ee;
          font-weight: 600;
        }

        .highlight-purple {
          color: #a855f7;
        }

        .card-container {
          position: relative;
        }

        .card-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            90deg,
            #06b6d4 0%,
            #8b5cf6 50%,
            #ec4899 100%
          );
          border-radius: 16px;
          filter: blur(8px);
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }

        .card-container:hover .card-glow {
          opacity: 1;
        }

        .main-card {
          position: relative;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(71, 85, 105, 0.5);
          border-radius: 16px;
          padding: 48px;
          max-width: 600px;
          width: 100%;
        }

        .status-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .status-connected {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(52, 211, 153, 0.3);
        }

        .status-disconnected {
          background: rgba(71, 85, 105, 0.5);
          border: 1px solid rgba(100, 116, 139, 0.3);
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-dot-connected {
          background: #10b981;
          animation: pulse 2s ease-in-out infinite;
        }

        .status-dot-disconnected {
          background: #94a3b8;
        }

        .status-text {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-text-connected {
          color: #6ee7b7;
        }

        .status-text-disconnected {
          color: #cbd5e1;
        }

        .connect-button-container {
          margin-bottom: 32px;
          display: flex;
          justify-content: center;
        }

        .connect-button-wrapper {
          position: relative;
        }

        .connect-button-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%);
          border-radius: 8px;
          filter: blur(8px);
          opacity: 0.25;
          transition: opacity 0.5s ease;
        }

        .connect-button-wrapper:hover .connect-button-glow {
          opacity: 0.5;
        }

        .details-section {
          animation: slideIn 0.5s ease-out;
        }

        .detail-item {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(71, 85, 105, 0.5);
          margin-bottom: 16px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .detail-label {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .detail-address {
          color: #22d3ee;
          font-family: "Monaco", "Menlo", monospace;
          font-size: 0.875rem;
          background: rgba(71, 85, 105, 0.5);
          padding: 4px 12px;
          border-radius: 8px;
        }

        .detail-network {
          color: #a855f7;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .action-button {
          position: relative;
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.125rem;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-top: 32px;
          border: none;
          cursor: pointer;
        }

        .action-button-connected {
          background: linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%);
          color: white;
          transform: scale(1);
        }

        .action-button-connected:hover {
          transform: scale(1.05);
          box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.25);
        }

        .action-button-disabled {
          background: rgba(71, 85, 105, 0.5);
          color: #94a3b8;
          cursor: not-allowed;
        }

        .action-button-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%);
          border-radius: 12px;
          filter: blur(8px);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .action-button-connected:hover .action-button-glow {
          opacity: 0.3;
        }

        .button-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          margin-left: 8px;
          transition: transform 0.3s ease;
        }

        .action-button-connected:hover .arrow-icon {
          transform: translateX(4px);
        }

        .footer {
          margin-top: 64px;
          text-align: center;
        }

        .footer-text {
          color: #64748b;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 3rem;
          }

          .subtitle {
            font-size: 1.25rem;
          }

          .main-card {
            padding: 32px 24px;
            margin: 0 16px;
          }

          .orb-1,
          .orb-2 {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>

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

        <main className="main-content">
          <div className="header-section">
            <div className="title-container">
              <h1 className="main-title">TokenVault</h1>
              <div className="title-glow"></div>
            </div>

            <p className="subtitle">
              Exclusive digital assets.{" "}
              <span className="highlight-cyan">Token-gated access.</span>
              <br />
              <span className="highlight-purple">
                Unlock premium downloads.
              </span>
            </p>
          </div>

          <div className="card-container">
            <div className="card-glow"></div>

            <div className="main-card">
              <div className="status-container">
                <div
                  className={`status-badge ${isConnected ? "status-connected" : "status-disconnected"}`}
                >
                  <div
                    className={`status-dot ${isConnected ? "status-dot-connected" : "status-dot-disconnected"}`}
                  ></div>
                  <span
                    className={`status-text ${isConnected ? "status-text-connected" : "status-text-disconnected"}`}
                  >
                    {isConnected ? "Wallet Connected" : "Wallet Disconnected"}
                  </span>
                </div>
              </div>

              <div className="connect-button-container">
                <div className="connect-button-wrapper">
                  <div className="connect-button-glow"></div>
                  <ConnectButton />
                </div>
              </div>

              {isConnected && (
                <div className="details-section">
                  <div className="detail-item">
                    <div className="detail-row">
                      <span className="detail-label">Address</span>
                      <span className="detail-address">
                        {formatAddress(address)}
                      </span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-row">
                      <span className="detail-label">Network</span>
                      <span className="detail-network">
                        {getChainName(chainId)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <a
                href="/mint"
                className={`action-button ${
                  isConnected
                    ? "action-button-connected"
                    : "action-button-disabled"
                }`}
              >
                <div className="action-button-glow"></div>
                <span className="button-content">
                  <span>
                    {isConnected ? "Enter TokenVault" : "Connect Wallet First"}
                  </span>
                  {isConnected && (
                    <svg
                      className="arrow-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  )}
                </span>
              </a>
            </div>
          </div>

          <div className="footer">
            <p className="footer-text">
              Secured by blockchain technology • Built for the future
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
