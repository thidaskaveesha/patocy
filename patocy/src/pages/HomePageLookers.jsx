import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./HomePageLookers.module.css";
import AISupport from "../components/AISupport";
import SideBar from "../components/sideBar";
import changeStyles from "../changeStyles";

function HomePageLookers() {
    // React Router navigation
    const navigate = useNavigate();
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/"); // Navigate to the login page if user is not logged in
            }
        });

        return unsubscribe; // Cleanup function to unsubscribe from the onAuthStateChanged listener
    }, []);

    changeStyles();

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <AISupport />
            </div>
        </div>
    );
}

export default HomePageLookers;
