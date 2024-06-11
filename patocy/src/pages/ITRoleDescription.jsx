import React from "react";
import styles from "./ITIndustryPage.module.css";
import changeStyles from "../changeStyles";
import SideBar from "../components/sideBar";
import RoleDetails from "../components/RoleDetails";

function ITRoleDescription() {
    // Change the background color of the body and display block
    changeStyles();

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <SideBar />
            </div>
            {/* Content */}
            <div className={styles.content}>
                <RoleDetails />
            </div>
        </div>
    );
}

export default ITRoleDescription;
