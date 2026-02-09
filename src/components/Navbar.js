import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/appointment">Appointment</Link>
      {/* <Link to="/profile">Profile</Link> Add Profile link */}
    </div>
  );
};

export default Navbar;
