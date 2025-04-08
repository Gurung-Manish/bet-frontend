"use client";
import React, { useEffect, useState } from "react";
import HomeBanner from "./HomeBanner";
import MatchHeader from "./MatchHeader";
import MatchCard from "./MatchCard";

// Type definition for match odds
interface MatchOdds {
  odds_calculation_id: string;
  date: string;
  time: string;
  home_team_logo: string;
  away_team_logo: string;
  home_team_id: string;
  home_team_name: string;
  home_team_league: string;
  away_team_id: string;
  away_team_name: string;
  away_team_league: string;
  calculated_home_chance: number;
  calculated_draw_chance: number;
  calculated_away_chance: number;
  home_odds: number;
  draw_odds: number;
  away_odds: number;
}

const MATCHES_PER_PAGE = 3;

const HomeCenter: React.FC = () => {
  const [matches, setMatches] = useState<MatchOdds[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/odds-calculation/calculated-odds");
        if (response.ok) {
          const data = await response.json();
          setMatches(data.calculated_odds);

          const initialIndexes: Record<string, number> = {};
          data.calculated_odds.forEach((match: MatchOdds) => {
            if (!(match.home_team_league in initialIndexes)) {
              initialIndexes[match.home_team_league] = 0;
            }
          });
          setVisibleIndexes(initialIndexes);
        } else {
          console.error("Failed to fetch match data");
        }
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleTimeString(undefined, timeOptions);
  };

  const groupedMatches = matches.reduce((acc: Record<string, MatchOdds[]>, match: MatchOdds) => {
    if (!acc[match.home_team_league]) {
      acc[match.home_team_league] = [];
    }
    acc[match.home_team_league].push(match);
    return acc;
  }, {});

  const handlePrev = (league: string) => {
    setVisibleIndexes((prev) => ({
      ...prev,
      [league]: Math.max(prev[league] - MATCHES_PER_PAGE, 0),
    }));
  };

  const handleNext = (league: string, totalMatches: number) => {
    setVisibleIndexes((prev) => ({
      ...prev,
      [league]: Math.min(prev[league] + MATCHES_PER_PAGE, totalMatches - MATCHES_PER_PAGE),
    }));
  };

  return (
    <div className="space-y-4">
      <HomeBanner />

      {Object.keys(groupedMatches).map((league) => {
        const matchList = groupedMatches[league];
        const index = visibleIndexes[league] || 0;
        const paginatedMatches = matchList.slice(index, index + MATCHES_PER_PAGE);
        const totalPages = Math.ceil(matchList.length / MATCHES_PER_PAGE);
        const isFirstPage = index === 0;
        const isLastPage = index + MATCHES_PER_PAGE >= matchList.length;

        return (
          <div key={league}>
            <MatchHeader
              leagueName={league}
              leagueLogo="https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg"
              onPrev={() => handlePrev(league)}
              onNext={() => handleNext(league, matchList.length)}
              onSeeAll={() => console.log("See All")}
              canPrev={!isFirstPage}
              canNext={!isLastPage}
            />

            <div className="flex gap-2 overflow-x-auto">
              {paginatedMatches.map((match) => (
                <MatchCard
                  matchId={match.odds_calculation_id}
                  key={match.odds_calculation_id}
                  date={formatDate(match.date)}
                  time={match.time.slice(0, 5)}
                  team1={match.home_team_name}
                  team2={match.away_team_name}
                  logo1="https://brandlogos.net/wp-content/uploads/2025/02/liverpool_f.c.-logo_brandlogos.net_vr9dx-300x548.png"
                  logo2="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png"
                  odds={[match.home_odds, match.draw_odds, match.away_odds]}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeCenter;
