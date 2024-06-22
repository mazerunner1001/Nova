import React from "react";
import { useNavigate } from "react-router-dom";

const UnderDevelopmentCard = ({ onClose }) => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
            <div className=" relative w-full max-w-md p-1">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-400 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                <div className="relative bg-black text-white rounded-lg p-8 shadow-lg w-full text-center">

                    <button
                        className="absolute top-2 right-4 text-white text-xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Under Development</h2>
                    <p className="mb-6">This feature is currently under development. Stay tuned for updates!</p>
                    <div className="flex items-center justify-center">
                        <div className="group relative p-1">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-00 group-hover:opacity-100"></div>
                            <button onClick={handleBackToHome} className="relative rounded-full bg-black px-7 py-4 text-white">
                                <p>Back to Explore</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnderDevelopmentCard;
