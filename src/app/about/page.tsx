"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import StarsBackground from "@/components/StarsBackground";

export default function About() {
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

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header
        onMobileMenuOpen={openMobileMenu}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      <div className="container mx-auto p-4 md:p-8 relative z-10 mt-24 md:mt-32 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="highlight">Yooni VEE</span>
          </h1>
          
          <p className="text-lg mb-8">
            Yooni VEE is an exciting mini-game on the Soneuim chain, where our community can play, earn XP, and have the opportunity to convert XP into Yooni tokens. To reward our early supporters, we're launching a free mint NFT collection, giving holders a special chance to receive an airdrop allocation of Yooni tokens.
          </p>

          <div className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              <span className="highlight">Gameplay & XP System</span>
            </h2>
            
            <h3 className="text-xl font-semibold mb-2">How does the XP earning system work in Yooni VEE?</h3>
            <p className="mb-4 text-gray-300">
              Players can participate in the Yooni VEE mini-game on the Soneuim chain and earn XP based on their performance. XP is rewarded for completing in-game activities, achieving milestones, and ranking on the leaderboard.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">What is the process for converting XP into Yooni tokens?</h3>
            <p className="mb-4 text-gray-300">
              Players who accumulate XP will have the opportunity to convert it into Yooni tokens at a later stage. The conversion ratio and claim process will be announced before the token distribution begins.
            </p>
          </div>

          <div className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              <span className="highlight">NFT Collection & Airdrop</span>
            </h2>
            
            <h3 className="text-xl font-semibold mb-2">When will the free mint for the NFT collection take place?</h3>
            <p className="mb-4 text-gray-300">
              The free mint for Yooni's NFT collection will be announced soon. Early supporters will get a chance to mint these NFTs at no cost.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">How will the airdrop allocation be distributed to NFT holders?</h3>
            <p className="mb-4 text-gray-300">
              NFT holders will be eligible for a special airdrop allocation of Yooni tokens. The allocation will be based on specific criteria, such as the number of NFTs held and staking participation. More details will be shared before the airdrop event.
            </p>
          </div>

          <div className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              <span className="highlight">Participation & Eligibility</span>
            </h2>
            
            <h3 className="text-xl font-semibold mb-2">Are there any requirements to participate in the mini-game or NFT mint?</h3>
            <p className="mb-4 text-gray-300">
              No special requirements are needed to play Yooni VEE. However, early supporters will have priority access to the free NFT mint.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Will there be any special perks for NFT holders within the game?</h3>
            <p className="mb-4 text-gray-300">
              Yes! NFT holders may receive exclusive in-game benefits such as bonus XP, special abilities, or additional token rewards. More details on these perks will be revealed closer to launch.
            </p>
          </div>
        </div>
      </div>

      <StarsBackground />
      
      {/* Social Media Links and Copyright - Same as home page */}
      <footer className="w-full text-center py-6 relative z-10 mt-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://x.com/Yoonivee" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://discord.gg/GV2xpZ7kpU" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>
        </div>
        <div className="text-gray-400 text-sm">
            © 2025 Yoonivee. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 