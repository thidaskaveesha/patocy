import React from 'react';
import './Home.css'
import logoSymbol from '../assets/logoSymbol.png';

function Home() {
    return (
        <div id="home">
            <div id="homeText">
                <h1>Your passion is your career
                    in <span> IT</span></h1>
                <p>with patocy you will be understand your passion
                    and will be successful in the career
                </p>
                <button>Get Started</button>
            </div>
            <div id="homeImage">
                <img src={logoSymbol} alt="patocySymbol" />
            </div>
        </div>
    );
}

export default Home;