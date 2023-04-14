import React, { useState } from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/income_details_page_progress.svg";
import Incm1 from "../../images/static_assests/incm1.svg";
import Incm2 from "../../images/static_assests/incm2.svg";
import IncomeDetails from "../../images/static_assests/income_details.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import Button from "../../components/atoms/Button";

function LoanStepsIncomeDetails() {
  const [first, setFirst] = useState(false);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <img src={Progress} alt="" />
          <br />
          <br />
          <LoanStepCard
            // description="Permanent Address & Current Location"
            title="Income details"
            image={IncomeDetails}
          />
          <br />
          <br />
          <img
            src={first ? Incm1 : Incm2}
            alt=""
            onClick={() => {
              setFirst(!first);
            }}
          />
          <br />
          <br />
          <Button onPress={() => {}} text={"Save & Next"} />
        </div>
      </div>
    </div>
  );
}

export default LoanStepsIncomeDetails;
