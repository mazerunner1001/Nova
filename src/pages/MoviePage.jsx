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
import ReviewsSection from "../components/ReviewSection";

const Movie = () => {
  const [currentDetail, setCurrentDetail] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [videos, setVideos] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [certification, setCertification] = useState(null);
  const isTVShow = window.location.pathname.includes("/tv/");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY;

  const openModal = (filePath) => {
    setSelectedImage(filePath);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      // Add event listener to handle clicks outside modal
      const handleClickOutsideModal = (event) => {
        if (!event.target.closest('.modal-content')) {
          closeModal();
        }
      };
      document.addEventListener('mousedown', handleClickOutsideModal);
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('mousedown', handleClickOutsideModal);
      };
    }
  }, [modalOpen]);


  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);


  const getData = () => {
    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setCurrentDetail(data);
        getAdditionalData();
        getReleaseDates(data.id);
      });
  };

  const getAdditionalData = () => {
    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/credits?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        setCast(data.cast || []);
        setCrew(data.crew || []);
      });

    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/videos?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => setVideos(data.results || []));

    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/keywords?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => setKeywords(isTVShow ? data.results || [] : data.keywords || []));

    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/watch/providers?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => setWatchProviders(data.results.US ? data.results.US.flatrate || [] : []));

    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/images?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => setImages(data.backdrops || []));

    fetch(`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${id}/reviews?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => setReviews(data.results || []));
  };

  const getReleaseDates = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        console.log('Release Dates Data:', data); // Add this line
        const usRelease = data.results.find(release => release.iso_3166_1 === 'US');
        if (usRelease) {
          const certification = usRelease.release_dates.find(date => date.certification);
          if (certification) {
            setCertification(certification.certification);
          } else {
            setCertification("NA"); // No certification found
          }
        } else {
          setCertification("NA"); // No US release found
        }
      });
  };

  const handlePersonClick = (personId) => {
    navigate(`/person/${personId}`);
  };


  if (!currentDetail) {
    return <div className="text-white text-center mt-[350px]">Loading...</div>;
  }

  const directors = crew.filter(member => member.job === "Director");
  const trailer = videos.find(video => video.type === "Trailer");


  return (
    <div className="bg-black flex flex-col items-center">
      <NavbarExplore />
      <div className="w-full inset-0 absolute">
        <div className="bg-gradient-to-t from-black to-transparent inset-0 absolute h-[500px]" />
        {currentDetail && (
          <img className="w-full h-[500px] object-cover object-[0_35%]" src={currentDetail.backdrop_path ? `https://image.tmdb.org/t/p/original${currentDetail.backdrop_path}` : Backdrop} alt="Backdrop" />
        )}
        <div className="absolute bottom-64 right-0 pr-16 pl-6 py-2 bg-gray-900 border-2 border-l-white border-transparent text-white text-md">
          {certification ? certification : "NA"}
        </div>
      </div>

      <div className=" mt-56 w-3/4 flex relative">
        <div className="mr-8">
          <div>
            {currentDetail && (
              <img className="max-w-[230px]  object-cover rounded-lg shadow-2xl" src={currentDetail.poster_path ? `https://image.tmdb.org/t/p/original${currentDetail.poster_path}` : MoviePlaceholder} alt="Poster" />
            )}
          </div>
        </div>
        <div className="text-white flex flex-col h-[450px] ">
          <div>
            <div className="text-sky-400 font-semibold text-3xl">{currentDetail ? (currentDetail.title || currentDetail.name) : ""}</div>
            <div className="italic mb-4">{currentDetail ? currentDetail.tagline : ""}</div>
            <div className=" flex flex-wrap justify-start items-center">
              {currentDetail ? currentDetail.vote_average : ""}
              <svg className="mt-[2px] ml-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                <polygon fill="#38bdf8" stroke="#38bdf8" strokeWidth="2" strokeMiterlimit="10" points="32,47 12,62 20,38 2,24 24,24 32,1 40,24 62,24 44,38 52,62" />
              </svg>
              <span className="movie__voteCount ml-4">{currentDetail ? `(${currentDetail.vote_count}) votes` : ""}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 mb-2">
              <span>{currentDetail ? (currentDetail.runtime ? `${currentDetail.runtime} mins` : `Seasons: ${currentDetail.number_of_seasons}`) : ""}</span>
              <span>{currentDetail ? `|` : ''}</span>
              <span>{currentDetail ? `Release date: ${currentDetail.release_date || currentDetail.first_air_date}` : ""}</span>
              <span>{currentDetail && currentDetail.budget ? `|` : ''}</span>
              <span>{currentDetail && currentDetail.budget ? `Budget: $${currentDetail.budget.toLocaleString()}` : ""}</span>
              <span>{currentDetail && currentDetail.revenue ? `|` : ''}</span>
              <span>{currentDetail && currentDetail.revenue ? `Revenue: $${currentDetail.revenue.toLocaleString()}` : ""}</span>
            </div>
            <div>{currentDetail && currentDetail.spoken_languages ? `Languages: ${currentDetail.spoken_languages.map(lang => lang.name).join(", ")}` : ""}</div>
            <div>{currentDetail && currentDetail.production_countries ? `Countries: ${currentDetail.production_countries.map(country => country.name).join(", ")}` : ""}</div>
            <div className=" mt-5 mb-5 space-x-4">
              {currentDetail && currentDetail.genres ? currentDetail.genres.map(genre => (
                <span className="p-2 border-2 border-white rounded-2xl" key={genre.id}>{genre.name}</span>
              )) : ""}
            </div>
            <div className="mt-5 mb-5 space-x-4 flex flex-wrap">
              {keywords && keywords.length > 0 ? (
                keywords.slice(0, 4).map(keyword => (
                  <span className="p-2 border-2 border-white rounded-2xl" key={keyword.id}>{keyword.name}</span>
                ))) : ("")}
            </div>
          </div>
          <div className="my-8 flex-0.8 relative">
            <div className="text-xl mb-5 font-semibold">Synopsis</div>
            <div>{currentDetail ? currentDetail.overview.slice(0, 450) : ""}</div>
          </div>
        </div>
      </div>

      <div className="absolute top-[620px] left-[15%] space-y-4 inline">
        {currentDetail && currentDetail.homepage && (
          <div className="flex items-center justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
              <button className="relative rounded-full bg-black px-7 py-4 text-white">
                <a href={currentDetail.homepage}>Homepage</a>
              </button>
            </div>
          </div>
        )}
        {currentDetail && currentDetail.imdb_id && (
          <div className="flex items-center justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
              <button className="relative rounded-full bg-yellow-600 px-12 py-4 text-black font-extrabold">
                <a href={"https://www.imdb.com/title/" + currentDetail.imdb_id}>IMDB</a>
              </button>
            </div>
          </div>
        )}
      </div>

      {videos.length > 0 && (<div className="w-3/4 items-center">
        <div className="mt-40 text-white h-[500px] ">
          <div className="mt-8 mb-5 mr-8">
            <MovieTrailerCarousel videos={videos} />
          </div>
        </div>
      </div>)}

      <div className="w-3/4 mt-16">
        <div id="no-scrollbar" className="flex overflow-x-auto space-x-3">
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                className="w-56 h-32 object-cover rounded-md cursor-pointer"
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                alt={`Backdrop ${index + 1}`}
                onClick={() => openModal(image.file_path)}
              />
            ))
          ) : (
            <div className="text-gray-400">No images available</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-4/5 h-auto my-auto mx-auto">
            <button
              className="absolute top-4 left-4 px-[10px] text-white bg-black bg-opacity-50 rounded-full text-4xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/original${selectedImage}`}
              alt="Modal Image"
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {(directors.length > 0 || cast.length) > 0 && (
        <>
          <div className="flex flex-col w-3/4 mt-20 space-y-12">
            <div className="flex space-x-4 w-full overflow-hidden relative">
              {directors.length > 0 && (
                <div className="overflow-hidden relative w-auto">
                  <h2 className="text-2xl text-white font-semibold mb-4">Director(s)</h2>
                  <div id="no-scrollbar" className="overflow-x-scroll overflow-y-none flex py-[30px]">
                    {directors.map(director => (
                      <div className="flex-shrink-0 w-36 m-1 cursor-pointer" key={director.id} onClick={() => handlePersonClick(director.id)}>
                        <img className="w-full h-48 object-cover rounded-lg" src={director.profile_path ? `https://image.tmdb.org/t/p/w200${director.profile_path}` : profile} alt={director.name} />
                        <div className="text-white text-center mt-2">{director.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {directors.length > 0 && (<div className="bg-white w-[2px] h-64 translate-y-16 self-stretch mx-4"></div>)}
              <div className=" overflow-hidden relative flex-1">
                <h2 className="text-2xl text-white font-semibold mb-4">Cast</h2>
                <div id="no-scrollbar" className="overflow-x-scroll overflow-y-none flex py-[30px]">
                  {cast.length > 0 && cast.map(actor => (
                    <div className="flex-shrink-0 w-36 m-1 cursor-pointer" key={actor.id} onClick={() => handlePersonClick(actor.id)}>
                      <img className="w-full h-48 object-cover rounded-lg " src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : profile} alt={actor.name} />
                      <div className="text-white text-center mt-2">{actor.name}</div>
                      <div className="text-gray-400 text-center">{actor.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>)}

      {/* {crew.length > 0 && (
        <>
          <div className="overflow-hidden w-4/5 relative flex-1">
            <h2 className="text-2xl text-white font-bold mb-4">Crew</h2>
            <div id="no-scrollbar" className="overflow-x-scroll overflow-y-none flex py-[30px]">
              {crew.map(crew => (
                <div className="flex-shrink-0 w-36 m-1 cursor-pointer" key={crew.id} onClick={() => handlePersonClick(crew.id)}>
                  <img className="w-full h-48 object-cover rounded-lg " src={crew.profile_path ? `https://image.tmdb.org/t/p/original${crew.profile_path}` : profile} alt={crew.name} />
                  <div className="text-white text-center mt-2">{crew.name}</div>
                  <div className="text-gray-400 text-center">{crew.job}</div>
                </div>
              ))}
            </div>
          </div>
        </>)} */}

      <hr className=" border-gray-700 w-4/5" />

      <div className="flex justify-between gap-8 w-4/5 divide-x divide-gray-700">
      <div className="flex flex-col w-3/4 mt-10">
        <ReviewsSection reviews={reviews} />
      </div>
        <div className="w-1/4 flex flex-col gap-4 mt-10 pl-8">
          <h2 className="text-white text-xl mb-4">Watch Providers</h2>
          <div className="flex flex-col space-y-6">
            {watchProviders.length > 0 ? (
              watchProviders.map((provider, index) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                  <div className="text-white text-sm">{provider.provider_name}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No watch providers available</div>
            )}
          </div>
        </div>
      </div>


      <div className="relative w-11/12 mt-16">
        <h2 className="text-2xl text-white font-bold ml-20">More like this</h2>
        <MovieList
          Class={isTVShow ? "tv" : "movie"}
          Subclass={`/recommendations`}
          type={id}
          style1="overflow-hidden"
          style2="overflow-x-scroll ml-8 pl-9"
        />
      </div>
      <div className="flex flex-wrap justify-center mt-32 w-4/5 mb-16">
        {currentDetail && currentDetail.production_companies && currentDetail.production_companies.map(company => (
          company.logo_path && (
            <span className="flex flex-col items-center justify-center" key={company.id}>
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