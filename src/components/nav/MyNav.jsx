/** @format */

import { useState } from "react";
import "./nav.css";
import logo from "../../assets/logo.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


const MyNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();

  // Function to close the menu
  const closeMenu = () => {
    setToggleMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="logo mr-10 ">
        <NavLink exact to="/" activeClassName="active">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      {/* Navbar Links */}
      <div className="navbar_links">
        <ul className="navbar_links_container">
          <li>
            <NavLink exact to="/" activeClassName="active" onClick={closeMenu}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/toprated" activeClassName="active" onClick={closeMenu}>
              Top-Rated
            </NavLink>
          </li>
          <li>
            <NavLink to="/tvshows" activeClassName="active" onClick={closeMenu}>
              TV-Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" activeClassName="active" onClick={closeMenu}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar_sign">
        <Link to="/login ">
          <CgProfile className=" text-4xl text-blue-400 hover:text-blue-700 " />
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}

        {toggleMenu && (
          <div className="menu_container">
            <div className="menu_container_links scale-up-center">
              <div className="flex justify-end  items-left">
                
                <Link to="/login " className="mx-3">
                  <CgProfile className=" text-4xl   text-blue-400 hover:text-blue-700 " />
                </Link>
              </div>

              <p>
                <NavLink exact to="/" activeClassName="active" onClick={closeMenu}>
                  Movies
                </NavLink>
              </p>
              <p>
                <NavLink to="/toprated" activeClassName="active" onClick={closeMenu}>
                  Top-Rated
                </NavLink>
              </p>
              <p>
                <NavLink to="/tvshows" activeClassName="active" onClick={closeMenu}>
                  TV-Shows
                </NavLink>
              </p>
              <p>
                <NavLink to="/favorites" activeClassName="active" onClick={closeMenu}>
                  Favorites
                </NavLink>
              </p>

              <div className="menu_sign">
                <Link to="/login">
                  <p>Sign in</p>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="btn btn-lg btn-primary btn-login text-white"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MyNav;
