import React, { useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import OutlinedButton from "../OutlinedButton/outlinedButton";
import FilledButton from "../FilledButton/filledButton";
import Space from "../Space/space";
import "./styles.scss";
import { useAuth } from "../../../context/auth";

const Navbar = () => {
  const auth = useAuth();
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
      <nav className="nav bg-neutral-800" ref={navRef}>
        <div className="container">
          <h1 className="logo">
            {!auth?.user ? (
              <Link to="/" className="text-xl px-5">
                Fitness App
              </Link>
            ) : (
              <Link to="/home" className="text-xl px-5">
                Fitness App
              </Link>
            )}
          </h1>
          <div className="items-container">
            <ul className="nav-left">
              {!auth?.user ? (
                <>
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
                  <li>
                    <Link to="/home" className="nav-item">
                      Home
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="nav-item">
                      About
                    </a>
                  </li>
                </>
              )}
            </ul>
            <ul className="nav-right">
              {!auth?.user ? (
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
                <>
                  <li>
                    <Link to="/home" className="nav-item-btn">
                      <FilledButton text={"Dashboard"} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile" className="nav-item-btn">
                      <FilledButton text={"User Profile"} />
                    </Link>
                  </li>
                  <li className="nav-item-btn">
                    <FilledButton text={"Logout"} onClickFunc={logout} />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
