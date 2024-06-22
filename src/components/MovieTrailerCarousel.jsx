import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const YoutubeSlide = ({ url }) => (
    <div className="video-container">
        <iframe
            width="800"
            height="650"
            src={url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
);

const MovieTrailerCarousel = ({ videos }) => {
    // Separate trailers from other videos
    const trailers = videos.filter(video => video.type === "Trailer");
    const otherVideos = videos.filter(video => video.type !== "Trailer");

    // Limit the number of trailers and other videos displayed to 10
    const limitedTrailers = trailers.slice(0, 10);
    const limitedOtherVideos = otherVideos.slice(0, 10 - limitedTrailers.length);

    // Combine trailers and other videos
    const limitedVideos = [...limitedTrailers, ...limitedOtherVideos];

    return (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} useKeyboardArrows={true}>
            {limitedVideos.map((video, index) => (
                <YoutubeSlide key={index} url={`https://www.youtube.com/embed/${video.key}`} />
            ))}
        </Carousel>
    );
};

export default MovieTrailerCarousel;
