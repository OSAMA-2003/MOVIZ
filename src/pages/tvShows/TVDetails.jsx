import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../../components/starRating/StarRating';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { instance } from '../../instance';
// import { Navigation } from 'swiper';

function TVDetails() {
  const [show, setShow] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=21994b44ea3a6af47ccef5404de143d5`
        );
        setShow(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=21994b44ea3a6af47ccef5404de143d5`
        );
        const youtubeTrailer = data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (youtubeTrailer) setTrailer(`https://www.youtube.com/embed/${youtubeTrailer.key}`);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCast = async () => {
      try {
        const { data } = await instance.get(
          `/3/tv/${id}/credits?api_key=21994b44ea3a6af47ccef5404de143d5`
        );
        setCast(data.cast.slice(0, 10)); // Show top 10 cast members
      } catch (error) {
        console.error(error);
      }
    };

    fetchShowDetails();
    fetchTrailer();
    fetchCast();
  }, [id]);

  return (
    <section className="container mx-auto pt-38">
      <button
        onClick={() => navigate(-1)}
        className="btn back-btn  top-[20%] left-5"
      >
        <IoArrowBackOutline />
      </button>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 px-10 items-center">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={show.name}
            className="rounded-lg shadow-white max-w-full"
            style={{
              boxShadow: '0px 3px 20px rgba(255,255, 255, 0.6)',
            }}
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold ">{show.name}</h1>
          <div>
            <h4 className="font-semibold">Description:</h4>
            <p className="text-gray-300">{show.overview}</p>
          </div>
          <div className="flex items-center">
            <h4 className="font-semibold">Rating:</h4>
            <h3 className="text-yellow-500 ml-2">{Number(show.vote_average).toFixed(1)} / 10</h3>
          </div>
          <StarRating rating={show.vote_average} />
          <p className="text-gray-500">Release Date: {show.first_air_date}</p>
        </div>
      </div>

      {/* Cast Slider using Swiper */}
      <div className="my-10">
        <h1 className="font-semibold my-5 text-center">Cast</h1>
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
            <SwiperSlide key={actor.id} className="flex flex-col items-center">
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

      {/* Trailer Section */}
      {trailer && (
        <div className="mt-10">
          <h1 className="text-2xl font-semibold text-center my-5">Watch Trailer</h1>
          <div className="flex justify-center">
            <iframe
              width="100%"
              height="400"
              src={trailer}
              title="Show Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-black mb-5 max-w-4xl"
              style={{
                boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.6)',
              }}
            ></iframe>
            
          </div>
        </div>
      )}
    </section>
  );
}

export default TVDetails;
