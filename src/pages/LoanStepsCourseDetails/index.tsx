import React, { useState } from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/income_details_page_progress.svg";
import Course1 from "../../images/static_assests/course1.svg";
import Incm2 from "../../images/static_assests/incm2.svg";
import IncomeDetails from "../../images/static_assests/income_details.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import Button from "../../components/atoms/Button";

function LoanStepsCourseDetails() {
  const [first, setFirst] = useState(false);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <img src={Progress} alt="" />
          <br />
          <br />
          <br />
          <br />
          <img
            src={Course1}
            alt=""
            onClick={() => {
              setFirst(!first);
            }}
          />
          <br />
          <br />
          <Button onPress={() => {}} text={"Get loan offer"} />
        </div>
      </div>
    </div>
  );
}

export default LoanStepsCourseDetails;
