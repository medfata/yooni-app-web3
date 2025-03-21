"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayClick?: () => void;
}

export default function MobileMenu({ isOpen, onClose, onPlayClick }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      <button 
        className="mobile-menu-close" 
        aria-label="Close menu"
        onClick={onClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <Link href="/" className={pathname === "/" ? "active" : ""} onClick={onClose}>Home</Link>
      <Link href="/marketplace" className={pathname === "/marketplace" ? "active" : ""} onClick={onClose}>Market Place</Link>
      <Link href="#" className={pathname === "/about" ? "active" : ""} onClick={onClose}>About</Link>
      
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
    </div>
  );
} 