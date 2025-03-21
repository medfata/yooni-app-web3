"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface HeaderProps {
  onMobileMenuOpen: () => void;
  onPlayClick?: () => void;
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="header flex justify-between items-center p-4 md:p-8 bg-black bg-opacity-30 backdrop-blur-md fixed top-0 left-0 right-0 z-10 rounded-full m-4 md:m-40 w-full md:w-auto border border-white border-opacity-5">
      <div className="logo-container">
        <Image src="/logo.png" alt="Game Logo" className="logo-header w-auto h-7" width={120} height={28} />
      </div>
      <nav className="nav-links flex gap-8">
        <Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
        <Link href="/marketplace" className={pathname === "/marketplace" ? "active" : ""}>Market Place</Link>
        <Link href="#" className={pathname === "/about" ? "active" : ""}>About</Link>
      </nav>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="play-button"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="play-button"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="play-button"
                    >
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>

      <button
        className="mobile-menu-button"
        aria-label="Open menu"
        onClick={onMobileMenuOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </header>
  );
} 