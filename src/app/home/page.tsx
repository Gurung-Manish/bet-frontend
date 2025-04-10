"use client";
import React, { useState } from "react";
import HomeCenter from "./components/HomeCenter";
import HomeSidebar from "./components/HomeSidebar";
import ValueForMoney from "./components/ValueForMoney";

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const handleSelectCountry = (country: string | null) => {
    setSelectedCountry(country);
  };

  const handleSelectLeague = (league: string | null) => {
    setSelectedLeague(league);
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Sidebar (Left Side) */}
      <div className="w-50">
        <HomeSidebar 
          onSelectCountry={handleSelectCountry} 
          onSelectLeague={handleSelectLeague}
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
        />
        
      </div>

      {/* Main Content (Right Side) */}
      <div className="flex-1">
        <HomeCenter selectedCountry={selectedCountry} 
        selectedLeague={selectedLeague} 
        setSelectedLeague={setSelectedLeague} />
      </div>

      <div className="w-60">
        <ValueForMoney />
      </div>
    </div>
  );
}
