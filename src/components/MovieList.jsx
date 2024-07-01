// MovieList.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cards from "./Card";
import CastCard from "./Card2";

const MovieList = ({ type = "popular", Class = "movie", Subclass = "", style1 = "", style2 = "", showPagination = true }) => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [pageInput, setPageInput] = useState(currentPage);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    getData();
  }, [type, currentPage]);

  const getData = () => {
    let url = "";

    if (type === "trending") {
      url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    } else {
      url = `https://api.themoviedb.org/3/${Class}/${type}${Subclass}?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovieList(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      })
      .catch(err => console.error("Failed to fetch data: ", err));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handlePageInput = (e) => {
    const value = e.target.value;
    setPageInput(value);
    if (value >= 1 && value <= totalPages) {
      setCurrentPage(Number(value));
    }
  };

  return (
    <div className={`bg-transparent pt-1 ${style1}`}>
      {!style1 && (
        <h2 className="text-3xl text-white font-bold text-center mt-20">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>
      )}
      <div id="no-scrollbar" className={`flex ${style2} py-[30px]`}>
        {Subclass === "" || Subclass === "recommendations" ? (
          movieList.map(movie => <Cards key={movie.id} movie={movie} />)
        ) : (
          movieList.map(cast => <CastCard key={cast.id} cast={cast} />)
        )}
      </div>
      {showPagination && !style1 && (
        <div className="flex flex-col items-center py-4">
          <div className="flex items-center mb-4">
            <button
              className="text-white bg-transparent hover:underline font-bold py-2 px-4 rounded-l"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`mx-1 py-2 px-4 rounded ${pageNumber === currentPage ? 'bg-gray-800' : 'bg-transparent hover:bg-gray-700'
                      } text-white`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
            <button
              className="text-white bg-transparent hover:underline font-bold py-2 px-4 rounded-r"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-2">Go to page:</span>
            <input
              type="number"
              value={pageInput}
              onChange={handlePageInput}
              className="w-16 p-1 text-center bg-gray-700 text-white rounded"
              min="1"
              max={totalPages}
            />
            <span className="text-gray-400 text-sm ml-2">of {totalPages}</span>
          </div>
          <span className="text-gray-400 text-sm mt-2">Total Results: {totalResults}</span>
        </div>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string,
  Class: PropTypes.string,
  Subclass: PropTypes.string,
  style1: PropTypes.string,
  style2: PropTypes.string,
  showPagination: PropTypes.bool,
};

export default MovieList;
