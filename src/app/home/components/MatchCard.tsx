import React from "react";

interface MatchProps {
  date: string;
  time: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  odds: [number, number, number];
}

const MatchCard: React.FC<MatchProps> = ({ date, time, team1, team2, logo1, logo2, odds }) => {
    return (
      <div className="bg-[#2E2E30] text-white p-4 rounded-xl flex flex-col items-center w-52 h-40">
        {/* Date and Time */}
        <div className="text-xs text-gray-400">{date}, {time}</div>
  
        {/* Teams Row */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="flex flex-col items-center w-20">
            {/* Logo Container */}
            <div className="w-12 h-12 bg-[#2A2A2C] rounded-full flex items-center justify-center  my-1">
              <img 
                src={logo1} 
                alt={team1} 
                className="w-10 h-10 object-contain aspect-square"
              />
            </div>
            <span className="text-[10px] w-full text-center truncate">{team1}</span>
          </div>
          <span className="text-sm">VS</span>
          <div className="flex flex-col items-center w-20">
            {/* Logo Container */}
            <div className="w-12 h-12 bg-[#2A2A2C] rounded-full flex items-center justify-center my-1">
              <img 
                src={logo2} 
                alt={team2} 
                className="w-10 h-10 object-contain aspect-square"
              />
            </div>
            <span className="text-[10px] w-full text-center truncate">{team2}</span>
          </div>
        </div>
  
        {/* Odds Row */}
        <div className=" flex justify-center gap-4 mt-auto">
          {odds.map((odd, index) => (
            <span 
            key={index} 
            className="bg-[#2A2A2C] px-3 py-1 rounded-lg text-xs border border-[#464649]">
             {odd}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
export default MatchCard;
