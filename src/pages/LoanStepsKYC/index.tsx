import React from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/process.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import KYC from "../../images/static_assests/kyc.svg";
import InputText from "../../components/atoms/InputText";
import Button from "../../components/atoms/Button";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";

function LoanStepsKYC() {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <img src={Progress} alt="" />
          <br />
          <br />
          <LoanStepCard
            // description="Permanent Address & Current Location"
            title="KYC"
            image={KYC}
          />
          <br />
          <div>
            <div
              style={{
                padding: "1rem",
                background: "#FFF7F2",
                border: "1px solid #F9D8D6",
                borderRadius: "12px 12px 0px 0px",
              }}
            >
              <p>Permanent Address</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                gap: "1rem",
                border: "1px solid #F9D8D6",
                background: "#FFFCFA",
                padding: "1rem",
                boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                borderRadius: "12px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#D32028",
                    fontSize: "1.2rem",
                  }}
                >
                  Note
                </p>
                <p>
                  The following address details are obtained from your e-kyc,
                  please feel free to edit in case of changes
                </p>
              </div>
              <InputText placeholder="Door No." />
              <InputText placeholder="Street / Landmark" />
              <InputText placeholder="City" />
              <InputText placeholder="State" />
              <InputText placeholder="Pincode" />
              <br />
            </div>
          </div>
          <br />
          <br />
          <Button
            text="Save & Next"
            onPress={() => {
              navigate("/loan-steps-income-details");
            }}
            disabled
            imageRight={ArrowRight}
          />
        </div>
      </div>
    </div>
  );
}

export default LoanStepsKYC;
