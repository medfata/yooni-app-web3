"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import StarsBackground from "@/components/StarsBackground";

// Define the type for our leaderboard entries
interface LeaderboardEntry {
  account: string;
  score: number;
  total_games: number;
  level: number; // Score divided by 50
}

export default function Leaderboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle mobile menu
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        // Fetch leaderboard data from the API
        const response = await fetch('/api/game/leaderboard');
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          setLeaderboardData(data.data);
        } else {
          // If no data or error, use empty array
          setLeaderboardData([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
        setLoading(false);
        setLeaderboardData([]);
      }
    };

    fetchLeaderboard();
  }, []);

  // Format account address for display (truncate middle)
  const formatAccount = (account: string) => {
    if (account.length <= 12) return account;
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header onMobileMenuOpen={openMobileMenu} />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
      
      <div className="leaderboard-content text-center p-4 md:p-8 relative z-10 mt-32 w-full">
        <div className="flex flex-col">
          <h1 className="main-title text-3xl md:text-4xl font-bold mb-4">
            Game <span className="highlight">Leaderboard</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-300">
            See who&apos;s leading the competition
          </p>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto bg-black bg-opacity-40 backdrop-blur-md rounded-xl overflow-hidden border border-white border-opacity-10">
              <table className="min-w-full md:w-[40rem] divide-y divide-gray-700">
                <thead className="bg-gray-800 bg-opacity-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      XP
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Games
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaderboardData.map((entry, index) => (
                    <tr 
                      key={entry.account} 
                      className={index < 3 ? "bg-gradient-to-r from-transparent to-purple-900 bg-opacity-30" : ""}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`
                            flex items-center justify-center w-8 h-8 rounded-full font-bold
                            ${index === 0 ? 'bg-yellow-500 text-black' : 
                              index === 1 ? 'bg-gray-300 text-black' : 
                              index === 2 ? 'bg-amber-600 text-black' : 
                              'bg-gray-700 text-white'}
                          `}>
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{formatAccount(entry.account)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        { Math.floor(entry.score / 50) }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {entry.total_games}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {leaderboardData.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  No leaderboard data available yet. Start playing to appear here!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <StarsBackground />
      
      {/* Social Media Links and Copyright */}
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
          All rights are reserved for Yoonivee - 2025
        </div>
      </footer>
    </div>
  );
} 