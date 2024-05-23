import React from 'react';
import './OurTeam.css';
import thidas from '../assets/devThidas.png';
import nimesh from '../assets/nimesh.png';
import rasan from '../assets/rasan.png';
import praveena from '../assets/praveena.png';

function OurTeam() {
    return (
        <div id="ourTeam">
            <h1>Our Team</h1>
            <p>Meet the incredible team behind <span>“Patocy”.</span></p>
            <div className="cards-container">
                <div className="cards">
                    <div className="card">
                        <img src={thidas} alt="teamMember" />
                        <div className="dataNames">
                            <h2>Thidas Kaveesha</h2>
                            <p>Developer</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src={nimesh} alt="teamMember" />
                        <div className="dataNames">
                            <h2>Nimesh Lakshan</h2>
                            <p>Business Analyst</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src={rasan} alt="teamMember" />
                        <div className="dataNames">
                            <h2>Rasan Chamika</h2>
                            <p>Developer</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src={praveena} alt="teamMember" />
                        <div className="dataNames">
                            <h2>Praveena Nimnadi</h2>
                            <p>Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurTeam;
