import React, { useState } from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/progress_50.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import ParentTab from "../../images/static_assests/parent_tab.svg";
import CoAppTab from "../../images/static_assests/co_applicant_tab.svg";
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

function IncomeDetails() {

  // const [active, setActive] = useState<"PARENT" | "STUDENT" | "COAPP">("PARENT");
  const [active, setActive] = useState<"SALARIED" | "SELF_EMPLOYEE">("SALARIED");

  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(""); // Initialize selectedClass state

  const [isWorkDetailsFilled, setIsWorkDetailsFilled] = useState(false);
  const [isWorkDetailsMinimized, setIsWorkDetailsMinimized] = useState(false);

  const [isBankDetailsMinimized, setIsBankDetailsMinimized] = useState(false);
  const [isBankDetailsFilled,setIsBankDetailsFilled]=useState(false)

  const toggleWorkDetails = () => {
    setIsWorkDetailsMinimized(!isWorkDetailsMinimized);
  };
  
  const toggleBankDetails = () => {
    setIsBankDetailsMinimized(!isBankDetailsMinimized);
  };
  
  const handleSaveWorkDetails = () => {

    setIsWorkDetailsFilled(true);
    setIsWorkDetailsMinimized(true);
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
          style={{ height: "2.2rem", marginRight: "1.2rem",paddingLeft:"0.4rem" }}
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
              gap: "0.5rem", // Adjust as needed
              padding: "0.25rem",
              background: "#FFF7F2",
              border: "1px solid #F9D8D6",
              borderRadius: isBankDetailsMinimized ? "12px" : "12px 12px 12px 12px",
              transition: "border-radius 0.3s ease",
            }}
                >
            <p style={{  
              padding: "1rem 3rem", 
              borderRadius: "10px",
              backgroundColor:active === "SALARIED"?"#FFFFFF":"" ,
              justifyContent: "center", 
              flex: "1" ,}}
               onClick={() => {setActive("SALARIED");}}>Salaried</p>
            <p style={{ padding: "1rem 2rem",
             borderRadius: "10px",
             backgroundColor:active === "SELF_EMPLOYEE"?"#FFFFFF":"" , }}
              onClick={()=>{setActive("SELF_EMPLOYEE")}}>Self Employee</p>
          </div>
          <>
          <Label text="Date of birth" />
              <div className={styles.dateInputWrapper} onClick={() => document.getElementById('dob-input')?.click()}>
                <InputText
                  id="dob-input"
                  placeholder="Date of birth"
                  type="date"
                  value={dob}
                  changeHandler={(e) => setDob(e.target.value)}
                />
              </div>
              <Label text="Class/Standard" />
                <select
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #6f6f6f",background: "#fff",fontWeight:"500" ,fontSize:"1rem",resize:"vertical"}}
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => (
                    <option key={value} value={value}>
                      Class {value}
                    </option>
                  ))}
                </select>


          <Label text="School name" />
          <InputText square placeholder="Enter School name" />
          <Label text="Total annual fee" />
          <InputText square placeholder="₹" />
          <Button onPress={handleSaveWorkDetails} text={"Save"} fullWidth secondary />
          </>
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
          <strong style={{ fontSize: "1.2rem" }}>Bank details</strong>
          <p style={{ color: "#525252", fontSize: "0.9rem" }}>Your institute is already registered with us, and we have their bank details</p>
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
