import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setIsExpanded(false);
    setSearchQuery("");
    setSearchResults([]);
  }, [location.pathname]);

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

  const fetchSearchResults = async (query) => {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`;

    try {
      const [movieRes, tvRes] = await Promise.all([fetch(movieUrl), fetch(tvUrl)]);
      if (!movieRes.ok || !tvRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const movieData = await movieRes.json();
      const tvData = await tvRes.json();

      const combinedResults = [
        ...movieData.results.map((item) => ({ ...item, media_type: "movie" })),
        ...tvData.results.map((item) => ({ ...item, media_type: "tv" }))
      ];

      combinedResults.sort((a, b) => b.popularity - a.popularity);

      setSearchResults(combinedResults);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const handleResultClick = (mediaType, id) => {
    navigate(`/${mediaType}/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      const selectedResult = searchResults[highlightedIndex];
      handleResultClick(selectedResult.media_type, selectedResult.id);
    }
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
          onKeyDown={handleKeyDown}
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
        <div className="absolute top-10 left-0 w-full bg-black text-white rounded-md shadow-lg z-10 max-h-96 overflow-scroll">
          {searchResults.map((item, index) => (
            <div
              key={item.id}
              className={`py-2 border-b border-gray-700 p-4 last:border-0 cursor-pointer ${
                index === highlightedIndex ? "bg-gray-700" : ""
              }`}
              onClick={() => handleResultClick(item.media_type, item.id)}
              onMouseEnter={() => setHighlightedIndex(index)}
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
