import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./ChoosingRole.module.css";
import consaltantRole from "../assets/consaltantRole.png";
import lookersRole from "../assets/lookersRole.png";

function ChoosingRole() {
    // Navigate to the respective page when the role is clicked
    const navigate = useNavigate();
    return (
        <>
            {/* Main container which contains the child container */}
            <div className={styles.container}>
                {/* Child container which contains the login form */}
                <div className={styles.childContainer}>
                    {/* Login title */}
                    <h2 className={styles.title}>Sign up <span>Here</span></h2>
                    {/* Login sentence */}
                    <p className={styles.para}>Choose your role here....</p>
                    {/* Roles container which contains the roles */}
                    <div className={styles.Roles}>
                        <div className={styles.role} onClick={() => navigate('/register-lookers')}>
                            <img src={lookersRole} alt="Industry lookers" />
                            <p>Industry lookers</p>
                        </div>
                        <div className={styles.role} onClick={() => navigate('/register-consultants')}>
                            <img src={consaltantRole} alt="Consultants" />
                            <p>Consultants</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ChoosingRole;
