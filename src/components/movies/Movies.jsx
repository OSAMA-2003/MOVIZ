/** @format */

import React, { useState, useEffect, useRef } from "react";
import { instance } from "../../instance";
import { SpinnerInfinity } from "spinners-react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../reduxStore/slices/FavoriteSlice";
import SearchBox from "../searchBox/SearchBox"; // Import the SearchBox component
import { motion, useInView } from "framer-motion"; // Import Framer Motion

import "./movies.css"; // Your custom styles

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const loader = useSelector((state) => state.loader.loader);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch movies based on search query or pagination
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const searchApi = searchInput
        ? `/3/search/movie?query=${searchInput}&api_key=21994b44ea3a6af47ccef5404de143d5`
        : `/3/discover/movie?api_key=21994b44ea3a6af47ccef5404de143d5&page=${currentPage}`;

      try {
        const { data } = await instance.get(searchApi);
        if (searchInput || currentPage === 1) {
          setMovies(data.results); // Reset the movie list for a search or first page
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new movies for pagination
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchInput, currentPage]);

  // Handle search input change
  const handleSearchInputChange = (input) => {
    setSearchInput(input);
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Toggle favorite status
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.find((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state: hidden and moved down
    visible: { opacity: 1, y: 0 }, // Final state: visible and moved to position
  };

  return (
    <div className="container movies">
      {/* Loader */}
      {loader ? (
        <div className="flex justify-center items-center h-[100vh]">
          <SpinnerInfinity
            size={90}
            thickness={96}
            speed={100}
            color="rgba(57, 58, 172, 1)"
            secondaryColor="rgba(172, 117, 57, 0.1)"
          />
        </div>
      ) : (
        <>
          {/* Movies List */}
          <h1 className="text-white my-5 text-center">
            {searchInput ? "Search Results" : "The Latest Movies"}
          </h1>
          {/* Search Box Component */}
          <div className="mb-20">
            <SearchBox onSearch={handleSearchInputChange} />
          </div>
          <Row xs={1} md={2} lg={4}>
            {movies.map((movie) => (
              <Col key={movie.id} className="px-5 px-md-2">
                {/* Motion Wrapper */}
                <motion.div
                  initial="hidden"
                  whileInView="visible" // Trigger animation on scroll
                  viewport={{ once: true, amount: 0.1 }} // Trigger only once, when 10% of the card is visible
                  variants={cardVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration
                >
                  <Card className="mb-5 border-black border-2 rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out">
                    <Link to={`/movies/details/${movie.id}`}>
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      />
                    </Link>
                    <Card.Body className="bg-black">
                      <i
                        className={`fa fa-heart card-action card2 ${
                          favorites.find((fav) => fav.id === movie.id)
                            ? "active"
                            : ""
                        }`}
                        onClick={() => toggleFavorite(movie)}
                      ></i>
                      <Card.Title className="text-white my-4 fs-5 text-center">
                        {movie.title}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Load More Button */}
          {!loading && !searchInput && (
            <div className="text-center my-5">
              <button
                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                className="btn text-white"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Movies;
