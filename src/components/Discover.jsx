import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const MultiColumnDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const genres = [
    { name: "Action", id: 28 }, { name: "Adventure", id: 12 }, { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 }, { name: "Crime", id: 80 }, { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 }, { name: "Family", id: 10751 }, { name: "Fantasy", id: 14 },
    { name: "History", id: 36 }, { name: "Horror", id: 27 }, { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 }, { name: "Romance", id: 10749 }, { name: "Science Fiction", id: 878 },
    { name: "Thriller", id: 53 }, { name: "War", id: 10752 }, { name: "Western", id: 37 }
  ];

  return (
    <div
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        id="dropdownDelayButton"
        onClick={toggleDropdown}
        className="text-white absolute translate-y-[-17px] pb-5 hover:text-gray-400 bg-transparent focus:outline-none font-medium text-md text-center inline-flex items-center"
        type="button"
      >
        Discover
        <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownDelay"
          className="border border-gray-600 translate-y-5 absolute left-[-100px] z-10 w-[600px] h-[240px] bg-black opacity-90 divide-y divide-gray-600 shadow"
        >
          <div className="grid grid-cols-3 gap-12 py-2 text-sm text-white" aria-labelledby="dropdownDelayButton">
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <ul key={colIndex}>
                {genres.slice(colIndex * 6, (colIndex + 1) * 6).map((genre, rowIndex) => (
                  <li key={rowIndex}>
                    <Link to={`/genre/${genre.id}`} className="block px-4 py-2 hover:underline">
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiColumnDropdown;
