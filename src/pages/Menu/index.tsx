import React, { useEffect, useState } from "react";
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
import RepaymentsCard from "./components/RepaymentsCard";
import FeepaymentsCard from "./components/FeepaymentsCard";
import axios from "axios";

function renderSections(
  page: "Applications" | "Loans" | "Repayment" | "Fee Payment",
  applications: any[] = []
) {
  switch (page) {
    case "Applications":
      return (
        <div className={styles.loanSectionBody}>
          <h3 className={styles.heading}>Active Applications</h3>
          {applications.map((application) => (
            <ApplicationsCard
              // status="In Progress"
              status={application?.obj?.applicationProfile?.status}
              appliedOn={application.appliedOn}
              applicationId={application?.obj?.data?.applicationId}
              // status={application.status}
              // key={application.applicationId}
            />
          ))}
          {/* <ApplicationsCard status="In Progress" /> */}
          <h3 className={styles.heading}>Previous Applications</h3>
          <ApplicationsCard status="In Submission" />
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
          <LoansCard status="Inactive" />
        </div>
      );
    case "Repayment":
      return (
        <div className={styles.loanSectionBody}>
          <h3 className={styles.heading}>Active Repayments</h3>
          <RepaymentsCard status="Active" />
          <h3 className={styles.heading}>Previous Repayments</h3>
          <RepaymentsCard status="Inactive" />
        </div>
      );
    case "Fee Payment":
      return (
        <div className={styles.FeepaymentSectionBody}>
          <h3 className={styles.heading}>Current Fee Payments</h3>
          <FeepaymentsCard status="Active" />
          <FeepaymentsCard status="Active" />
          <h3 className={styles.heading}>Previous Fee Payments</h3>
          <FeepaymentsCard status="Inactive" />
          <FeepaymentsCard status="Inactive" />
        </div>
      );
    default:
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
  }
}

function Menu() {
  const [activePage, setActivePage] = useState<
    "Applications" | "Loans" | "Repayment" | "Fee Payment"
  >("Applications");
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchApplications = async (userNumber: string) => {
      try {
        const response = await axios.get(
          `https://customer-apis.feemonk.com/applications/getApplications/${userNumber}`
        );
        setApplications(response.data.res || []);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      }
    };

    const user = sessionStorage.getItem("auth_token") || "";
    if (user) {
      try {
        const decoded = JSON.parse(user).mob as any;
        fetchApplications(decoded);
      } catch (error) {
        console.error("Failed to parse user token", error);
      }
    }
  }, []);

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

          {renderSections(activePage, applications)}
        </div>
        <BottomNavigationBar active="Menu" />
      </div>
    </div>
  );
}

export default Menu;
