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
import ArrowRight from "../../images/icons/arrow_right.svg";
import bank from "../../images/static_assests/bank.svg";
import tick_mark from "../../images/static_assests/tick_mark.svg";
import briefcase from "../../images/static_assests/briefcase.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import { useNavigate } from "react-router-dom";
import { relative } from "path";

function IncomeDetails() {
  // const [active, setActive] = useState<"PARENT" | "STUDENT" | "COAPP">("PARENT");
  const [active, setActive] = useState<"SALARIED" | "SELF_EMPLOYEE">(
    "SALARIED"
  );

  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile);
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
      console.log("isBankDetailsMinimized set to false");
    }
  };

  const [selectedProfession, setSelectedProfession] = useState(""); // Initialize selectedClass state

  const [isWorkDetailsFilled, setIsWorkDetailsFilled] = useState(false);
  const [isWorkDetailsMinimized, setIsWorkDetailsMinimized] = useState(false);

  const [isBankDetailsMinimized, setIsBankDetailsMinimized] = useState(false);
  const [isBankDetailsFilled, setIsBankDetailsFilled] = useState(false);

  const toggleWorkDetails = () => {
    setIsWorkDetailsMinimized(!isWorkDetailsMinimized);
  };

  const toggleBankDetails = () => {
    setIsBankDetailsMinimized(!isBankDetailsMinimized);
    console.log("isBankDetailsMinimized toggled to", !isBankDetailsMinimized);
  };

  const handleSaveWorkDetails = () => {
    setIsWorkDetailsFilled(true);
    setIsWorkDetailsMinimized(true);
  };

  const handleSaveBankDetails = () => {
    setIsBankDetailsFilled(true);
    setIsBankDetailsMinimized(true);
    console.log("isBankDetailsFilled set to true");
    console.log("isBankDetailsMinimized set to true");
  };

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
          <img
            style={{ maxWidth: "90%", paddingLeft: "2rem" }}
            src={Progress}
            alt=""
          />
          <br />
          <LoanStepCard
            // description="Permanent Address & Current Location"
            title="Income details"
            image={CourseDetails}
            tiime="3 min"
          />
          <br />
          <>
            {/* My Work Details Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1rem",
                background: "#FFF7F2",
                border: "1px solid #F9D8D6",
                borderRadius: isWorkDetailsMinimized
                  ? "12px"
                  : "12px 12px 0px 0px",
                transition: "border-radius 0.3s ease",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img
                  style={{
                    height: "2.2rem",
                    marginRight: "1.2rem",
                    paddingLeft: "0.4rem",
                  }}
                  src={briefcase}
                  alt=""
                />
                <strong style={{ fontSize: "1.2rem" }}>Work details</strong>
              </div>
              {isWorkDetailsFilled ? (
                <img
                  style={{ height: "1.5rem" }}
                  src={tick_mark}
                  alt="Details filled"
                />
              ) : (
                <img
                  style={{ height: "1.5rem" }}
                  src={isWorkDetailsMinimized ? maximize : minimize}
                  alt={isWorkDetailsMinimized ? "Maximize" : "Minimize"}
                  onClick={toggleWorkDetails}
                />
              )}
            </div>
            {/* My Work Details Input Section */}
            <div
              style={{
                overflow: "hidden",
                transition: "max-height 0.3s ease",
                maxHeight: isWorkDetailsMinimized ? "0" : "1000px",
              }}
            >
              {!isWorkDetailsMinimized && (
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
                  <Label text="Employment Details" />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between", // Adjusted to space-between
                      // gap: "0.5rem", // Adjust as needed
                      padding: "0.25rem",
                      background: "#FFF7F2",
                      border: "1px solid #F9D8D6",
                      borderRadius: isBankDetailsMinimized
                        ? "12px"
                        : "12px 12px 12px 12px",
                      transition: "border-radius 0.3s ease",
                    }}
                  >
                    <p
                      style={{
                        padding: "1rem 3rem",
                        borderRadius: "10px",
                        backgroundColor: active === "SALARIED" ? "#FFFFFF" : "",
                        justifyContent: "center",
                        flex: "1",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setActive("SALARIED");
                      }}
                    >
                      Salaried
                    </p>
                    <p
                      style={{
                        padding: "1rem 2rem",
                        borderRadius: "10px",
                        backgroundColor:
                          active === "SELF_EMPLOYEE" ? "#FFFFFF" : "",
                        cursor: "pointer",
                        flex: "1",
                      }}
                      onClick={() => {
                        setActive("SELF_EMPLOYEE");
                      }}
                    >
                      Self Employee
                    </p>
                  </div>

                  {/* Conditional rendering for Date of birth and Class/Standard */}
                  {active === "SALARIED" && (
                    <>
                      <Label text="Company Name" />
                      <InputText square placeholder="Enter School name" />
                      <Label text="Net annual Salary" />
                      <InputText square placeholder="₹" />
                    </>
                  )}

                  {/* Conditional rendering for School name and Total annual fee */}
                  {active === "SELF_EMPLOYEE" && (
                    <>
                      <Label text="Profession" />
                      <select
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          border: "1px solid #6f6f6f",
                          background: "#fff",
                          fontWeight: "500",
                          fontSize: "1rem",
                          resize: "vertical",
                        }}
                        value={selectedProfession}
                        onChange={(e) => setSelectedProfession(e.target.value)}
                      >
                        <option value="Doctor">Doctor</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Lawyer">Lawyer</option>
                        <option value="Artist">Artist</option>
                        <option value="Architect">Architect</option>
                        <option value="Chef">Chef</option>
                        <option value="Pilot">Pilot</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Scientist">Scientist</option>
                        <option value="Designer">Designer</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                      </select>

                      <Label text="Yearly income" />
                      <InputText square placeholder="₹" />
                    </>
                  )}

                  <Button
                    onPress={handleSaveWorkDetails}
                    text={"Save"}
                    fullWidth
                    secondary
                  />
                </div>
              )}
            </div>
            <br />
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
                  {/* <p style={{ color: "#525252", fontSize: "0.9rem" }}>Your institute is already registered with us, and we have their bank details</p> */}
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
                  {file && (
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
                        borderRadius: isBankDetailsMinimized
                          ? "12px"
                          : "12px 12px 12px 12px",
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
                  )}

                  {!file && (
                    <div>
                      <label
                        htmlFor="file-upload"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            padding: "0.25rem",
                            background: "#FFFCFA",
                            border: "1px solid #6f6f6f",
                            borderRadius: isBankDetailsMinimized
                              ? "12px"
                              : "12px 12px 12px 12px",
                            transition: "border-radius 0.3s ease",
                          }}
                        >
                          {/* Upload Icon */}
                          <img
                            src={upload}
                            style={{ width: "5rem", marginBottom: "0.75rem" }}
                            alt="Upload"
                          />
                          <p
                            style={{
                              color: "#D32028",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              marginBottom: "0.5rem",
                            }}
                          >
                            Click to upload
                          </p>
                          <p
                            style={{
                              color: "#667085",
                              fontSize: "1rem",
                              fontWeight: "500",
                              marginBottom: "1rem",
                            }}
                          >
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </label>
                      <p
                        style={{
                          display: "flex",
                          color: "#667085",
                          fontSize: "1.2rem",
                          fontWeight: "500",
                          flexDirection: "column",
                          marginBottom: "1rem",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          marginLeft: "1rem",
                        }}
                      >
                        {" "}
                        Uploading a bank account statement can enhance your
                        chances of availing better loan amount
                      </p>
                    </div>
                  )}
                  <Button
                    onPress={handleSaveBankDetails}
                    text={"Save"}
                    fullWidth
                    secondary
                  />
                </div>
              )}
            </div>
          </>

          <></>
          <br />
          <Button
            onPress={() => {
              navigate("/loan-steps-loan-offer-");
            }}
            text={"Get loan offer"}
            imageRight={ArrowRight}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default IncomeDetails;
