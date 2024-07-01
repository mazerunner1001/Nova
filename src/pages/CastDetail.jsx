import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarExplore from "../components/NavbarExplore";
import MovieList from "../components/MovieListCast";
import Footer from "../components/Footer";
import profileicon from "../assets/profileicon.jpg";

const CastDetail = () => {
  const [castDetails, setCastDetails] = useState(null);
  const [castMovies, setCastMovies] = useState([]);
  const [castTVShows, setCastTVShows] = useState([]);
  const [photosCount, setPhotosCount] = useState(0);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchCastDetails();
    fetchCastMovies();
    fetchCastTVShows();
    fetchPhotosCount();
  }, [id]);

  const fetchCastDetails = () => {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCastDetails(data);
      })
      .catch((err) => {
        console.error("Failed to fetch cast details: ", err);
        setError("Failed to fetch cast details.");
      });
  };

  const fetchCastMovies = () => {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=en-US`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCastMovies(data.cast);
      })
      .catch((err) => {
        console.error("Failed to fetch cast movies: ", err);
        setError("Failed to fetch cast movies.");
      });
  };

  const fetchCastTVShows = () => {
    const url = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${apiKey}&language=en-US`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCastTVShows(data.cast);
      })
      .catch((err) => {
        console.error("Failed to fetch cast TV shows: ", err);
        setError("Failed to fetch cast TV shows.");
      });
  };

  const fetchPhotosCount = () => {
    const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPhotosCount(data.profiles.length);
      })
      .catch((err) => {
        console.error("Failed to fetch photos count: ", err);
      });
  };

  if (error) {
    return <div className="text-white text-center">{error}</div>;
  }

  if (!castDetails) {
    return <div className="text-white text-center">Loading...</div>;
  }

  const {
    profile_path,
    name,
    biography,
    birthday,
    place_of_birth,
    known_for_department,
    popularity,
    also_known_as,
  } = castDetails;

  return (
    <>
      <NavbarExplore />
      <div className="text-white min-h-screen p-6">
        <div className="container mt-16 mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 flex justify-center relative">
            <img
              src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : profileicon}
              alt={name}
              className="rounded-lg shadow-md"
            />
            <Link
              to={`/photos/${id}`}
              className="absolute bottom-2 right-2 text-white bg-black bg-opacity-80 p-2 rounded-md flex items-center"
            >
              <span className="mr-2">{photosCount}</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.55-4.55M15 10l4.55-4.55M10 15l4.55-4.55M10 15l4.55-4.55M10 15L6.15 10.55m0 0L1.5 6m0 0L1.5 6m4.65 4.55L6.15 10.55m0 0L1.5 6"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="md:w-2/3 md:pl-10 mt-6 md:mt-0">
            <h2 className="text-4xl font-bold mb-4">{name}</h2>
            <p className="text-lg mb-4">{biography}</p>
            <div className="text-sm">
              <p><strong>Known for:</strong> {known_for_department}</p>
              <p><strong>Birthday:</strong> {birthday}</p>
              <p><strong>Place of Birth:</strong> {place_of_birth}</p>
              <p><strong>Popularity:</strong> {popularity}</p>
              <p><strong>Also Known As:</strong> {also_known_as.join(", ")}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-20">
          <h3 className="text-xl font-bold ml-20 mt-12">Movies</h3>
          <MovieList movieList={castMovies} />
          <h3 className="text-xl font-bold ml-20 mt-8">TV Shows</h3>
          <MovieList movieList={castTVShows} isTVShow />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CastDetail;
