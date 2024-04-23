import React, { useState } from "react";
import styles from "./index.module.css";
import ApplicationsIcon from "../../images/static_assests/applications_icon.svg";
import LoansIcon from "../../images/static_assests/loans_icon.svg";
import MonkHeroImage from "../../images/static_assests/monk_with_bg.svg";
import RepaymentIcon from "../../images/static_assests/repayment_icon.svg";
import BottomNavigationBar from "../../components/molecules/BottomNavBar";
import Button from "../../components/atoms/Button";
import ApplicationsCard from "./components/ApplicationsCard";
import LoansCard from "./components/LoansCard";
import redProfile from "../../images/icons/redProfile.svg";
import RepaymentsCard from "./components/RepaymentsCard"

function renderSections(page: "Applications" | "Loans" | "Repayment" | "Fee Payment") {
  switch (page) {
    case "Applications":
      return (
        <div className={styles.loanSectionBody}>
          <h3 className={styles.heading}>Active Applications</h3>
          <ApplicationsCard status="In Progress" />
          <h3 className={styles.heading}>Previous Applications</h3>
          <ApplicationsCard status="Approved" />
          <ApplicationsCard status="Rejected" />
        </div>
      );
    case "Loans":
      return (
        <div className={styles.loanSectionBody}>
          <h3 className={styles.heading}>Active Loans</h3>
          <LoansCard status="Active" />
          <LoansCard status="Active" />
          <h3 className={styles.heading}>Closed Loans</h3>
          <LoansCard status="Inactive" />
          <LoansCard  status="Inactive"/>
        </div>
      );
    case "Repayment":
      return (
        <div className={styles.loanSectionBody}>
          <h3 className={styles.heading}>Active Repayments</h3>
          <RepaymentsCard status="Active" />
          <h3 className={styles.heading}>Previous Repayments</h3>
          <RepaymentsCard  status="Inactive"/>
        </div>
      );
    case "Fee Payment":
      return (
        <div className={styles.loanSectionBody}>
          <img src={MonkHeroImage} alt="" />
          <br />
          <h3>No active repayments</h3>
          <br />
          <p>Avail up to 2 crores loan</p>
          <br />
          <br />
          <Button text={"Apply Now"} onPress={() => {}} />
        </div>
      );
    default:
      return <div></div>;
  }
}

function Menu() {
  const [activePage, setActivePage] = useState<
    "Applications" | "Loans" | "Repayment" | "Fee Payment"
  >("Applications");

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.homeHeader}>
            <img className={styles.logo} src="main_logo.png" alt="" />
            <img className={styles.icon} src={redProfile} alt="" />
          </div>
          <div className="menuContainer">
            <div className={styles.navbar}>
              <div
                className={
                  activePage === "Applications"
                    ? styles.navBarItemActive
                    : styles.navBarItem
                }
                onClick={() => setActivePage("Applications")}
              >
                <img src={ApplicationsIcon} alt="" />
                <p>Applications</p>
              </div>
              <div
                className={
                  activePage === "Loans"
                    ? styles.navBarItemActive
                    : styles.navBarItem
                }
                onClick={() => setActivePage("Loans")}
              >
                <img src={LoansIcon} alt="" />
                <p>Loans</p>
              </div>
              <div
                className={
                  activePage === "Repayment"
                    ? styles.navBarItemActive
                    : styles.navBarItem
                }
                onClick={() => setActivePage("Repayment")}
              >
                <img src={RepaymentIcon} alt="" />
                <p>Repayment</p>
              </div>
              <div
                className={
                  activePage === "Fee Payment"
                    ? styles.navBarItemActive
                    : styles.navBarItem
                }
                onClick={() => setActivePage("Fee Payment")}
              >
                <img src={ApplicationsIcon} alt="" />
                <p>Fee Payment</p>
              </div>
            </div>
          </div>

          {renderSections(activePage)}
        </div>
        <BottomNavigationBar active="Menu" />
      </div>
    </div>
  );
}

export default Menu;
