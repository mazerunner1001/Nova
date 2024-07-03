import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import NavbarExplore from "../components/NavbarExplore";
import Footer from "../components/Footer";

const CastPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const { id } = useParams();
    const apiKey = import.meta.env.VITE_API_KEY;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0); // Track the index of selected image

    const openModal = (filePath, index) => {
        setSelectedImage(filePath);
        setSelectedIndex(index);
        setModalOpen(true);
        disableBackgroundScroll(); // Disable background scrolling
    };

    const closeModal = () => {
        setSelectedImage('');
        setSelectedIndex(0);
        setModalOpen(false);
        enableBackgroundScroll(); // Enable background scrolling
    };

    const fetchPhotos = () => {
        const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setPhotos(data.profiles);
            })
            .catch((err) => {
                console.error("Failed to fetch photos: ", err);
            });
    };

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
        
        fetchPhotos();
    }, [id]);

    const showNextImage = useCallback(() => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % photos.length);
        setSelectedImage(photos[(selectedIndex + 1) % photos.length].file_path);
    }, [selectedIndex, photos]);

    const showPrevImage = useCallback(() => {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
        setSelectedImage(photos[(selectedIndex - 1 + photos.length) % photos.length].file_path);
    }, [selectedIndex, photos]);

    const handleKeyPress = useCallback((event) => {
        if (modalOpen) {
            if (event.key === "ArrowLeft") {
                showPrevImage();
            } else if (event.key === "ArrowRight") {
                showNextImage();
            }
        }
    }, [modalOpen, showPrevImage, showNextImage]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    const disableBackgroundScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBackgroundScroll = () => {
        document.body.style.overflow = "";
    };

    const handleClickOutsideModal = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <NavbarExplore />
            <div className="text-white min-h-screen mt-20 p-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Photos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {photos.map((photo, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}
                                    alt={`Photo ${index + 1}`}
                                    className=" shadow-md"
                                    onClick={() => openModal(photo.file_path, index)}
                                />
                            </div>
                        ))}

                        {modalOpen && (
                            <div
                                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
                                onClick={handleClickOutsideModal}
                            >
                                <div className="relative m-auto h-5/6 ">
                                    <button
                                        className="absolute top-4 left-4 px-[10px] text-white bg-black bg-opacity-50 rounded-full text-4xl"
                                        onClick={closeModal}
                                    >
                                        &times;
                                    </button>
                                    <button
                                        className="absolute top-1/2 -left-20 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full text-4xl"
                                        onClick={showPrevImage}
                                    >
                                        &lt;
                                    </button>
                                    <button
                                        className="absolute top-1/2 -right-20 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full text-4xl"
                                        onClick={showNextImage}
                                    >
                                        &gt;
                                    </button>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${selectedImage}`}
                                        alt="Modal Image"
                                        className="w-full h-full rounded-lg shadow-md mx-auto"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-gray-400 mt-4 ml-[1150px]">Number of Photos: {photos.length}</div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CastPhotos;
