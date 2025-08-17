import Providers from "./providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CreatorVault | Token-Gated Digital Downloads",
  description: "Access exclusive downloads with your Creator Pass NFT",
  metadataBase: new URL("https://bima-web3-mintgate.netlify.app"),
  openGraph: {
    title: "CreatorVault | Token-Gated Digital Downloads",
    description: "Access exclusive downloads with your Creator Pass NFT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorVault | Token-Gated Digital Downloads",
    description: "Access exclusive downloads with your Creator Pass NFT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div className="layout">
            <header className="container">
              <nav
                style={{
                  height: "var(--header-height)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {/* ConnectButton will be rendered inside pages */}
              </nav>
            </header>
            <main>
              <div className="container">{children}</div>
            </main>
          </div>
        </body>
      </Providers>
    </html>
  );
}
