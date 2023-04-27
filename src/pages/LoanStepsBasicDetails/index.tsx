import React, { useState } from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/progress_first.svg";
import BasicDetails from "../../images/static_assests/basic_details.svg";
import Button from "../../components/atoms/Button";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";

function LoanStepsBasicDetails() {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <br />
          <img src={Progress} alt="" />
          <br />
          <LoanStepCard
            // description="Permanent Address & Current Location"
            title="Basic Details"
            image={BasicDetails}
          />
          <br />
          <div className={styles.inputField}>
            <Label text="Full Name" />
            <InputText
              placeholder="Full Name"
              type="text"
              // value={pan}
              // changeHandler={(e) => setPan(e.target.value)}
            />
          </div>
          <div className={styles.inputField}>
            <Label text="Date of birth" />
            <InputText
              placeholder="DD-MM-YYYY"
              type="text"
              // value={pan}
              // changeHandler={(e) => setPan(e.target.value)}
            />
          </div>
          <div className={styles.inputField}>
            <Label text="Pan Number" />
            <InputText
              placeholder="EBP0000000XR"
              type="text"
              // value={pan}
              // changeHandler={(e) => setPan(e.target.value)}
            />
          </div>
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "self-start",
              gap: "8px",
            }}
          >
            <input type="checkbox" />
            <p>
              I consent and authorize Feemonk to get a background check and a
              consumer credit report on me
            </p>
          </div>
          {/* <img
            src={Basic1}
            alt=""
            onClick={() => {
              setFirst(!first);
            }}
          /> */}
          <br />
          <br />
          <br />
          <br />
          <Button
            onPress={() => {
              navigate("/loan-steps-start");
            }}
            text={"Verify"}
            imageRight={ArrowRight}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default LoanStepsBasicDetails;
