import React, { useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import OutlinedButton from "../OutlinedButton/outlinedButton";
import FilledButton from "../FilledButton/filledButton";
import "./styles.scss";
import { useAuth } from "../../../context/auth";
import DetailsMenu from "../Menu/DetailsMenu";

const Navbar = () => {
  const auth = useAuth();
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const navRef = useRef<HTMLInputElement>(null);

  const fixNav = () => {
    if (navRef.current) {
      if (window.scrollY > navRef.current.offsetHeight + 150) {
        navRef.current.classList.add("active");
      } else {
        navRef.current.classList.remove("active");
      }
    }
  };

  window.addEventListener("scroll", fixNav);

  const logout = () => {
    auth?.logout();
    navigate("/");
  };

  return (
    <>
      <nav className={`nav bg-neutral-800 ${!userId ? 'fixed' : ''}`} ref={navRef}>
        <div className="container">
          <div className="items-container">
            <ul className="nav-left">
              {!userId ? (
                <>
                  <li className="logo">
                    <Link to="/" className="text-xl px-5">
                      Fitness App
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-item">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="nav-item">
                      About
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="logo">
                    <Link to="/home" className="text-xl px-5">
                      Fitness App
                    </Link>
                  </li>
                  <li>
                    <Link to="/home" className="nav-item">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/search" className="nav-item">
                      Search Exercises
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="nav-right">
              {!userId ? (
                <>
                  <li>
                    <Link to="/login" className="nav-item-btn">
                      <FilledButton text={"Login"} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="nav-item-btn">
                      <OutlinedButton text={"Sign Up"} />
                    </Link>
                  </li>{" "}
                </>
              ) : (
                <DetailsMenu logout={logout} username={username}/>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
