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

function renderSections(page: "Applications" | "Loans" | "Repayment") {
  switch (page) {
    case "Applications":
      return (
        <div className={styles.loanSectionBody}>
          <ApplicationsCard status="Approved" />
          <ApplicationsCard status="In Progress" />
          <ApplicationsCard status="Rejected" />
          {/* <img src={MonkHeroImage} alt="" />
          <br />
          <h3>No active application</h3>
          <br />
          <p>Avail up to 2 crores loan</p>
          <br />
          <br /> 
          <Button text={"Apply Now"} onPress={() => {}} /> */}
        </div>
      );
    case "Loans":
      return (
        <div className={styles.loanSectionBody}>
          <LoansCard />
          <LoansCard />
          <LoansCard />
          <LoansCard />
          {/* <img src={MonkHeroImage} alt="" />
          <br />
          <h3>No active loans</h3>
          <br />
          <p>Avail up to 2 crores loan</p>
          <br />
          <br />
          <Button text={"Apply Now"} onPress={() => {}} /> */}
        </div>
      );
    case "Repayment":
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
    "Applications" | "Loans" | "Repayment"
  >("Applications");

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
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
          </div>
          {renderSections(activePage)}
        </div>
        <BottomNavigationBar active="Menu" />
      </div>
    </div>
  );
}

export default Menu;
