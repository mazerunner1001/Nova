import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded && searchQuery !== "") {
      fetchSearchResults(searchQuery);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      fetchSearchResults(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = (query) => {
    const apiKey = "1ca2e666a13734cae0b5102c1092b9c0";
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`;

    Promise.all([fetch(movieUrl), fetch(tvUrl)])
      .then(async ([movieRes, tvRes]) => {
        const movieData = await movieRes.json();
        const tvData = await tvRes.json();
        const combinedResults = [
          ...movieData.results.map((item) => ({ ...item, media_type: "movie" })),
          ...tvData.results.map((item) => ({ ...item, media_type: "tv" }))
        ];
        
        // Sort by popularity in descending order
        combinedResults.sort((a, b) => b.popularity - a.popularity);
        
        setSearchResults(combinedResults);
      })
      .catch((err) => console.error("Failed to fetch data: ", err));
  };

  const handleResultClick = (mediaType, id) => {
    navigate(`/${mediaType}/${id}`);
    setIsExpanded(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center transition-all duration-200 ${
          isExpanded ? "w-[270px]" : "w-10"
        }`}
      >
        <input
          type="text"
          className={`transition-all duration-200 w-full h-8 px-4 text-white bg-black ${
            isExpanded ? "opacity-100" : "opacity-0 w-0"
          }`}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{ display: isExpanded ? "block" : "none" }}
        />
      </div>
      <button
        onClick={handleSearchClick}
        className="ml-2 text-gray-200 focus:outline-none"
      >
        <FaSearch className="text-lg" />
      </button>
      {isExpanded && searchQuery && searchResults.length > 0 && (
        <div className="absolute top-10 left-0 w-full bg-black text-white p-4 rounded-md shadow-lg z-10 max-h-96 overflow-scroll">
          {searchResults.map((item) => (
            <div
              key={item.id}
              className="py-2 border-b border-gray-700 last:border-0 cursor-pointer"
              onClick={() => handleResultClick(item.media_type, item.id)}
            >
              {item.title || item.name} (
              {new Date(item.release_date || item.first_air_date).getFullYear()}
              )
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
