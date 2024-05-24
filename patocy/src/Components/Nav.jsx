import React, { useState } from "react";
import "./Nav.css";
import logo from '../assets/logo.png';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div id="nav">
            <img src={logo} alt="Company Logo" />
            <div id="nav-links">
                <a href="#home">Home</a>
                <a href="#ourTeam">Our Team</a>
                <a href="#faq">FAQ</a>
                <a href="#contact">Contact</a>
            </div>
            <button id="nav-button">Login</button>
            <i
                className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}
                onClick={toggleMenu}
            ></i>
        </div>
    );
}

export default Nav;
