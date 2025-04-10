import { useState } from "react";
import InfoBox from "./InfoBox";

type HomeSidebarProps = {
  onSelectCountry: (country: string | null) => void;
  onSelectLeague: (league: string | null) => void;
  selectedCountry: string | null;
  selectedLeague: string | null;
};

export default function HomeSidebar({
  onSelectCountry,
  onSelectLeague,
  selectedCountry,
  selectedLeague,
}: HomeSidebarProps) {


  // Handle country selection
  const handleCountryClick = (country: string) => {
    onSelectCountry(country);
    onSelectLeague(null); // Clear league
  };

  // Handle league selection
  const handleLeagueClick = (league: string) => {
    onSelectLeague(league);
    onSelectCountry(null); // Clear country
  };

  const clearCountry = () => onSelectCountry(null);
  const clearLeague = () => onSelectLeague(null);

  return (
    <div className="space-y-4">
      <InfoBox
        title="Top Leagues"
        items={[
          { name: "English Premier League", imageUrl: "https://rightanglecreative.co.uk/wp-content/uploads/2020/04/Blog-Post-260816-Premier-League-Logo-Thumbnail.jpg" },
          { name: "Scottish Premier League", imageUrl: "https://www.sportmonks.com/wp-content/uploads/2022/11/Premiershi.png" },
          { name: "English Championship", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jsCrL9uViiHZoazGjJYXfdsQQP7xu8smYw&s" },
          { name: "Scottish Championship", imageUrl: "https://www.sportmonks.com/wp-content/uploads/2022/11/Premiershi.png" }
        ]}
        onItemClick={handleLeagueClick}
        selectedItem={selectedLeague}
        onClear={clearLeague}
      />

      <InfoBox
        title="Country"
        items={[
          { name: "England", imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/2560px-Flag_of_England.svg.png" },
          { name: "Scotland", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWBX3UFI58I0oVV9ufOCtY6qwXf7CkEzdtEA&s" },
        ]}
        onItemClick={handleCountryClick}
        selectedItem={selectedCountry}
        onClear={clearCountry}
      />
    </div>
  );
}
