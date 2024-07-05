import React, { useEffect, useState, useCallback } from "react";

const Modal = () => {
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
        <div>
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
        </div>
    )
}

export default Modal
