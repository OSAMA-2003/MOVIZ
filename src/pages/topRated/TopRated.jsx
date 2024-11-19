/** @format */

import { useEffect, useState } from "react";
import "../../components/movies/movies.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../components/reduxStore/slices/FavoriteSlice";
import MoviesSlider from "../../components/moviesSlider/MoviesSlider";
import { instance } from "../../instance";
import {SpinnerInfinity } from "spinners-react";

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const [loading, setLoading] = useState(false); // To track if the data is loading
  const dispatch = useDispatch();  //  دا اللي بياخد الاكشن اللي عايزينه ويبعته ع الستور للرديوسر
  const favorites = useSelector((state) => state.favorites) // دا اللي بياخد الستيت من الستور ويخزنها عندو بحيث تكون متشافة
  const loader = useSelector((state)=>state.loader.loader)
  const topRated ="/3/movie/top_rated?api_key=21994b44ea3a6af47ccef5404de143d5"
  useEffect(() => {
    instance
      .get(
        topRated
      )
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
      // Only append new movies if the page is greater than 1
      if (page > 1) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies to existing list
      } else {
        setMovies(response.data.results); // For the first page, just replace the movies
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false); // Set loading to false once the fetching is done
    }
  };



  // Function to handle favorite toggle
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.find((fav) => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  // Array to track the active state for each card (initially all false)
  const [activeCards, setActiveCards] = useState([false, false]);

  // Function to toggle the "active" class for a specific card
  const toggleActiveClass = (index) => {
    const newActiveCards = [...activeCards];
    newActiveCards[index] = !newActiveCards[index]; // Toggle the specific card
    setActiveCards(newActiveCards); // Update the state
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
) :
    (
    <> 
    <MoviesSlider apiUrl={topRated} />
 
    <div className="container movies" >
      <h1 className="text-white my-5 pb-5 text-center">Top Rated Movies</h1>

      <Row xs={2} md={4}>
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card className="mb-5 border-black hover:scale-105 transition-transform duration-500 ease-in-out">
              <Link to={`/movies/details/${movie.id}`}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              </Link>
              <Card.Body className="bg-black">
                <i
                  className={`fa fa-heart card-action card2 
                  
                    ${
                      favorites.find((fav) => fav.id === movie.id)
                        ? "active"
                        : ""
                    }
                    ${activeCards[movie.id] ? "active" : ""} 
                    `}
                  onClick={() => {
                    toggleFavorite(movie);
                    toggleActiveClass(movie);
                  }}
                ></i>
                <Card.Title className="text-white my-4 fs-5 text-center">
                  {movie.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
        {/* Load More Button */}
        <div className="text-center my-5">
        {!loading && (
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)} // Increment page to load more movies
            className="btn text-white "          >
            Load More
          </button>
        )}
        {loading && <p className="text-white">Loading...</p>}
      </div>
    </div>
    </>
    )
    }

   
    </>
  );
}

export default TopRated;
