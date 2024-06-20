import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const CastCard = ({ cast }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/person/${cast.id}`} className="no-underline text-white">
                    <div className="relative inline-block transition-transform duration-200 rounded-lg overflow-hidden m-1 cursor-pointer min-w-[200px] h-[300px] border border-gray-600 hover:scale-125 hover:z-50 shadow-lg">
                        <img className="h-[300px] w-full object-cover" src={`https://image.tmdb.org/t/p/original${cast.profile_path || ""}`} alt={cast.name} />
                        <div className="absolute bottom-0 left-0 h-[290px] w-full flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <div className="font-extrabold text-base mb-2.5">{cast.name || <span className="italic">N/A</span>}</div>
                            <div className="text-xs mb-1">
                                {cast.known_for_department || <span className="italic">N/A</span>}
                                <div className="flex flex-wrap">
                                    <span className="float-right">{cast.character || <span className="italic">N/A</span>}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default CastCard;
