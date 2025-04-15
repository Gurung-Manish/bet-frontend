import React from "react";
import teamLogos from "../../../home/components/teamLogos";

interface MatchProps {
  date: string;
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  score: string;
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

const HeadToHeadTab: React.FC<{ matches: MatchProps[] }> = ({ matches }) => {
  return (
    <div className="flex flex-col space-y-3">
      {matches.map((match, index) => (
        <div
          key={index}
          className="text-white p-2 flex items-center w-full min-w-[400px] max-w-[700px] justify-between gap-4 border-b border-[rgba(255,255,255,0.1)]"
        >
          {/* Date */}
          <div className="text-[10px] text-gray-400 ">{formatDate(match.date)}</div>

          {/* Teams Row */}
          <div className="flex items-center justify-center flex-1 gap-3">
            {/* Team 1 */}
            <div className="flex flex items-center justify-center text-right leading-tight">
              <span className="text-xs">{match.team1}</span>
              <img src={teamLogos[match.team1]} alt={match.team1} className="w-8 h-8 object-contain p-1 mt-1" />
            </div>
          
            {/* Score */}
            <span className="text-xs font-semibold w-12 text-center">{match.score}</span>

            {/* Team 2 */}
            <div className="flex flex items-center  justify-center text-left leading-tight">
              <img src={teamLogos[match.team2]} alt={match.team2} className="w-8 h-8 object-contain p-1 mb-1" />
              <span className="text-xs">{match.team2}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadToHeadTab;
