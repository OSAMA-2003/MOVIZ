/** @format */

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import MyNav from "./components/nav/MyNav";
import MoviesDetails from "./components/movies/MoviesDetails";
import Favorites from "./pages/favorites/Favorites";
import About from "./pages/about/About";
import Footer from "./components/footer/Footer";
import TopRated from "./pages/topRated/TopRated";
import TvShows from "./pages/tvShows/TvShows";
import TVDetails from "./pages/tvShows/TVDetails";
import { AuthProvider } from "./components/contexts/auth";
import { useState } from "react";
import Profile from "./components/profile/Profile";
import RequiredAuth from "./components/requiredAuth/RequiredAuth";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  // Paths where Nav and Footer should not appear
  const noNavFooterPaths = ["/login", "/signup"];
  const isNoNavFooterPage = noNavFooterPaths.includes(location.pathname);

  return (
    <div className="bg_gradient">
      <AuthProvider value={{ user, login, logout }}>
        {/* Conditionally render Navbar */}
        {!isNoNavFooterPage && <MyNav />}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies/details/:id" element={<MoviesDetails />} />
          <Route path="/tvshows/details/:id" element={<TVDetails />} />
          <Route path="/profile" element={<RequiredAuth><Profile /></RequiredAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/* Conditionally render Footer */}
        {!isNoNavFooterPage && <Footer />}
      </AuthProvider>
    </div>
  );
}

export default App;
