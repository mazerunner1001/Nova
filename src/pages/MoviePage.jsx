import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarExplore from "../components/NavbarExplore";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";
import profile from '../assets/profileicon.jpg';
import MoviePlaceholder from '../assets/Movie_Placeholder.jpg';
import Backdrop from '../assets/Backdrop.jpg';
import MovieTrailerCarousel from '../components/MovieTrailerCarousel'; // Import the new component
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Movie = () => {
  const [currentDetail, setCurrentDetail] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videos, setVideos] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isTVShow = window.location.pathname.includes("/tv/");

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    console.log(videos); // Add this line to check the videos data
  }, [videos]);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setCurrentDetail(data);
        getAdditionalData();
      });
  };

  const getAdditionalData = () => {
    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setCast(data.cast || []);
        setCrew(data.crew || []);
      });

    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setVideos(data.results || []));

    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/keywords?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setKeywords(isTVShow ? data.results || [] : data.keywords || []));
  };

  const handlePersonClick = (personId) => {
    navigate(`/person/${personId}`);
  };

  const directors = crew.filter(member => member.job === "Director");
  const trailer = videos.find(video => video.type === "Trailer");

  return (
    <div className="movie bg-black flex flex-col items-center">
      <NavbarExplore />
      <div className="movie__intro w-full inset-0 absolute">
        <div className="bg-gradient-to-t from-black to-transparent inset-0 absolute h-[500px]" />
        {currentDetail && (
          <img className="w-full h-[500px] object-cover object-[0_35%]" src={currentDetail.backdrop_path ? `https://image.tmdb.org/t/p/original${currentDetail.backdrop_path}` : Backdrop} alt="Backdrop" />
        )}
      </div>
      <div className="movie__detail mt-56 w-3/4 flex relative">
        <div className="movie__detailLeft mr-8">
          <div className="movie__posterBox">
            {currentDetail && (
              <img className="max-w-[230px]  object-cover rounded-lg shadow-2xl" src={currentDetail.poster_path ? `https://image.tmdb.org/t/p/original${currentDetail.poster_path}` : MoviePlaceholder} alt="Poster" />
            )}
          </div>
        </div>
        <div className="movie__detailRight text-white flex flex-col h-[450px] ">
          <div className="movie__detailRightTop ">
            <div className="movie__name text-sky-400 font-semibold text-3xl">{currentDetail ? (currentDetail.title || currentDetail.name) : ""}</div>
            <div className="movie__tagline">{currentDetail ? currentDetail.tagline : ""}</div>
            <div className="movie__rating flex flex-wrap justify-start items-center">
              {currentDetail ? currentDetail.vote_average : ""}
              <svg className="mt-[2px] ml-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                <polygon fill="#38bdf8" stroke="#38bdf8" strokeWidth="2" strokeMiterlimit="10" points="32,47 12,62 20,38 2,24 24,24 32,1 40,24 62,24 44,38 52,62" />
              </svg>
              <span className="movie__voteCount ml-4">{currentDetail ? `(${currentDetail.vote_count}) votes` : ""}</span>
            </div>
            <div className="movie__runtime">{currentDetail ? (currentDetail.runtime ? `${currentDetail.runtime} mins` : `Seasons: ${currentDetail.number_of_seasons}`) : ""}</div>
            <div className="movie__releaseDate">{currentDetail ? `Release date: ${currentDetail.release_date || currentDetail.first_air_date}` : ""}</div>
            <div className="movie__budget">{currentDetail && currentDetail.budget ? `Budget: $${currentDetail.budget.toLocaleString()}` : ""}</div>
            <div className="movie__revenue">{currentDetail && currentDetail.revenue ? `Revenue: $${currentDetail.revenue.toLocaleString()}` : ""}</div>
            <div className="movie__languages">{currentDetail && currentDetail.spoken_languages ? `Languages: ${currentDetail.spoken_languages.map(lang => lang.name).join(", ")}` : ""}</div>
            <div className="movie__countries">{currentDetail && currentDetail.production_countries ? `Countries: ${currentDetail.production_countries.map(country => country.name).join(", ")}` : ""}</div>
            <div className="movie__genres mt-5 mb-5 space-x-4">
              {currentDetail && currentDetail.genres ? currentDetail.genres.map(genre => (
                <span className="movie__genre p-2 border-2 border-white rounded-2xl" key={genre.id}>{genre.name}</span>
              )) : ""}
            </div>
            <div className="movie__keywords mt-5 mb-5 space-x-4">
              {keywords && keywords.length > 0 ? (
                keywords.slice(0, 4).map(keyword => (
                  <span className="movie__keyword p-2 border-2 border-white rounded-2xl" key={keyword.id}>{keyword.name}</span>
                ))) : ("")}
            </div>
            {trailer && (
              <div className="movie__trailer mt-8 mb-5 mr-8 hover:underline">
                <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer" className="text-blue-300">Watch Trailer on YouTube</a>
              </div>
            )}
          </div>
          <div className="movie__detailRightBottom my-8 flex-0.8 relative">
            <div className="synopsisText text-xl mb-5 font-semibold">Synopsis</div>
            <div>{currentDetail ? currentDetail.overview.slice(0,450) : ""}</div>
          </div>
        </div>
      </div>

      <div className="absolute top-[620px] left-[15%] space-y-4 inline">
        {currentDetail && currentDetail.homepage && (
          <div className="flex items-center justify-center bg-black">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
              <button className="relative rounded-full bg-black px-7 py-4 text-white">
                <a href={currentDetail.homepage}>Homepage</a>
              </button>
            </div>
          </div>
        )}
        {currentDetail && currentDetail.imdb_id && (
          <div className="flex items-center justify-center bg-black">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
              <button className="relative rounded-full bg-yellow-600 px-12 py-4 text-black font-extrabold">
                <a href={"https://www.imdb.com/title/" + currentDetail.imdb_id}>IMDB</a>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-4/5 items-center">
          <div className="mt-36 text-white h-[650px] ">
              {videos.length > 0 && (
                <div className="movie__trailer mt-8 mb-5 mr-8">
                  <MovieTrailerCarousel videos={videos} />
                </div>
              )}
          </div>
      </div>

      {(directors.length > 0 || cast.length) > 0 && (
        <>
          <div className="flex flex-col w-4/5 mt-20 space-y-12">
            <div className="flex space-x-4 w-full overflow-hidden relative">
              {directors.length > 0 && (
                <div className="bg-black overflow-hidden relative w-auto">
                  <h2 className="text-2xl text-white font-bold mb-4">Director(s)</h2>
                  <div id="no-scrollbar" className="overflow-x-scroll overflow-y-none flex py-[30px]">
                    {directors.map(director => (
                      <div className="directorItem flex-shrink-0 w-36 m-1 cursor-pointer" key={director.id} onClick={() => handlePersonClick(director.id)}>
                        <img className="w-full h-48 object-cover rounded-lg" src={director.profile_path ? `https://image.tmdb.org/t/p/w200${director.profile_path}` : profile} alt={director.name} />
                        <div className="directorName text-white text-center mt-2">{director.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {directors.length > 0 && (<div className="bg-white w-[2px] h-64 translate-y-16 self-stretch mx-4"></div>)}
              <div className="bg-black overflow-hidden relative flex-1">
                <h2 className="text-2xl text-white font-bold mb-4">Cast</h2>
                <div id="no-scrollbar" className="overflow-x-scroll overflow-y-none flex py-[30px]">
                  {cast.length > 0 && cast.map(actor => (
                    <div className="castItem flex-shrink-0 w-36 m-1 cursor-pointer" key={actor.id} onClick={() => handlePersonClick(actor.id)}>
                      <img className="w-full h-48 object-cover rounded-lg " src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : profile} alt={actor.name} />
                      <div className="castName text-white text-center mt-2">{actor.name}</div>
                      <div className="castCharacter text-gray-400 text-center">{actor.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>)}

      {crew.length > 0 && (
        <>
          <div className="bg-black overflow-hidden w-4/5 mt-8 relative flex-1">
            <h2 className="text-2xl text-white font-bold mb-4">Crew</h2>
            <div id="no-scrollbar" className="overflow-x-scroll overflow-y-none flex py-[30px]">
              {crew.map(crew => (
                <div className=" flex-shrink-0 w-36 m-1 cursor-pointer" key={crew.id} onClick={() => handlePersonClick(crew.id)}>
                  <img className="w-full h-48 object-cover rounded-lg " src={crew.profile_path ? `https://image.tmdb.org/t/p/original${crew.profile_path}` : profile} alt={crew.name} />
                  <div className="castName text-white text-center mt-2">{crew.name}</div>
                  <div className="castCharacter text-gray-400 text-center">{crew.job}</div>
                </div>
              ))}
            </div>
          </div>
        </>)}


      <div className="relative w-full">
        <h2 className="text-2xl text-white font-bold ml-20">Recommendations</h2>
        <MovieList Class={isTVShow ? "tv" : "movie"} Subclass="recommendations" type={`/${id}/`} style1="overflow-hidden" style2="overflow-x-scroll ml-8 pl-9" />
      </div>
      <div className="movie__production flex flex-wrap justify-center mt-32 w-4/5 mb-16">
        {currentDetail && currentDetail.production_companies && currentDetail.production_companies.map(company => (
          company.logo_path && (
            <span className="productionCompanyImage flex flex-col items-center justify-center" key={company.id}>
              <img className="bg-gray-300 max-h-32 max-w-80 w-auto my-8 mx-4" src={"https://image.tmdb.org/t/p/original" + company.logo_path} alt="Company Logo" />
              <span className="text-white">{company.name}</span>
            </span>
          )
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Movie;