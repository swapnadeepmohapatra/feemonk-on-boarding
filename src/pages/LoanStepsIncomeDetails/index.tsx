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
import briefcase from "../../images/static_assests/briefcase.svg"
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import { useNavigate } from "react-router-dom";
import { relative } from "path";
import { API_URL } from "../../utils";

import {jwtDecode} from 'jwt-decode';

function IncomeDetails() {

  // const [active, setActive] = useState<"PARENT" | "STUDENT" | "COAPP">("PARENT");
  const [active, setActive] = useState<"SALARIED" | "SELF_EMPLOYEE">("SALARIED");

  const navigate = useNavigate();
  
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const user=sessionStorage.getItem('auth_token') || ""
  const headerVal= JSON.parse(user).value
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
    }
  };

  const [selectedProfession, setSelectedProfession] = useState(""); // Initialize selectedClass state

  const [isWorkDetailsFilled, setIsWorkDetailsFilled] = useState(false);
  const [isWorkDetailsMinimized, setIsWorkDetailsMinimized] = useState(false);

  const [isBankDetailsMinimized, setIsBankDetailsMinimized] = useState(false);
  const [isBankDetailsFilled,setIsBankDetailsFilled]=useState(false)
  const [companyName, setCompanyName] = useState<string>("");
  const [annualSalary, setAnnualSalary] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const toggleWorkDetails = () => {
    setIsWorkDetailsMinimized(!isWorkDetailsMinimized);
  };
  
  const toggleBankDetails = () => {
    setIsBankDetailsMinimized(!isBankDetailsMinimized);
  };
  const handleSaveWorkDetails = async () => {
    const employmentDetails = {
      employmentType: active,
      employerName: active === "SALARIED" ? companyName : "",
      salary: active === "SALARIED" ? parseFloat(annualSalary) : 0,
      incomePerMonth: active === "SELF_EMPLOYEE" ? parseFloat(monthlyIncome) : 0,
      typeOfBusiness: active === "SELF_EMPLOYEE" ? profession : ""
    };

    try {
      const response = await fetch(`${API_URL}/users/employment-details/create`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${headerVal}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employmentDetails),
      });

      if (response.ok) {
        setIsWorkDetailsFilled(true);
        setIsWorkDetailsMinimized(true);
        // Optionally handle successful response here
      } else {
        // Optionally handle errors here
        console.error("Failed to save work details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };  
  const handleSaveBankDetails = () => {
   
    setIsBankDetailsFilled(true)
    setIsBankDetailsMinimized(true); 
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
          <img style={{maxWidth: "90%", paddingLeft: "2rem"}}src={Progress} alt="" />
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
    borderRadius: isWorkDetailsMinimized ? "12px" : "12px 12px 0px 0px",
    transition: "border-radius 0.3s ease",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <img
      style={{ height: "2.2rem", marginRight: "1.2rem", paddingLeft: "0.4rem" }}
      src={briefcase}
      alt=""
    />
    <strong style={{ fontSize: "1.2rem" }}>Work details</strong>
  </div>
  {isWorkDetailsFilled ? (
    <img style={{ height: "1.5rem" }} src={tick_mark} alt="Details filled" />
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
          justifyContent: "space-between",
          padding: "0.25rem",
          background: "#FFF7F2",
          border: "1px solid #F9D8D6",
          borderRadius: isBankDetailsMinimized ? "12px" : "12px 12px 12px 12px",
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
          onClick={() => setActive("SALARIED")}
        >
          Salaried
        </p>
        <p
          style={{
            padding: "1rem 2rem",
            borderRadius: "10px",
            backgroundColor: active === "SELF_EMPLOYEE" ? "#FFFFFF" : "",
            cursor: "pointer",
            flex: "1",
          }}
          onClick={() => setActive("SELF_EMPLOYEE")}
        >
          Self Employee
        </p>
      </div>

      {active === "SALARIED" && (
        <>
          <Label text="Company Name" />
          <InputText
            square
            placeholder="Enter Company name"
            value={companyName}
            changeHandler={(e) => setCompanyName(e.target.value)}
          />
          <Label text="Net annual Salary" />
          <InputText
            square
            placeholder="₹"
            value={annualSalary}
            changeHandler={(e) => setAnnualSalary(e.target.value)}
          />
        </>
      )}

      {active === "SELF_EMPLOYEE" && (
        <>
          <Label text="Profession" />
          <InputText
            square
            placeholder="Enter your profession"
            value={profession}
            changeHandler={(e) => setProfession(e.target.value)}
          />
          <Label text="Income per month" />
          <InputText
            square
            placeholder="₹"
            value={monthlyIncome}
            changeHandler={(e) => setMonthlyIncome(e.target.value)}
          />
        </>
      )}

<Button onPress={handleSaveWorkDetails} text={"Save"} fullWidth secondary />
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
        borderRadius: isBankDetailsMinimized ? "12px" : "12px 12px 0px 0px",
        transition: "border-radius 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem", // Adjust as needed
            padding: "0.25rem",
            background: "#FFFFFF",
            border: "1px solid #40B64B",
            borderRadius: isBankDetailsMinimized ? "12px" : "12px 12px 12px 12px",
            transition: "border-radius 0.3s ease",
        }}>
            {/* Loading Icon */}
            <img
                src={upload}
                style={{ position: "absolute", top: "0.5rem", left: "0.5rem", width: "2.5rem" }}
                alt="Loading"
            />
            {/* File Name */}
            {file && (
                <>
                    <p style={{ color: "#333", fontSize: "1rem", fontWeight: "500", margin: 0 }}>File Name: {file.name}</p>
                    {/* File Size */}
                    <p style={{ color: "#333", fontSize: "1rem", fontWeight: "500", margin: 0 }}>File Size: {(file.size / 1024 / 1024).toFixed(0)} MB</p>
                    {/* Loading Bar and Percentage */}
                    <div style={{ display: "flex", alignItems: "center", width: "70%" ,marginLeft:"1.5rem"}}>
                        <div style={{ flex: "1", height: "0.5rem", background: "#E0E0E0", borderRadius: "0.25rem", position: "relative" }}>
                            <div style={{ width: `${progress}%`, height: "100%", background: "#40B64B", borderRadius: "0.25rem", position: "absolute", top: 0, left: 0 }}></div>
                        </div>
                        <p style={{ color: "#333", fontSize: "0.8rem", fontWeight: "500", margin: "0.25rem 0", marginLeft: "0.5rem" }}>{progress.toFixed(0)}%</p>
                    </div>
                </>
            )}
            {/* Delete Icon */}
            <img
                src={delete_icon}
                style={{ position: "absolute", top: "0.5rem", right: "0.5rem", width: "2rem" }}
                alt="Delete"
            />
            {/* File Input */}
            <input type="file" onChange={handleFileChange} style={{ opacity: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
          </div>

          <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
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
                  borderRadius: isBankDetailsMinimized ? "12px" : "12px 12px 12px 12px",
                  transition: "border-radius 0.3s ease",
                }}
              >
                {/* Upload Icon */}
                <img
                  src={upload}
                  style={{ width: "5rem", marginBottom: "0.75rem" }}
                  alt="Upload"
                />
                <p style={{ color: "#D32028", fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Click to upload</p>
                <p style={{ color: "#667085", fontSize: "1rem", fontWeight: "500", marginBottom: "1rem" }}>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>

            <p style= {{display:"flex",color:"#667085",fontSize:"1.2rem",fontWeight:"500",flexDirection:"column", marginBottom:"1rem",justifyContent:"center",alignContent:"center",alignItems:"center",marginLeft:"1rem"}}> Uploading a bank account statement can enhance your chances of availing better loan amount</p>
        
          <Button onPress={handleSaveBankDetails} text={"Save"} fullWidth secondary />
          
        </div>
      )}
    </div>
  </>


          
          <>
           
          </>
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
