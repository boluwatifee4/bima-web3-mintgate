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
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { data: myBal } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  const canDownload = ((myBal as bigint) || BigInt(0)) > BigInt(0);

  const handleDownload = () => {
    if (!address || !canDownload) return;
    // Direct download link to the public file
    const a = document.createElement("a");
    a.href = "/downloads/creator-pass.png";
    a.download = "creator-pass.png";
    setImgUrl("/downloads/creator-pass.png");
    setDownloadCount((prev) => prev + 1);
    a.click();
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
            transform: translateY(30px);
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
            transform: translateY(-12px) rotate(1.5deg);
          }
          66% {
            transform: translateY(6px) rotate(-0.5deg);
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

        @keyframes downloadPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(34, 211, 238, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 211, 238, 0);
          }
        }

        .container {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #0f172a 0%,
            #581c87 25%,
            #1e1b4b 75%,
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
            linear-gradient(rgba(120, 119, 198, 0.15) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(120, 119, 198, 0.15) 1px,
              transparent 1px
            );
          background-size: 80px 80px;
          animation: pulse 8s ease-in-out infinite;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          animation: float 12s ease-in-out infinite;
        }

        .orb-1 {
          top: 20%;
          left: 20%;
          width: 400px;
          height: 400px;
          background: rgba(6, 182, 212, 0.12);
        }

        .orb-2 {
          bottom: 20%;
          right: 15%;
          width: 500px;
          height: 500px;
          background: rgba(147, 51, 234, 0.12);
          animation-delay: -6s;
        }

        .orb-3 {
          top: 70%;
          left: 70%;
          width: 320px;
          height: 320px;
          background: rgba(236, 72, 153, 0.12);
          animation-delay: -3s;
        }

        .mouse-follower {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.06) 0%,
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
          max-width: 1200px;
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
          font-size: 3.5rem;
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
          inset: -12px;
          background: linear-gradient(
            90deg,
            rgba(34, 211, 238, 0.25) 0%,
            rgba(168, 85, 247, 0.25) 50%,
            rgba(236, 72, 153, 0.25) 100%
          );
          border-radius: 16px;
          filter: blur(24px);
          z-index: -1;
          animation: pulse 5s ease-in-out infinite;
        }

        .connect-wrapper {
          position: relative;
        }

        .connect-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%);
          border-radius: 12px;
          filter: blur(12px);
          opacity: 0.4;
          transition: opacity 0.5s ease;
        }

        .connect-wrapper:hover .connect-glow {
          opacity: 0.7;
        }

        .content-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .main-card {
          position: relative;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(71, 85, 105, 0.3);
          border-radius: 24px;
          padding: 48px;
          text-align: center;
          animation: slideIn 0.6s ease-out;
        }

        .main-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.4) 0%,
            rgba(168, 85, 247, 0.4) 50%,
            rgba(236, 72, 153, 0.4) 100%
          );
          border-radius: 24px;
          filter: blur(2px);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
        }

        .main-card:hover::before {
          opacity: 0.3;
        }

        .card-title {
          font-size: 2rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .title-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #22d3ee, #a855f7);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .card-subtitle {
          color: #94a3b8;
          font-size: 1.125rem;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .status-message {
          background: rgba(30, 41, 59, 0.6);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          margin-bottom: 24px;
        }

        .access-required {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.05);
        }

        .access-granted {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }

        .action-button {
          position: relative;
          padding: 16px 32px;
          background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          text-decoration: none;
          display: inline-block;
        }

        .action-button::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899);
          border-radius: 16px;
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .action-button:hover::before {
          opacity: 0.8;
        }

        .action-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.5);
        }

        .download-section {
          background: rgba(15, 23, 42, 0.9);
          border-radius: 20px;
          padding: 32px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }

        .download-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(34, 211, 238, 0.8),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        .download-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .download-info {
          flex: 1;
          text-align: left;
        }

        .download-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .download-description {
          color: #94a3b8;
          font-size: 1rem;
          margin: 0;
        }

        .download-button {
          position: relative;
          padding: 14px 28px;
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .download-button:hover {
          animation: downloadPulse 1s ease-out;
        }

        .stats-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(34, 211, 238, 0.2);
          color: #22d3ee;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid rgba(34, 211, 238, 0.3);
        }

        .preview-section {
          margin-top: 32px;
          background: rgba(15, 23, 42, 0.9);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          animation: slideIn 0.6s ease-out 0.3s both;
        }

        .preview-title {
          color: #94a3b8;
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .preview-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .preview-image::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.3),
            rgba(168, 85, 247, 0.3)
          );
          border-radius: 18px;
          filter: blur(4px);
          z-index: -1;
          animation: pulse 3s ease-in-out infinite;
        }

        .success-indicator {
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
          margin-top: 16px;
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
            font-size: 2.5rem;
          }

          .header {
            flex-direction: column;
            text-align: center;
          }

          .main-card {
            padding: 32px 24px;
          }

          .download-item {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }

          .download-info {
            text-align: center;
          }

          .container {
            padding: 16px;
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

        <div className="main-content">
          <div className="header">
            <h1 className="page-title">Downloads</h1>
            <div className="connect-wrapper">
              <div className="connect-glow"></div>
              <ConnectButton />
            </div>
          </div>

          <div className="content-wrapper">
            {!isConnected ? (
              <div className="main-card">
                <h2 className="card-title">
                  <div className="title-icon">🔌</div>
                  Connect Your Wallet
                </h2>
                <p className="card-subtitle">
                  Connect your wallet to access exclusive premium downloads
                </p>
                <div className="status-message">
                  <p style={{ color: "#94a3b8", margin: 0 }}>
                    Your wallet connection is required to verify your Creator
                    Pass ownership
                  </p>
                </div>
              </div>
            ) : !canDownload ? (
              <div className="main-card">
                <h2 className="card-title">
                  <div className="title-icon">🔒</div>
                  Access Required
                </h2>
                <p className="card-subtitle">
                  You need to own a Creator Pass to access premium downloads
                </p>
                <div className="status-message access-required">
                  <p style={{ color: "#f87171", margin: 0, fontWeight: "500" }}>
                    ❌ No Creator Pass detected in your wallet
                  </p>
                </div>
                <a href="/mint" className="action-button">
                  🎫 Get Creator Pass
                </a>
              </div>
            ) : (
              <div className="main-card">
                <h2 className="card-title">
                  <div className="title-icon">🎁</div>
                  Available Downloads
                </h2>
                <p className="card-subtitle">
                  Premium content exclusively for Creator Pass holders
                </p>

                <div className="status-message access-granted">
                  <p style={{ color: "#10b981", margin: 0, fontWeight: "500" }}>
                    ✅ Creator Pass verified • Access granted
                  </p>
                </div>

                <div className="download-section">
                  {downloadCount > 0 && (
                    <div className="stats-badge">
                      Downloaded {downloadCount}x
                    </div>
                  )}

                  <div className="download-item">
                    <div className="download-info">
                      <h3 className="download-title">🖼️ Creator Pass Asset</h3>
                      <p className="download-description">
                        High-quality digital asset • Exclusive design • Premium
                        resolution
                      </p>
                    </div>
                    <button
                      className="download-button"
                      onClick={handleDownload}
                    >
                      <span>📥</span>
                      Download
                    </button>
                  </div>
                </div>

                {downloadCount > 0 && (
                  <div className="success-indicator">
                    <div className="success-dot"></div>
                    Download successful!
                  </div>
                )}

                {imgUrl && (
                  <div className="preview-section">
                    <p className="preview-title">👁️ Preview</p>
                    <div className="preview-image">
                      <Image
                        src={imgUrl}
                        alt="Creator Pass Asset"
                        width={800}
                        height={600}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "16px",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
