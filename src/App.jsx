import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import SignUp from "./pages/signUp/SignUp"
import MyNav from "./components/nav/MyNav"
import MoviesDetails from "./components/movies/MoviesDetails"
import Favorites from "./pages/favorites/Favorites"
import About from "./pages/about/About"
import Footer from "./components/footer/Footer"
import TopRated from "./pages/topRated/TopRated"
import TvShows from "./pages/tvShows/TvShows"
import TVDetails from "./pages/tvShows/TVDetails"





function App() {

  return (
    <div className=" bg_gradient" >  
    <MyNav/>
    <Routes>
    <Route index element={<Home/>} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/toprated" element={<TopRated />} />
          <Route exact path="/tvshows" element={<TvShows/>} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/movies/details/:id" element={<MoviesDetails/>}/>  
          <Route exact path="/tvshows/details/:id" element={<TVDetails/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
		</Routes>   
     <Footer/>
    </div>
  )
}

export default App
