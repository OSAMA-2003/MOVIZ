/** @format */

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation ,Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./movieSlider.css";
import StarRating from "../starRating/StarRating";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../instance";

function MoviesSlider({ apiUrl }) {  // Accept the `apiUrl` prop
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(apiUrl)  // Use the passed API URL here
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [apiUrl]);  // Add apiUrl as a dependency to re-fetch when it changes


  return (
    <>
       <Swiper
      navigation={true}
      autoplay={{ delay: 2500 }} // Autoplay configuration
      modules={[Navigation, Autoplay]} // Include Autoplay module
      className="mySwiper"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div
            className="movies-slider flex justify-between items-center row-cols-1 pt-24 row-cols-md-3 px-20 overflow-hidden"
            style={{
              width: "100%",
              height: "100vh",
              margin: "10px",
              borderRadius: "10px",
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="content hidden md:block z-20">
              <h1>
                {movie.title} {movie.name}
              </h1>
              <p>{movie.overview}</p>
              <span>
                <StarRating rating={movie.vote_average} />
              </span>
              <br />
              <p className="text-gray-500">
                Release Date: {movie.release_date}
              </p>
            </div>

            {/* Play Button */}
            <button
              onClick={() => {
                navigate(`/movies/details/${movie.id}`);
              }}
              className="play-button position-absolute z-20"
            >
              <i className="fa fa-play"></i>
            </button>

            <div className="z-10 pb-5 position-relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-3xl py-2"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-75 rounded-2xl w-full z-0"></div>
        </SwiperSlide>
      ))}
    </Swiper>
      
    </>
    
  );
}

export default MoviesSlider;
