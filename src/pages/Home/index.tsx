import React from "react";
import styles from "./index.module.css";
import BellIcon from "../../images/icons/bell.svg";
import EduLoanIcon from "../../images/icons/edu_loan.svg";
import LoanImage from "../../images/hero_images/loan.png";
import MyApplicationsImage from "../../images/static_assests/my_applications_icon.svg";
import MyRepaymentsImage from "../../images/static_assests/my_repayments_icon.svg";
import MyLoansImage from "../../images/static_assests/my_loans_icon.svg";
import MyEmiImage from "../../images/static_assests/my_repayments_icon.svg";

import HomeIconBlack from "../../images/icons/home_black.svg";
import GridIconBlack from "../../images/icons/grid_black.svg";
import UserIconBlack from "../../images/icons/user_black.svg";

import HomeIconWhite from "../../images/icons/home_white.svg";
import GridIconWhite from "../../images/icons/grid_white.svg";
import UserIconWhite from "../../images/icons/user_white.svg";
import LoginDialog from "./components/LoginDialog";
import BottomNavigationBar from "../../components/molecules/BottomNavBar";

const loanSections = [
  { text: "My Applications", image: MyApplicationsImage },
  { text: "My Loans", image: MyLoansImage },
  { text: "My Repayments", image: MyRepaymentsImage },
  { text: "My  EMI", image: MyEmiImage },
];

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

function LoanSection() {
  return (
    <div className={styles.loanSectionContainer}>
      {loanSections.map((item) => (
        <div className={styles.loanSection}>
          <img src={item.image} alt="" />
          <p>{item.text}</p>
        </div>
      ))}
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
        <LoanSection />
        <div
          style={{
            flex: 1,
          }}
        ></div>
        <BottomNavigationBar active="Home" />
        <LoginDialog />
      </div>
    </div>
  );
}

export default Home;
