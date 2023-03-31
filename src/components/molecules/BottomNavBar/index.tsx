import React from "react";
import styles from "./index.module.css";
import HomeIconBlack from "../../../images/icons/home_black.svg";
import GridIconBlack from "../../../images/icons/grid_black.svg";
import UserIconBlack from "../../../images/icons/user_black.svg";

import HomeIconWhite from "../../../images/icons/home_white.svg";
import GridIconWhite from "../../../images/icons/grid_white.svg";
import UserIconWhite from "../../../images/icons/user_white.svg";
import { useNavigate } from "react-router-dom";

interface BottomNavigationBarProps {
  active: "Home" | "Menu" | "Profile";
}

function BottomNavigationBar({ active }: BottomNavigationBarProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.bottomNavContainer}>
      <div
        className={styles.bottomNav}
        style={{ backgroundColor: active === "Home" ? "#d32028" : "white" }}
        onClick={() => navigate("/home")}
      >
        <img src={active === "Home" ? HomeIconWhite : HomeIconBlack} alt="" />
      </div>
      <div
        className={styles.bottomNav}
        style={{ backgroundColor: active === "Menu" ? "#d32028" : "white" }}
        onClick={() => navigate("/menu")}
      >
        <img src={active === "Menu" ? GridIconWhite : GridIconBlack} alt="" />
      </div>
      <div
        className={styles.bottomNav}
        style={{ backgroundColor: active === "Profile" ? "#d32028" : "white" }}
        onClick={() => navigate("/")}
      >
        <img
          src={active === "Profile" ? UserIconWhite : UserIconBlack}
          alt=""
        />
      </div>
      {/* <div className={styles.bottomNav}>
		  <img src={HomeIconBlack} alt="" />
		</div>
		<div className={styles.bottomNav}>
		  <img src={GridIconBlack} alt="" />
		</div>
		<div className={styles.bottomNav}>
		  <img src={UserIconBlack} alt="" />
		</div> */}
    </div>
  );
}

export default BottomNavigationBar;
