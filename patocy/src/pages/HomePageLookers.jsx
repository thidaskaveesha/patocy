import React from "react";
import styles from "./HomePageLookers.module.css";
import AISupport from "../components/AISupport";
import SideBar from "../components/sideBar";
import changeStyles from "../changeStyles";

function HomePageLookers() {
    // Change the background color of the body and display block
    changeStyles();

    return (
        <div className={styles.container}>
            <SideBar />
            <AISupport />
        </div>
    );
}

export default HomePageLookers;