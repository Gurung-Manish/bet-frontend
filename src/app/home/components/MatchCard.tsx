"use client"; // Add this to ensure the component is client-side

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Using next/navigation for client-side navigation
import { stringify } from 'querystring'; // For encoding the object into query parameters

interface MatchProps {
  matchId: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
}

const MatchCard: React.FC<MatchProps> = ({
  matchId,
  date,
  time,
  team1,
  team2,
  logo1,
  logo2,
  odds,
}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will be triggered only on the client side
  }, []);

  const handleCardClick = () => {
    if (!isClient) return;
  
    const matchData = {
      matchId,
      date,
      time,
      team1,
      team2,
      logo1,
      logo2,
      odds,
    };
  
    // Store the data in sessionStorage
    sessionStorage.setItem("matchData", JSON.stringify(matchData));
  
    // Navigate with only matchId in the URL
    router.push(`/match_detail/${matchId}`);
  };

  if (!isClient) return null; // Ensure nothing is rendered on SSR

  return (
    <div
      onClick={handleCardClick}
      className="space-y-2 bg-[#2E2E30] text-white p-4 rounded-xl flex flex-col items-center w-52 min-h-[160px] cursor-pointer"
    >
      {/* Date and Time */}
      <div className="text-xs text-gray-400">
        {date}, {time}
      </div>

      {/* Teams and VS */}
      <div className="flex items-start justify-center gap-4 mt-3">
        {/* Team 1 */}
        <div className="flex flex-col items-center w-20">
          <div className="w-12 h-12 bg-[#2A2A2C] rounded-full flex items-center justify-center mb-1">
            <img
              src={logo1}
              alt={team1}
              className="w-10 h-10 object-contain aspect-square"
            />
          </div>
          <span className="text-[10px] text-center break-words leading-tight h-[36px] flex items-center justify-center text-ellipsis overflow-hidden">
            {team1}
          </span>
        </div>

        {/* VS */}
        <div className="flex items-center justify-center h-full">
          <span className="text-sm">VS</span>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center w-20">
          <div className="w-12 h-12 bg-[#2A2A2C] rounded-full flex items-center justify-center mb-1">
            <img
              src={logo2}
              alt={team2}
              className="w-10 h-10 object-contain aspect-square"
            />
          </div>
          <span className="text-[10px] text-center break-words leading-tight h-[36px] flex items-center justify-center text-ellipsis overflow-hidden">
            {team2}
          </span>
        </div>
      </div>

      {/* Odds Row */}
      <div className="flex justify-center gap-4 mt-auto">
        {odds.map((odd, index) => (
          <span
            key={index}
            className="bg-[#2A2A2C] px-3 py-1 rounded-lg text-xs border border-[#464649]"
          >
            {odd}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MatchCard;
