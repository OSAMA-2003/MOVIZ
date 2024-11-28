/** @format */

import { useEffect, useState } from "react";
import "../../components/movies/movies.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../components/reduxStore/slices/FavoriteSlice";
import MoviesSlider from "../../components/moviesSlider/MoviesSlider";
import { instance } from "../../instance";
import { SpinnerInfinity } from "spinners-react";
import { motion } from "framer-motion"; // Import Framer Motion

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const [loading, setLoading] = useState(false); // To track if the data is loading
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // Redux state for favorites
  const topRated = "/3/movie/top_rated?api_key=21994b44ea3a6af47ccef5404de143d5";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    instance
      .get(topRated)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  // Fetch movies for a specific page
  const fetchMovies = async (page) => {
    setLoading(true); // Set loading to true while fetching data
    try {
      const response = await instance.get(`${topRated}&page=${page}`);
      if (page > 1) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies
      } else {
        setMovies(response.data.results); // Replace movies on first page
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // Set loading to false once fetching is done
    }
  };

  // Handle favorite toggle
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
    <>
      {loading ? (
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
          <MoviesSlider apiUrl={topRated} />

          <div className="container movies">
            <h1 className="text-white my-5 pb-5 text-center">Top Rated Movies</h1>

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
                    <Card className="mb-5 border-black hover:scale-105 transition-transform duration-500 ease-in-out">
                      <Link to={`/movies/details/${movie.id}`}>
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                      </Link>
                      <Card.Body className="bg-black">
                        <i
                          className={`fa fa-heart card-action card2 ${
                            favorites.find((fav) => fav.id === movie.id) ? "active" : ""
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
            <div className="text-center my-5">
              {!loading && (
                <button
                  onClick={() => setCurrentPage((prevPage) => prevPage + 1)} // Increment page to load more movies
                  className="btn text-white"
                >
                  Load More
                </button>
              )}
              {loading && <p className="text-white">Loading...</p>}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TopRated;
