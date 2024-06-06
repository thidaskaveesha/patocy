import React, { useState } from "react";
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

    // Function to toggle sidebar collapse
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`${styles.container} ${collapsed ? styles.collapsed : ''}`} > {/* Container for the entire sidebar */}
            <div className={styles.top}> {/* Top section containing logo and menu collapse icon */}
                <img src={logo} alt="logo" className={`${styles.logo} ${collapsed ? styles.hidden : ''}`} /> {/* Logo */}
                <img src={collapsed ? hamburgerMenu : menuCollapse} alt="menuCollapse" className={styles.menuCollapse} onClick={toggleCollapse} /> {/* Menu collapse icon */}
            </div>
            <div className={styles.userTab}> {/* User section containing user avatar and username */}
                <div className={styles.user}> {/* User information */}
                    <img src={avatar} alt="avatar" /> {/* User avatar */}
                    <p className={collapsed ? styles.hidden : ''}>username</p> {/* Username */}
                </div>
                <img src={arrow} alt="arrow" className={`${styles.menuCollapse} ${collapsed ? styles.hidden : ''}`} /> {/* Arrow icon */}
            </div>
            <hr /> {/* Horizontal line separator */}
            <div className={styles.itemTab}> {/* Item section containing various items */}
                <div className={styles.item}> {/* Item */}
                    <img src={AISupport} alt="ai support" /> {/* AI support icon */}
                    <p className={collapsed ? styles.hidden : ''}>AI Support</p> {/* AI support text */}
                </div>
            </div>
            <div className={styles.itemTab}> {/* Item */}
                <div className={styles.item}>
                    <img src={itIndustry} alt="IT industry" /> {/* IT industry icon */}
                    <p className={collapsed ? styles.hidden : ''}>Job Roles in IT</p> {/* IT industry text */}
                </div>
            </div>
            <div className={styles.itemTab}> {/* Item */}
                <div className={styles.item}>
                    <img src={councelorsIcon} alt="Counselors" /> {/* Counselors icon */}
                    <p className={collapsed ? styles.hidden : ''}>Counselors</p> {/* Counselors text */}
                </div>
            </div>
            <div className={styles.bottom}> {/* Bottom section containing help and logout items */}
                <div className={styles.BottomItemTab}> {/* Help item */}
                    <div className={styles.bottomItem}>
                        <img src={help} alt="Help" /> {/* Help icon */}
                        <p className={collapsed ? styles.hidden : ''}>Help</p> {/* Help text */}
                    </div>
                </div>
                <div className={styles.BottomItemTab}> {/* Logout item */}
                    <div className={styles.bottomItem}>
                        <img src={logout} alt="LogOut" /> {/* Logout icon */}
                        <p className={collapsed ? styles.hidden : ''}>Logout</p> {/* Logout text */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
