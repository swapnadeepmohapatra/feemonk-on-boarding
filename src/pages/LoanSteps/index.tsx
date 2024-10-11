import React from "react";
import Button from "../../components/atoms/Button";
import LoanStepCard from "./components/Card";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import BasicDetails from "../../images/static_assests/basic_details.svg";
import KYC from "../../images/static_assests/kyc.svg";
import IncomeDetails from "../../images/static_assests/income_details.svg";
import CourseDetails from "../../images/static_assests/course_details.svg";
import { useNavigate } from "react-router-dom";

function LoanSteps() {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Header}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => {
                navigate("/home");
              }}
            >
              <img
                style={{ marginLeft: "0.5rem", height: "1.5rem" }}
                src={BackArrow}
                alt=""
              />
            </button>
            <p style={{ marginRight: "0.5rem", fontWeight: "bold" }}>T&C</p>
          </div>
          <br />
          <br />

          <h1 className={styles.headerText}>Get Loan Approval</h1>
          <p className={styles.headerNextText}>in less than 10 mins</p>
          <br />
          <p className={styles.headerLabelText}>NEXT STEPS</p>
          <br />
          <div className={styles.nextStepsCard}>
            <LoanStepCard
              description="Name, date of birth & PAN"
              title="Basic Details"
              image={BasicDetails}
              tiime="1 min"
            />
            <LoanStepCard
              description="Permanent Address & Current Location"
              title="KYC"
              image={KYC}
              tiime="3 min"
            />
            <LoanStepCard
              description="Work details & Bank Statement "
              title="Income details"
              image={IncomeDetails}
              tiime="3 min"
            />
            <LoanStepCard
              description="Program, Institute, fee & Payment details"
              title="Course details"
              image={CourseDetails}
              tiime="3 min"
            />
            {/* <span>
              {" "}
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "black",
                  backgroundColor: "#FFDFE1",
                  paddingTop: "0.2rem",
                  paddingBottom: "0.2rem",
                  paddingLeft: "0.4rem",
                  paddingRight: "0.4rem",
                  borderRadius: "1rem",
                  marginLeft: "4rem",
                  marginBottom: "2rem",
                }}
              >
                LOAN OFFER
              </span>
            </span> */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button
            onPress={() => {
              navigate("/loan-steps-basic-details");
            }}
            text="Get started"
            imageRight={ArrowRight}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default LoanSteps;
