import React, { useEffect } from "react";
import "./Footer.css";
import logo from '../assets/logo.png';

function Footer() {
    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 6.898112358382236, lng: 79.85599405211123 },
                zoom: 20,
            });

            new window.google.maps.Marker({
                position: { lat: 6.898112358382236, lng: 79.85599405211123 },
                map: map,
                title: "We are here",
            });
        };
        if (window.google) {
            initMap();
        } else {
            window.initMap = initMap;
        }
    }, []);

    return (
        <div id="footer">
            <div className="footer-logo">
                <img src={logo} alt="Company Logo" />
            </div>
            <div className="vertical-hr"></div>
            <div id="map"></div>
            <div className="vertical-hr"></div>
            <div id="follow">
                <h1>Follow Us</h1>
                <div className="insideContet">
                    <a href="mailto:thidaskaveesha@gmail.com">
                        <h3><i className="fas fa-envelope"></i> Email</h3>
                    </a>
                    <a href="https://www.facebook.com/">
                        <h3><i className="fab fa-facebook"></i> Facebook</h3>
                    </a>
                    <a href="https://www.instagram.com/">
                        <h3><i className="fab fa-instagram"></i> Instagram</h3>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
