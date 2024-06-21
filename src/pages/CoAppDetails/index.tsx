import React, { useState } from "react";
import styles from "./index.module.css";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import Progress from "../../images/static_assests/progress_first.svg";
import coapp from "../../images/static_assests/co-app.svg";
import Button from "../../components/atoms/Button";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";

function CoAppDetails() {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Header}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => {
                navigate("/loan-steps");
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
          <img
            style={{ maxWidth: "90%", paddingLeft: "2rem" }}
            src={Progress}
            alt=""
          />
          <br />
          <LoanStepCard
            title="Co-applicant Details"
            image={coapp}
            tiime="1 min"
          />
          <br />
          {/* <div className={styles.inputField}>
            <Label text="Full name" />
            <InputText
              placeholder="Full name"
              type="text"
            />
          </div> */}
          <div className={styles.inputField}>
            <Label text="Date of birth" />
            <div
              className={styles.dateInputWrapper}
              onClick={() => document.getElementById("dob-input")?.click()}
            >
              <InputText
                id="dob-input"
                placeholder="Date of birth"
                type="date"
                value={dob}
                changeHandler={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputField}>
            <Label text="PAN number" />
            <InputText placeholder="EBP0000000XR" type="text" />
          </div>
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "self-start",
              gap: "8px",
            }}
          >
            <input
              style={{ marginTop: "0.3rem", width: "1rem" }}
              type="checkbox"
            />
            <p
              style={{
                marginBottom: "1rem",
                paddingBottom: "1rem",
                color: "#667085",
                fontSize: "1.2rem",
              }}
            >
              I consent and authorize{" "}
              <span style={{ color: "#d32028" }}>Fee</span>
              <span style={{ color: "black" }}>monk</span> to get a background
              check and a consumer credit report on me
            </p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <Button
            onPress={() => {
              navigate("/loan-steps-course-details");
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

export default CoAppDetails;
