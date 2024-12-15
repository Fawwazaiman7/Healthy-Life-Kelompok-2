import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // Redirect based on the current page
      let targetPage = "/";
      if (location.pathname.includes("/makanan")) {
        targetPage = "/makanan";
      } else if (location.pathname.includes("/olahraga")) {
        targetPage = "/olahraga";
      }
      navigate(`${targetPage}?query=${searchQuery.trim()}`);
      setSearchQuery(""); // Clear the input after search
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari artikel..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
