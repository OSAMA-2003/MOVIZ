/** @format */

import { useState } from "react";
import "./nav.css";
import logo from "../../assets/logo.png";
import { RiMenu3Line, RiCloseLine, RiSearchLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const MyNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Navbar Links */}
      <div className="navbar_links">
        <div className="logo mr-10 ">
          <img src={logo} alt="logo" />
        </div>

        {/* Navbar Links Container with <p> tags */}
        <ul className="navbar_links_container">
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/toprated" activeClassName="active">
              Top-Rated
            </NavLink>
          </li>
          <li>
            <NavLink to="/tvshows" activeClassName="active">
              TV-Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" activeClassName="active">
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Top Left*/}
      <div className="navbar_sign ">
        <form class="max-w-md mx-auto">
          <div class="relative search mx-4">
            <input
              type="search"
              id="default-search"
              className="block w-full h-full p-2 ps-3 pe-5  rounded-1"
              placeholder="what do you look for...."
              required
            />
            <button type="submit" class=" btn  absolute">
              <RiSearchLine />
            </button>
          </div>
        </form>

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

            
                 {/* Top Left*/}
      <div className=" flex justify-between items-center ">
        <form class=" mx-auto">
          <div class="relative search ">
            <input
              type="search"
              id="default-search"
              className="block w-full h-full p-2 ps-3 pe-5  rounded-1"
              placeholder="what do you look for...."
              required
            />
            <button type="submit" class=" btn  absolute">
              <RiSearchLine />
            </button>
          </div>
        </form>
        <Link to="/login " className="mx-3">
          <CgProfile className=" text-4xl text-blue-400 hover:text-blue-700 " />
        </Link>
      </div>

       


              <p>
                <NavLink exact to="/" ClassName="active">
                  Home
                </NavLink>
              </p>
              <p>
                <NavLink to="/toprated" activeClassName="active">
                  Top-Rated
                </NavLink>
              </p>
              <p>
                <NavLink to="/tvshows" activeClassName="active">
                  TV-Shows
                </NavLink>
              </p>
              <p>
                <NavLink to="/favorites" ClassName="active">
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
