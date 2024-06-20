import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarExplore from "../components/NavbarExplore";

const CastDetail = () => {
  const [castDetails, setCastDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCastDetails();
  }, [id]);

  const fetchCastDetails = () => {
    const apiKey = "1ca2e666a13734cae0b5102c1092b9c0";
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
    <div className="bg-black text-white min-h-screen p-6">
      <div className="container mt-16 mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={name}
            className="rounded-lg h-[600px] shadow-md"
          />
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
    </div>
    </>
  );
};

export default CastDetail;
