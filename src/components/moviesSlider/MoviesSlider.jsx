/** @format */

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion"; // Import Framer Motion
import "swiper/css";
import "swiper/css/navigation";
import "./movieSlider.css";
import StarRating from "../starRating/StarRating";
import { useNavigate } from "react-router-dom";
import { instance } from "../../instance";

function MoviesSlider({ apiUrl }) {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(apiUrl)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [apiUrl]);

  // Animation variants for characters
  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: 0.08, // Stagger each character by 0.5 seconds
      },
    },
  };

  return (
    <>
      <Swiper
        navigation={true}
        
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 5000 }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)} // Update currentSlide on slide change
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div
              className="movies-slider flex justify-between items-center row-cols-1 pt-24 row-cols-md-3 px-20 overflow-hidden"
              style={{
                height: "100vh",
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="content hidden md:block z-20">
                <motion.h1
                  key={currentSlide} // Force reanimation when the slide changes
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-white text-4xl"
                >
                  {Array.from(movie.title || movie.name || "").map((char, i) => (
                    <motion.span key={i} variants={charVariants}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
                <p>{movie.overview}</p>
                <span>
                  <StarRating rating={movie.vote_average} />
                </span>
                <br />
                <p className="text-gray-500">Release Date: {movie.release_date}</p>
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

              <div className="poster-card z-10 pb-5 position-relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-3xl py-2 w-75"
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
