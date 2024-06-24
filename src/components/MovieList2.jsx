import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "./Card";

const MovieList2 = () => {
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [tvPage, setTvPage] = useState(1);
  const [movieTotalPages, setMovieTotalPages] = useState(1);
  const [tvTotalPages, setTvTotalPages] = useState(1);
  const [movieTotalResults, setMovieTotalResults] = useState(0);
  const [tvTotalResults, setTvTotalResults] = useState(0);
  const [moviePageInput, setMoviePageInput] = useState(moviePage);
  const [tvPageInput, setTvPageInput] = useState(tvPage);
  const { genre } = useParams();

  useEffect(() => {
    getMovies();
    getTVShows();
  }, [genre, moviePage, tvPage]);

  const getMovies = () => {
    const apiKey = "1ca2e666a13734cae0b5102c1092b9c0"; // Replace with your API key
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=en-US&page=${moviePage}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMovieList(data.results);
        setMovieTotalPages(data.total_pages);
        setMovieTotalResults(data.total_results);
      })
      .catch(err => console.error("Failed to fetch movie data: ", err));
  };

  const getTVShows = () => {
    const apiKey = "1ca2e666a13734cae0b5102c1092b9c0"; // Replace with your API key
    const tvurl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genre}&language=en-US&page=${tvPage}`;

    fetch(tvurl)
      .then(res => res.json())
      .then(data => {
        setTvList(data.results);
        setTvTotalPages(data.total_pages);
        setTvTotalResults(data.total_results);
      })
      .catch(err => console.error("Failed to fetch TV show data: ", err));
  };

  const handleMovieNextPage = () => {
    if (moviePage < movieTotalPages) {
      setMoviePage(prevPage => prevPage + 1);
    }
  };

  const handleMoviePrevPage = () => {
    if (moviePage > 1) {
      setMoviePage(prevPage => prevPage - 1);
    }
  };

  const handleTVNextPage = () => {
    if (tvPage < tvTotalPages) {
      setTvPage(prevPage => prevPage + 1);
    }
  };

  const handleTVPrevPage = () => {
    if (tvPage > 1) {
      setTvPage(prevPage => prevPage - 1);
    }
  };

  const handleMoviePageInput = (e) => {
    const value = e.target.value;
    setMoviePageInput(value);
    if (value >= 1 && value <= movieTotalPages) {
      setMoviePage(Number(value));
    }
  };

  const handleTVPageInput = (e) => {
    const value = e.target.value;
    setTvPageInput(value);
    if (value >= 1 && value <= tvTotalPages) {
      setTvPage(Number(value));
    }
  };

  const renderPageNumbers = (currentPage, totalPages, onPageChange) => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`mx-1 py-2 px-4 rounded ${i === currentPage ? 'bg-gray-800' : 'bg-transparent hover:bg-gray-700'} text-white`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const genres = [
    { name: "Action", id: 28 }, { name: "Adventure", id: 12 }, { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 }, { name: "Crime", id: 80 }, { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 }, { name: "Family", id: 10751 }, { name: "Fantasy", id: 14 },
    { name: "History", id: 36 }, { name: "Horror", id: 27 }, { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 }, { name: "Romance", id: 10749 }, { name: "Science Fiction", id: 878 },
    { name: "Thriller", id: 53 }, { name: "War", id: 10752 }, { name: "Western", id: 37 }
  ];

  const genreName = genres.find(g => g.id.toString() === genre)?.name || "Genre";

  return (
    <div className={`bg-transparent pt-1`}>
      <h2 className="text-3xl text-white font-bold text-center mt-20 font-serif italic">
        {genreName.toUpperCase()}
      </h2>
      {movieList.length !== 0 && (
        <>
          <h2 className="text-2xl text-white font-bold text-left ml-28 mt-8">Movies</h2>
          <div id="no-scrollbar" className={`flex flex-wrap m-auto justify-center space-x-1 w-11/12 py-9`}>
            {movieList.map(movie => <Cards key={movie.id} movie={movie} />)}
          </div>
          <div className="flex flex-col items-center py-4">
            <div className="flex items-center mb-4">
              <button
                className="text-white bg-transparent hover:underline font-bold py-2 px-4 rounded-l"
                onClick={handleMoviePrevPage}
                disabled={moviePage === 1}
              >
                Previous
              </button>
              {renderPageNumbers(moviePage, movieTotalPages, setMoviePage)}
              <button
                className="text-white bg-transparent hover:underline font-bold py-2 px-4 rounded-r"
                onClick={handleMovieNextPage}
                disabled={moviePage === movieTotalPages}
              >
                Next
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-2">Go to page:</span>
              <input
                type="number"
                value={moviePageInput}
                onChange={handleMoviePageInput}
                className="w-16 p-1 text-center bg-gray-700 text-white rounded"
                min="1"
                max={movieTotalPages}
              />
              <span className="text-gray-400 text-sm ml-2">of {movieTotalPages}</span>
            </div>
            <span className="text-gray-400 text-sm mt-2">Total Results: {movieTotalResults}</span>
          </div>
        </>)}

      {tvList.length !== 0 && (<>
        <h2 className="text-2xl text-white font-bold text-left ml-28 mt-8">TV Shows</h2>
        <div id="no-scrollbar" className={`flex flex-wrap m-auto justify-center space-x-1 w-11/12 py-9`}>
          {tvList.map(tv => <Cards key={tv.id} movie={tv} />)}
        </div>
        <div className="flex flex-col items-center py-4">
          <div className="flex items-center mb-4">
            <button
              className="text-white bg-transparent hover:underline font-bold py-2 px-4 rounded-l"
              onClick={handleTVPrevPage}
              disabled={tvPage === 1}
            >
              Previous
            </button>
            {renderPageNumbers(tvPage, tvTotalPages, setTvPage)}
            <button
              className="text-white bg-transparent hover:underline font-bold py-2 px-4 rounded-r"
              onClick={handleTVNextPage}
              disabled={tvPage === tvTotalPages}
            >
              Next
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-2">Go to page:</span>
            <input
              type="number"
              value={tvPageInput}
              onChange={handleTVPageInput}
              className="w-16 p-1 text-center bg-gray-700 text-white rounded"
              min="1"
              max={tvTotalPages}
            />
            <span className="text-gray-400 text-sm ml-2">of {tvTotalPages}</span>
          </div>
          <span className="text-gray-400 text-sm mt-2">Total Results: {tvTotalResults}</span>
        </div></>)}

    </div>
  );

};

export default MovieList2;
