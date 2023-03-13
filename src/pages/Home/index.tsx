import React from "react";
import styles from "./index.module.css";
import BellIcon from "../../images/icons/bell.svg";
import EduLoanIcon from "../../images/icons/edu_loan.svg";
import LoanImage from "../../images/hero_images/loan.png";

function HomeHeadBar() {
  return (
    <div className={styles.homeHeader}>
      <img className={styles.logo} src="main_logo.png" alt="" />
      <img className={styles.icon} src={BellIcon} alt="" />
    </div>
  );
}

function Heading() {
  return (
    <div className={styles.eduLoanHeading}>
      <img className={styles.icon} src={EduLoanIcon} alt="" />
      <h2>Education Loan</h2>
    </div>
  );
}

function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <HomeHeadBar />
        <Heading />
        <img src={LoanImage} alt="" />
      </div>
    </div>
  );
}

export default Home;
