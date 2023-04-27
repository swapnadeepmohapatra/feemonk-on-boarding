import React, { useState } from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/process.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import KYC from "../../images/static_assests/kyc.svg";
import InputText from "../../components/atoms/InputText";
import Button from "../../components/atoms/Button";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";
import Label from "../../components/atoms/Label";

function LoanStepsKYC() {
  const navigate = useNavigate();
  const [currentAddress, setCurrentAddress] = useState("yes");

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
                borderRadius: "0px 0px 12px 12px",
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
              <InputText square placeholder="Door No." />
              <InputText square placeholder="Street / Landmark" />
              <InputText square placeholder="City" />
              <InputText square placeholder="State" />
              <InputText square placeholder="Pincode" />
              <Button
                onPress={() => {}}
                text={"Save"}
                fullWidth={false}
                secondary
              />
              <br />
            </div>
          </div>
          <br />
          <br />
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
            <strong>Is this your current address?</strong>
            <div className={styles.inputField}>
              {/* <Label text="Account Type" /> */}
              <div
                onChange={(event) =>
                  setCurrentAddress((event.target as HTMLInputElement).value)
                }
                defaultValue="yes"
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div>
                  <input
                    type="radio"
                    value="yes"
                    name="yes"
                    checked={currentAddress === "yes"}
                  />{" "}
                  Yes
                </div>
                <div>
                  <input
                    type="radio"
                    value="no"
                    name="student"
                    checked={currentAddress === "no"}
                  />{" "}
                  No
                </div>
              </div>
              {currentAddress === "no" && (
                <div>
                  <br />
                  <div
                    style={{
                      border: "0.5px solid rgba(181, 181, 181, 0.3)",
                    }}
                  ></div>
                  <br />
                  <p>Current Address</p>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <InputText square placeholder="Door No." />
                    <InputText square placeholder="Street / Landmark" />
                    <InputText square placeholder="City" />
                    <InputText square placeholder="State" />
                    <InputText square placeholder="Pincode" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <Button
            text="Save & Next"
            onPress={() => {
              navigate("/loan-steps-income-details");
            }}
            // disabled
            fullWidth
            imageRight={ArrowRight}
          />
        </div>
      </div>
    </div>
  );
}

export default LoanStepsKYC;
