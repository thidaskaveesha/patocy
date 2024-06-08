import React from "react";
import styles from "./HomePageLookers.module.css";
import AISupport from "../components/AISupport";
import SideBar from "../components/sideBar";
import changeStyles from "../changeStyles";

function HomePageLookers() {
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
