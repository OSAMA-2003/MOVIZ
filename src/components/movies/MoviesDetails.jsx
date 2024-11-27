import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../starRating/StarRating';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { instance } from '../../instance';


function MoviesDetails() {
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState('');
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await instance.get(
          `/3/movie/${id}?api_key=21994b44ea3a6af47ccef5404de143d5`
        );
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=21994b44ea3a6af47ccef5404de143d5`
        );
        const trailer = data.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCast = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=21994b44ea3a6af47ccef5404de143d5`
        );
        setCast(data.cast.slice(0, 10)); // Show top 10 cast members
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
    fetchCast();
  }, [id]);

  return (
    <section className="container  mx-auto p-5 lg:p-10">
      <button
        onClick={() => navigate(-1)}
        className="btn back-btn  top-[20%] left-5"
      >
        <IoArrowBackOutline />
      </button>

      <div className="flex pt-28 flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg max-w-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-center lg:text-left">{movie.title}</h1>
          <div>
            <h4 className="font-semibold">Description:</h4>
            <p className="text-gray-400">{movie.overview}</p>
          </div>
          <div className="flex items-center">
            <h4 className="font-semibold">Rating:</h4>
            <h3 className="text-yellow-500 ml-2">{Number(movie.vote_average).toFixed(1)} / 10</h3>
          </div>
          <StarRating rating={movie.vote_average} />
          <p className="text-gray-500">Release Date: {movie.release_date}</p>
        </div>
      </div>

      {/* Cast Slider using Swiper */}
      <div className="my-10">
        <h1 className="text-2xl font-semibold my-5 text-center">Cast</h1>
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          centeredSlides={true}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {cast.map((actor) => (
            <SwiperSlide key={actor.id} className="flex flex-col items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="rounded-circle shadow-lg p-1 w-32 h-32 object-cover"
              />
              <h6 className="font-semibold mt-2">{actor.name}</h6>
              <p className="text-gray-500 text-sm">{actor.character}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Movie Trailer */}
      {trailerKey && (
        <div className="mt-10">
          <h1 className="text-2xl font-semibold text-center mb-5">Watch Trailer</h1>
          <div className="flex justify-center">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg max-w-3xl"
              style={{
                boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.6)',
              }}
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

export default MoviesDetails;
