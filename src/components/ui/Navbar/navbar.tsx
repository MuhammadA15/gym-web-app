import React, { useRef } from "react";
import {Link, Outlet} from 'react-router-dom';
import './styles.scss';

const Navbar = () => {
  const navRef = useRef<HTMLInputElement>(null);
  
  const fixNav = () => {
    if (navRef.current) {
      if(window.scrollY > navRef.current.offsetHeight + 150) {
        navRef.current.classList.add('active')
      } else {
          navRef.current.classList.remove('active')
      }
    }
  };

  window.addEventListener('scroll', fixNav);


  return (
    <>
    <nav className="nav" ref={navRef}>
      <div className="container">
        <h1 className="logo">
          <Link to="/">Gym App</Link>
        </h1>
        <div className="items-container">
          <ul className="nav-left">
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="nav-item">About</a>
            </li>
          </ul>
          <ul className="nav-right">
            <li>
              <Link to="/login" className="nav-item">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-item">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="page-content" style={{marginTop: '150px'}}>
      <Outlet />
    </div>
    </>
  );
};

export default Navbar;
