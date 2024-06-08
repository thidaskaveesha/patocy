// import section 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./sideBar.module.css";
import logo from "../assets/logoCropped.png";
import menuCollapse from "../assets/menuCollapse.png";
import hamburgerMenu from "../assets/hambergerMenu.png";
import avatar from "../assets/avatar.jpg";
import arrow from "../assets/arrowRight.png";
import AISupport from "../assets/AISupport.png";
import councelorsIcon from "../assets/counselorIcon.png";
import itIndustry from "../assets/itIndustry.png";
import help from "../assets/help.png";
import logout from "../assets/logOut.png";

function SideBar() {
    // State to manage the sidebar collapse
    const [collapsed, setCollapsed] = useState(false);
    // Function to navigate to different pages
    const navigate = useNavigate();

    // Function to toggle sidebar collapse
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        // Main container for the sidebar, conditionally applying the collapsed class
        <div className={`${styles.container} ${collapsed ? styles.collapsed : ''}`}>
            {/* Top section containing logo and menu collapse icon */}
            <div className={styles.top}>
                {/* Logo, hidden when the sidebar is collapsed */}
                <img src={logo} alt="logo" className={`${styles.logo} ${collapsed ? styles.hidden : ''}`} />
                {/* Menu collapse icon, changes based on collapsed state */}
                <img src={collapsed ? hamburgerMenu : menuCollapse} alt="menuCollapse" className={styles.menuCollapse} onClick={toggleCollapse} />
            </div>
            {/* User section containing user avatar and username */}
            <div className={styles.userTab}>
                {/* User information */}
                <div className={styles.user}>
                    <img src={avatar} alt="avatar" /> {/* User avatar */}
                    <p className={collapsed ? styles.hidden : ''}>username</p> {/* Username, hidden when collapsed */}
                </div>
                <img src={arrow} alt="arrow" className={`${styles.menuCollapse} ${collapsed ? styles.hidden : ''}`} /> {/* Arrow icon */}
            </div>
            <hr /> {/* Horizontal line separator */}
            {/* Item section containing various items */}
            <div className={styles.itemTab} onClick={() => navigate('/home')}>
                <div className={styles.item}>
                    <img src={AISupport} alt="ai support" /> {/* AI support icon */}
                    <p className={collapsed ? styles.hidden : ''}>AI Support</p> {/* AI support text, hidden when collapsed */}
                </div>
            </div>
            <div className={styles.itemTab} onClick={() => navigate('/roles')}>
                <div className={styles.item}>
                    <img src={itIndustry} alt="IT industry" /> {/* IT industry icon */}
                    <p className={collapsed ? styles.hidden : ''}>Job Roles in IT</p> {/* IT industry text, hidden when collapsed */}
                </div>
            </div>
            <div className={styles.itemTab} onClick={() => navigate('/counselors')}>
                <div className={styles.item}>
                    <img src={councelorsIcon} alt="Counselors" /> {/* Counselors icon */}
                    <p className={collapsed ? styles.hidden : ''}>Counselors</p> {/* Counselors text, hidden when collapsed */}
                </div>
            </div>
            {/* Bottom section containing help and logout items */}
            <div className={styles.bottom}>
                <div className={styles.BottomItemTab}>
                    <div className={styles.bottomItem}>
                        <img src={help} alt="Help" /> {/* Help icon */}
                        <p className={collapsed ? styles.hidden : ''}>Help</p> {/* Help text, hidden when collapsed */}
                    </div>
                </div>
                <div className={styles.BottomItemTab}>
                    <div className={styles.bottomItem}>
                        <img src={logout} alt="LogOut" /> {/* Logout icon */}
                        <p className={collapsed ? styles.hidden : ''}>Logout</p> {/* Logout text, hidden when collapsed */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar; // Export the SideBar component
