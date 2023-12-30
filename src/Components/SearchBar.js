// SearchBar.js

import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <nav className="search-bar">
        <div className="logo">
            <img src={require("../images/Logo.png")} alt="Logo" />
            <img src={require("../images/LogoName.png")} alt="Logo" />
        </div>

        <div className="searchInput">
            <img src={require("../images/search.png")} alt="search" />
            <input
                type="text"
                placeholder="Search for books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        
        <div className="btn">
            <button onClick={handleSearch}>Search</button>
        </div>

        <div className="user">
            <img src={require("../images/bx_bx-book-heart.png")} alt="heart" />
            <img src={require("../images/notifications-none.png")} alt="noti" />
            <img src={require("../images/premium-person-20-regular.png")} alt="premium" />
            <img src={require("../images/user.png")} alt="user" />
        </div>

    </nav>
  );
};

export default SearchBar;
