import React, { useState } from "react";
import styles from "./index.module.css";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import download from "../../images/icons/download.svg";
import BasicDetails from "../../images/static_assests/basic_details.svg";
import Button from "../../components/atoms/Button";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import ArrowRight from "../../images/icons/arrow_right.svg";
import calendar from "../../images/static_assests/calendar.svg";
import bigcalendar from "../../images/static_assests/bigcalendar.svg";
import bigemi from "../../images/static_assests/bigemi.svg";
import biginterest from "../../images/static_assests/biginterest.svg";
import stud from "../../images/static_assests/studgrey.svg";
import cap from "../../images/static_assests/cap.svg";
import school from "../../images/static_assests/school.svg";
import cashbag from "../../images/static_assests/cashbag.svg";
import info from "../../images/static_assests/info.svg";

import wallet from "../../images/static_assests/wallet.svg";
import eye from "../../images/static_assests/blackeye.svg";

import { useNavigate } from "react-router-dom";

function LoanDetails() {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Header} style={{ display: "flex", alignItems: "center" }}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => {
                navigate("/loan-steps");
              }}
            >
              <img
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem", height: "1.75rem" }}
                src={BackArrow}
                alt=""
              />
            </button>
            <p style={{ fontSize: "1.4rem", margin: "0 0rem", display: "flex" }}>Loan details
              <span>
                <p style={{ fontSize: "0.675rem", marginLeft: "0.5rem", padding: "6px 12px", backgroundColor: "#DFF8E4", color: "#45B21E", borderRadius: "16px", fontWeight: "bold", position: "absolute", marginRight: "10rem" }}>Active</p>
              </span>
            </p>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
              <button
                style={{ border: "none", background: "none", marginLeft: "1rem" }}
              >
                <img
                  style={{ height: "1.75rem", marginRight: "2rem" }}
                  src={download}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div style={{ marginLeft: "2.75rem" }}>
            <p style={{ fontSize: "0.775rem", color: "#919191" }}>Application ID: EL202303010</p>
          </div>
          <br />
          <br />
          <div className={styles.principal}>
            <div>
              <p style={{ color: "#606060", marginLeft: "1.5rem" }}>Principal amount</p>
              <p style={{ fontSize: "1.7rem", fontWeight: "bold" }}>₹ 10,00,000</p>
            </div>
            <div style={{ display: "flex", marginTop: "0.75rem" }}>
              <p style={{ color: "#5F5F5F", marginRight: "0.5rem", fontSize: "0.875rem" }}>
                <span><img style={{ marginRight: "0.3rem" }} src={calendar} /></span>Loan Closure Date
              </p>
              <p className={styles.cardDate}>20/03/2023</p>
            </div>
          </div>
          <br />
          <br />
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            border: "1px solid #F9D8D6",
            background: "#FFFCFA",
            padding: "2.5rem 1rem",
            boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
            borderRadius: "12px 12px 12px 12px",
            justifyContent: "space-around"
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={bigemi} style={{ width: "4rem", marginBottom: "1.5rem" }} />
              <p style={{ color: "#737373", fontSize: "0.875rem" }}>EMI</p>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>20677</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
              <img src={bigcalendar} style={{ width: "4rem", marginBottom: "1.5rem" }} />
              <p style={{ color: "#737373", fontSize: "0.875rem" }}>TENURE</p>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>48 Months</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
              <img src={biginterest} style={{ width: "4rem", marginBottom: "1.5rem" }} />
              <p style={{ color: "#737373", fontSize: "0.875rem" }}>INTEREST</p>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>11%</p>
            </div>
          </div>
          <br />
          <br />
          <h3 className={styles.heading}>Disbursal details</h3>
          <div style={{ padding: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div className={styles.cardNumber}>
                <p style={{ color: "#737373" }}>
                  <span><img style={{ marginRight: "0.3rem", width: "1.5rem" }} src={stud} /></span>Beneficiary name
                </p>
                <p className={styles.cardNumberText}>Mr. Tuviksh Aditya</p>
              </div>
              <div style={{ marginTop: "0.4rem" }}>
                <p className={styles.label}>
                  <span><img style={{ marginRight: "0.3rem", width: "1.5rem" }} src={cap} /></span>Program/Class
                </p>
                <p className={styles.cardDate}>Class-II</p>
              </div>
            </div>
            <div className={styles.cardDetails}>
              <div>
                <p className={styles.label}>
                  <span><img style={{ marginRight: "0.3rem", width: "1.5rem" }} src={school} /></span>Institute/School
                </p>
                <p className={styles.cardDate}>Gaudium International School </p>
              </div>
            </div>
          </div>
          <br />
          <br />
          <h3 className={styles.heading}>EMI details</h3>
          <div style={{ padding: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div className={styles.cardNumber}>
                <p style={{ color: "#000000", display: "flex", alignItems: "center" }}>
                  <img style={{ marginRight: "0.3rem", width: "1.5rem" }} src={cashbag} />Outstanding amount
                </p>
                <p style={{ color: "#D23028", fontWeight: "bold", fontSize: "1.2REM" }}>₹ 4,00,000</p>
              </div>
              <div style={{ display: "flex", marginLeft: "1.3rem", flexDirection: "column", alignItems: "flex-start", marginTop: "0.2rem" }}>
                <p style={{ color: "#5F5F5F", marginRight: "0.5rem", fontSize: "0.875rem", display: "flex", alignItems: "center" }}>
                  <img style={{ marginRight: "0.3rem", width: "1rem", marginBottom: "0.5rem" }} src={calendar} />
                  Upcoming EMI date
                </p>
                <p style={{ color: "#D23028", fontWeight: "500", fontSize: "1.2rem" }}>20/03/2023</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between", marginTop: "2rem" }}>
              <div>
                <p style={{ color: "#D23028", fontSize: "1.2REM", textDecoration: "underline", display: "flex", alignItems: "center" }}>
                  <img style={{ marginRight: "0.3rem", width: "1.5rem", marginTop: "" }} src={info} />
                  Avail Loan settlement
                </p>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "3rem", flexDirection: "row", justifyContent: "space-between" }}>
              <div style={{ marginRight: "1rem" }}>
                <button className={styles.offerButton1} onClick={() => navigate("/loan-steps")}>
                  <span style={{ marginRight: "0.3rem", display: "flex", alignItems: "center" }}>
                    <img src={eye} alt="EMI History" style={{ width: "1.75rem" }} />
                  </span>
                  <span style={{ fontSize: "0.875rem" }}>EMI History</span>
                </button>
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <button className={styles.offerButton2} onClick={() => navigate("/loan-steps")}>
                  <span style={{ marginRight: "0.3rem", display: "flex", alignItems: "center" }}>
                    <img src={wallet} alt="Cash Bag" style={{ width: "1.75rem" }} />
                  </span>
                  <span style={{ fontSize: "0.875rem" }}>Pay EMI now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
