import React from "react";
import PropTypes from "prop-types";
import Cards from "./Card";

const MovieList = ({ movieList, isTVShow = false }) => {
  return (
    <div className="bg-transparent overflow-hidden pt-1">
      <div id="no-scrollbar" className="flex py-[30px] overflow-x-scroll space-x-1 overflow-y-none ml-8 pl-9">
        {movieList.map(movie => (
          isTVShow ? (
            <Cards key={movie.id} movie={movie} /> // Update CastCard to handle TV shows if needed
          ) : (
            <Cards key={movie.id} movie={movie} />
          )
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movieList: PropTypes.array.isRequired,
  isTVShow: PropTypes.bool,
};

export default MovieList;
