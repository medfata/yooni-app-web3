"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import StarsBackground from "@/components/StarsBackground";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle mobile menu
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Handle play button click
  const handlePlayButtonClick = () => {
    window.open('dist/index.html', '_blank');
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header
        onMobileMenuOpen={openMobileMenu}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      <div className="hero text-center p-4 md:p-8 relative z-10 mt-32 md:mt-48">
        <div>
          <h1 className="main-title text-3xl md:text-4xl font-bold mb-4">
            Easiest Way<br />To <span className="highlight">Play</span> and <span className="highlight">Win</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300">
            Experience the universe at your fingertips — All in one place
          </p>

          {/* Beta indicator and countdown */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="countdown">
              This is <span className="highlight">BETA</span> version, the Official launch Soon.
            </div>
          </div>

          <ConnectButton.Custom>
            {({
              account,
              chain,
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
                      <div style={{ display: 'flex', justifyContent:'center', gap: 12 }}>
                        <button
                          className="play-button hidden md:block"
                          onClick={handlePlayButtonClick}
                        >
                          Start Playing
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>

        </div>
      </div>

      <StarsBackground />
    </div>
  );
}
