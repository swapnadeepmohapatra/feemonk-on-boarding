import React from "react";
import Button from "../../components/atoms/Button";
import LoanStepCard from "./components/Card";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import BasicDetails from "../../images/static_assests/basic_details.svg";
import KYC from "../../images/static_assests/kyc.svg";
import IncomeDetails from "../../images/static_assests/income_details.svg";
import CourseDetails from "../../images/static_assests/course_details.svg";

function LoanSteps() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <br />
          <br />
          <h1 className={styles.headerText}>Get Loan Approval</h1>
          <p className={styles.headerNextText}>in less than 10 mins</p>
          <br />
          <p className={styles.headerLabelText}>Next Steps</p>
          <br />
          <div className={styles.nextStepsCard}>
            <LoanStepCard
              description="Name, date of birth & PAN"
              title="Basic Details"
              image={BasicDetails}
            />
            <LoanStepCard
              description="Permanent Address & Current Location"
              title="KYC"
              image={KYC}
            />
            <LoanStepCard
              description="Work details & Bank Statement "
              title="Income details"
              image={IncomeDetails}
            />
            <LoanStepCard
              description="Program, Institute, fee & Payment details"
              title="Course details"
              image={CourseDetails}
            />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button
            onPress={() => {}}
            text="Get started"
            imageRight={ArrowRight}
          />
        </div>
      </div>
    </div>
  );
}

export default LoanSteps;
