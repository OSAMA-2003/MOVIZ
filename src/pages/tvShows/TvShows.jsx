import { useEffect, useState } from "react";
import "../../components/movies/movies.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../components/reduxStore/slices/FavoriteSlice";
import { SpinnerInfinity } from "spinners-react";
import { instance } from "../../instance";
import SearchBox from "../../components/searchBox/SearchBox";
import MoviesSlider from "../../components/moviesSlider/MoviesSlider";
import { motion } from "framer-motion"; // Import Framer Motion

function TvShows() {
  const topShows = "/3/trending/tv/day?api_key=21994b44ea3a6af47ccef5404de143d5";
  const [shows, setShows] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [loading, setLoading] = useState(false); // Loading state

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // Redux state for favorites

  // Fetch shows when page or search query changes
  useEffect(() => {
    fetchShows(currentPage);
  }, [currentPage, searchInput]);

  // Fetch shows based on page and search query
  const fetchShows = async (page) => {
    setLoading(true);
    const searchApi = searchInput
      ? `/3/search/tv?api_key=21994b44ea3a6af47ccef5404de143d5&query=${searchInput}&page=${page}`
      : `${topShows}&page=${page}`;

    try {
      const response = await instance.get(searchApi);
      if (page > 1) {
        setShows((prevShows) => [...prevShows, ...response.data.results]);
      } else {
        setShows(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle favorite toggle
  const toggleFavorite = (show) => {
    const isFavorite = favorites.find((fav) => fav.id === show.id);
    if (isFavorite) {
      dispatch(removeFavorite(show.id));
    } else {
      dispatch(addFavorite(show));
    }
  };

  // Handle search query change from SearchBox
  const handleSearchChange = (input) => {
    setSearchInput(input); // Update search query when SearchBox is used
    setCurrentPage(1); // Reset to page 1 when the query changes
    fetchShows(1); // Fetch shows for the first page
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
          <MoviesSlider apiUrl={topShows} />

          <div className="container movies">
            <h1 className="text-white my-5 text-center">
              {searchInput ? `${searchInput}` : "TV Shows"}
            </h1>

            {/* SearchBox Component */}
            <div className="max-w-md mx-auto mb-20">
              <SearchBox onSearch={handleSearchChange} /> {/* Pass handler to SearchBox */}
            </div>

            <Row xs={1} md={2} lg={4}>
              {shows.map((show, index) => (
                <Col key={show.id} className="px-5 px-md-2">
                  {/* Motion Wrapper */}
                  <motion.div
                    initial="hidden"
                  whileInView="visible" // Trigger animation on scroll
                  viewport={{ once: true, amount: 0.1 }} // Trigger only once, when 10% of the card is visible
                  variants={cardVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration
                >
                    <Card className="mb-5 border-black hover:scale-105 transition-transform duration-500 ease-in-out">
                      <Link to={`/tvshows/details/${show.id}`}>
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        />
                      </Link>
                      <Card.Body className="bg-black">
                        <i
                          className={`fa fa-heart card-action card2 ${
                            favorites.find((fav) => fav.id === show.id) ? "active" : ""
                          }`}
                          onClick={() => toggleFavorite(show)}
                        ></i>
                        <Card.Title className="text-white my-4 fs-5 text-center">
                          {show.name}
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
                  onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
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

export default TvShows;
