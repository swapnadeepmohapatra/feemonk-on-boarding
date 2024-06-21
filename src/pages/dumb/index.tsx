import React, { useState } from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/progress_50.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import upload from "../../images/static_assests/upload.svg";
import delete_icon from "../../images/static_assests/delete.svg";
import StudentTab from "../../images/static_assests/student_tab.svg";
import Button from "../../components/atoms/Button";
import CourseDetails from "../../images/icons/course_details.svg";
import maximize from "../../images/icons/maximize.svg";
import minimize from "../../images/icons/minimize.svg";
import bank from "../../images/static_assests/bank.svg";
import tick_mark from "../../images/static_assests/tick_mark.svg";
import briefcase from "../../images/static_assests/briefcase.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import { useNavigate } from "react-router-dom";

function IncomeDetails() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isBankDetailsFilled, setIsBankDetailsFilled] = useState(false);
  const [isBankDetailsMinimized, setIsBankDetailsMinimized] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate file upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        setProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 500);
      setIsBankDetailsMinimized(false); // Show Div-1
    }
  };

  const toggleBankDetails = () => {
    setIsBankDetailsMinimized(!isBankDetailsMinimized);
  };

  const handleSaveBankDetails = () => {
    setIsBankDetailsFilled(true);
    setIsBankDetailsMinimized(true);
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
          <img
            style={{ maxWidth: "90%", paddingLeft: "2rem" }}
            src={Progress}
            alt=""
          />
          <br />
          <LoanStepCard
            title="Income details"
            image={CourseDetails}
            tiime="3 min"
          />
          <br />
          {/* Bank Details Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "1rem",
              background: "#FFF7F2",
              border: "1px solid #F9D8D6",
              borderRadius: isBankDetailsMinimized
                ? "12px"
                : "12px 12px 0px 0px",
              transition: "border-radius 0.3s ease",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img
                style={{ height: "2.2rem", marginRight: "0.5rem" }}
                src={bank}
                alt=""
              />
              <div>
                <strong style={{ fontSize: "1.2rem" }}>Bank Statement</strong>
              </div>
            </div>
            {isBankDetailsFilled ? (
              <img
                style={{ height: "1.5rem" }}
                src={tick_mark}
                alt="Details filled"
              />
            ) : (
              <img
                style={{ height: "1.5rem" }}
                src={isBankDetailsMinimized ? maximize : minimize}
                alt={isBankDetailsMinimized ? "Maximize" : "Minimize"}
                onClick={toggleBankDetails}
              />
            )}
          </div>
          {/* Bank Details Input Section */}
          <div
            style={{
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              maxHeight: isBankDetailsMinimized ? "0" : "1000px",
            }}
          >
            {!isBankDetailsMinimized && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  border: "1px solid #F9D8D6",
                  background: "#FFFCFA",
                  padding: "1rem",
                  boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                  borderRadius: "0px 0px 12px 12px",
                }}
              >
                <Label text="Account number" />
                <InputText square placeholder="Enter Account number" />
                <Label text="IFSC code" />
                <InputText square placeholder="Enter IFSC code" />
                <Label text="Bank name" />
                <InputText square placeholder="Enter Bank name" />
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem", // Adjust as needed
                    padding: "0.25rem",
                    background: "#FFFFFF",
                    border: "1px solid #40B64B",
                    borderRadius: "12px",
                    transition: "border-radius 0.3s ease",
                  }}
                >
                  {/* Loading Icon */}
                  <img
                    src={upload}
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      left: "0.5rem",
                      width: "2.5rem",
                    }}
                    alt="Loading"
                  />
                  {/* File Name */}
                  {file && (
                    <>
                      <p
                        style={{
                          color: "#333",
                          fontSize: "1rem",
                          fontWeight: "500",
                          margin: 0,
                        }}
                      >
                        File Name: {file.name}
                      </p>
                      {/* File Size */}
                      <p
                        style={{
                          color: "#333",
                          fontSize: "1rem",
                          fontWeight: "500",
                          marginRight: "7.23rem",
                        }}
                      >
                        {(file.size / 1024 / 1024).toFixed(0)} MB
                      </p>
                      {/* Loading Bar and Percentage */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "70%",
                          marginLeft: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            flex: "1",
                            height: "0.5rem",
                            background: "#E0E0E0",
                            borderRadius: "0.25rem",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: `${progress}%`,
                              height: "100%",
                              background: "#40B64B",
                              borderRadius: "0.25rem",
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                          ></div>
                        </div>
                        <p
                          style={{
                            color: "#333",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            margin: "0.25rem 0",
                            marginLeft: "0.5rem",
                          }}
                        >
                          {progress.toFixed(0)}%
                        </p>
                      </div>
                    </>
                  )}
                  {/* Delete Icon */}
                  <img
                    src={delete_icon}
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      width: "2rem",
                    }}
                    alt="Delete"
                  />
                  {/* File Input */}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <br />
          <Button
            onPress={() => {
              navigate("/loan-steps-loan-offer");
            }}
            text={"Get loan offer"}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeDetails;
