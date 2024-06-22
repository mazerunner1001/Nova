import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const YoutubeSlide = ({ url }) => (
    <div className="video-container">
        <iframe
            width="800"
            height="450"
            src={url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    </div>
);

const MovieTrailerCarousel = ({ videos }) => {

    const limitedVideos = videos.slice(0, 20);

    return (
        <Carousel showThumbs={true} showStatus={false} infiniteLoop={true} useKeyboardArrows={true} autoPlay={true} transitionTime={3}>
            {limitedVideos.map((video, index) => (
                <YoutubeSlide key={index} url={`https://www.youtube.com/embed/${video.key}`} />
            ))}
        </Carousel>
    );
};

export default MovieTrailerCarousel;
