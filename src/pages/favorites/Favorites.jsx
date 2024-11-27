/** @format */

// src/Favorites.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function Favorites() {
  // Access favorites from the Redux store
  const favorites = useSelector((state) => state.favorites);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  

  return (
    <section className="container favorites  ">
      <h1 className="text-white pb-1 text-center">Your Favorites</h1>

      <div className="flex justify-center">
        {/* Display the count of favorite movies */}
        <h2 className="text-center bg-blue-500 text-black w-fit px-4 py-2 rounded-lg mb-14 relative">
          Favorite Shows
          <i className="fa fa-heart fs-1  text-red-700  absolute -top-2 -right-5 text-xl">
            <span className="absolute fs-6 top-0 left-0 right-0 bottom-0 text-white text-xs font-bold flex justify-center items-center w-full h-full">
              {favorites.length}
            </span>
          </i>
        </h2>
      </div>

      {favorites.length > 0 ? (
        <Row xs={1} md={2} lg={4}>
          {favorites.map((movie) => (
            <Col key={movie.id} className="px-5 px-md-2">
              <Card className="mb-5 border-black hover:scale-105 transition-transform duration-500 ease-in-out">
                <Link to={`/movies/details/${movie.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                </Link>
                <Card.Body className="bg-black">
                  <Card.Title className="text-white my-4 fs-5 text-center">
                    {movie.title}  {movie.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-white text-center">
          You have no favorite movies yet.
        </p>
      )}
    </section>
  );
}

export default Favorites;
