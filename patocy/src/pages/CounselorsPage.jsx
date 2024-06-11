import React from "react";
import styles from "./HomePageLookers.module.css";
import Counselors from "../components/Counselors";
import SideBar from "../components/sideBar";
import changeStyles from "../changeStyles";

function CounselorsPage() {
    changeStyles();

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <Counselors />
            </div>
        </div>
    );
}

export default CounselorsPage;
