import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

const Cards = ({ movie }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setShowSkeleton(true);
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [movie]);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const handleClick = () => {
        if (movie.first_air_date) {
            navigate(`/tv/${movie.id}`);
        } else {
            navigate(`/movie/${movie.id}`);
        }
    };

    return (
        <div onClick={handleClick} className="no-underline text-white cursor-pointer">
            <div className="relative inline-block transition-transform duration-200 rounded-lg overflow-hidden m-1 cursor-pointer min-w-[180px] h-[270px] border border-gray-600 hover:scale-125 hover:z-50 shadow-lg">
                {showSkeleton && (
                    <div className="skeleton-animation"></div>
                )}
                <img 
                    className={`h-[270px] w-full object-cover ${isImageLoaded ? 'block' : 'hidden'}`} 
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path || ""}`} 
                    alt={movie.original_title || movie.name} 
                    onLoad={handleImageLoad} 
                />
                {isImageLoaded && (
                    <div className="absolute bottom-0 left-0 h-[290px] w-full flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <div className="font-extrabold text-base mb-2.5">{movie.original_title || movie.name || <span className="italic">N/A</span>}</div>
                        <div className="text-xs mb-1">
                            {movie.release_date || movie.first_air_date || <span className="italic">N/A</span>}
                            <div className="flex flex-wrap">
                                <span className="float-right">{movie.vote_average || <span className="italic">N/A</span>}</span>
                                <svg className="ml-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                                    <polygon fill="#38bdf8" stroke="#38bdf8" strokeWidth="2" strokeMiterlimit="10" points="32,47 12,62 20,38 2,24 24,24 32,1 40,24 62,24 44,38 52,62" />
                                </svg>
                            </div>
                        </div>
                        <div className="italic text-xs mb-1">{movie.overview ? movie.overview.slice(0, 90) + "..." : <span className="italic">N/A</span>}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cards;
