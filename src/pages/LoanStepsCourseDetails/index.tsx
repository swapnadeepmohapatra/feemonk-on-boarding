import React, { useState } from "react";
import styles from "./index.module.css";
// import Progress from "../../images/static_assests/progress_90.svg";
import Progress from "../../images/static_assests/process.svg";
// import Course1 from "../../images/static_assests/course1.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import ParentTab from "../../images/static_assests/parent_tab.svg";
import CoAppTab from "../../images/static_assests/co_applicant_tab.svg";
import StudentTab from "../../images/static_assests/student_tab.svg";
import Button from "../../components/atoms/Button";
import CourseDetails from "../../images/icons/course_details.svg";
import maximize from "../../images/icons/maximize.svg";
import minimize from "../../images/icons/minimize.svg";
import program_details from "../../images/static_assests/program_details.svg";
import ArrowRight from "../../images/icons/arrow_right.svg";
import institute_payment_detials from "../../images/static_assests/institute_payment_detials.svg";
import school_payment_detials from "../../images/static_assests/institute_payment_detials.svg";
import tick_mark from "../../images/static_assests/tick_mark.svg";
import child_details from "../../images/static_assests/child_details.svg"
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import { useNavigate } from "react-router-dom";
import { relative } from "path";

function LoanStepsCourseDetails() {

  const [active, setActive] = useState<"PARENT" | "STUDENT" | "COAPP">("PARENT");
  const navigate = useNavigate();

  const [isProgramDetailsFilled, setIsProgramDetailsFilled] = useState(false);
  const [isInstitutePaymentDetailsFilled, setIsInstitutePaymentDetailsFilled] = useState(false);
  const [isProgramDetailsMinimized, setIsProgramDetailsMinimized] = useState(false);
  const [isInstitutePaymentDetailsMinimized, setIsInstitutePaymentDetailsMinimized] = useState(false);
  const [isChildDetailsFilled, setIsChildDetailsFilled] = useState(false);
  const [isChildDetailsMinimized, setIsChildDetailsMinimized] = useState(false);
  const [isSchoolPaymentDetailsMinimized, setIsSchoolPaymentDetailsMinimized] = useState(false);
  const [isSchoolPaymentDetailsFilled,setIsSchoolPaymentDetailsFilled]=useState(false)
  const toggleProgramDetails = () => {
    setIsProgramDetailsMinimized(!isProgramDetailsMinimized);
  };

  const toggleInstitutePaymentDetails = () => {
    setIsInstitutePaymentDetailsMinimized(!isInstitutePaymentDetailsMinimized);
  };

  const handleSaveProgramDetails = () => {
    // Add your logic here to save program details
    
    // Assuming all details are filled and saved successfully
    setIsProgramDetailsFilled(true);
    setIsProgramDetailsMinimized(true); // Minimize program details after saving
  };
  
  const handleSaveInstitutePaymentDetails = () => {
    // Add your logic here to save institute payment details
    
    // Assuming all details are filled and saved successfully
    setIsInstitutePaymentDetailsFilled(true);
    setIsInstitutePaymentDetailsMinimized(true); // Minimize institute payment details after saving
  };
  
  const toggleChildDetails = () => {
    setIsChildDetailsMinimized(!isChildDetailsMinimized);
  };
  
  const toggleSchoolPaymentDetails = () => {
    setIsSchoolPaymentDetailsMinimized(!isSchoolPaymentDetailsMinimized);
  };
  
  const handleSaveChildDetails = () => {
    // Add your logic here to save child details
    
    // Assuming all details are filled and saved successfully
    setIsChildDetailsFilled(true);
    setIsChildDetailsMinimized(true); // Minimize child details after saving
  };
  
  const handleSaveSchoolPaymentDetails = () => {
    // Add your logic here to save school payment details
    
    // Assuming all details are filled and saved successfully
    setIsSchoolPaymentDetailsFilled(true)
    setIsSchoolPaymentDetailsMinimized(true); // Minimize school payment details after saving
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
            title="Course details"
            image={CourseDetails}
            tiime="3 min"
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <img
              style={{
                width: "100%",
                border: active === "PARENT" ? "2px solid #D32028" : "",
                // boxShadow: active === "PARENT" ? "2px #D32028" : "none",
                borderRadius: active === "PARENT" ? "1rem" : "",
              }}
              src={ParentTab}
              alt="ParentTab"
              onClick={() => {
                setActive("PARENT");
              }}
            />
            <img
              style={{
                width: "100%",
                position:"relative",

                border: active === "STUDENT" ? "2px solid #D32028" : "",
                 borderRadius: active === "STUDENT" ? "1rem" : "",

                
                
              }}
              src={StudentTab}
              alt="StudentTab"
              onClick={() => {
                setActive("STUDENT");
              }}
            />
            <img
              style={{
                width: "100%",
                border: active === "COAPP" ? "2px solid #D32028" : "",
                borderRadius: active === "COAPP" ? "1rem" : "",
              }}
              src={CoAppTab}
              alt="CoAppTab"
              onClick={() => {
                setActive("COAPP");
              }}
            />
          </div>
          <br />
          {active === "PARENT" && (
  <>
    {/* My Child Details Section */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem",
        background: "#FFF7F2",
        border: "1px solid #F9D8D6",
        borderRadius: isChildDetailsMinimized ? "12px" : "12px 12px 0px 0px",
        transition: "border-radius 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          style={{ height: "2.2rem", marginRight: "1.2rem",paddingLeft:"0.4rem" }}
          src={child_details}
          alt=""
        />
        <strong style={{ fontSize: "1.2rem" }}>My child details</strong>
      </div>
      {isChildDetailsFilled ? (
        <img
          style={{ height: "1.5rem" }}
          src={tick_mark}
          alt="Details filled"
        />
      ) : (
        <img
          style={{ height: "1.5rem" }}
          src={isChildDetailsMinimized ? maximize : minimize}
          alt={isChildDetailsMinimized ? "Maximize" : "Minimize"}
          onClick={toggleChildDetails}
        />
      )}
    </div>
    {/* My Child Details Input Section */}
    <div
      style={{
        overflow: "hidden",
        transition: "max-height 0.3s ease",
        maxHeight: isChildDetailsMinimized ? "0" : "1000px",
      }}
    >
      {!isChildDetailsMinimized && (
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
          <Label text="Full name" />
          <InputText square placeholder="Full name" />
          <Label text="Date of Birth" />
          <InputText square placeholder="Date of Birth" />
          <Label text="Class/Standard" />
          <InputText square placeholder="Class" />
          <Label text="School name" />
          <InputText square placeholder="Enter School name" />
          <Label text="Total annual fee" />
          <InputText square placeholder="Total annual fee" />
          <Button onPress={handleSaveChildDetails} text={"Save"} fullWidth secondary />
        </div>
      )}
    </div>
    <br />
    <br />
    {/* School Payment Details Section */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem",
        background: "#FFF7F2",
        border: "1px solid #F9D8D6",
        borderRadius: isSchoolPaymentDetailsMinimized ? "12px" : "12px 12px 0px 0px",
        transition: "border-radius 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          style={{ height: "2.2rem", marginRight: "0.5rem" }}
          src={school_payment_detials}
          alt=""
        />
        <div>
          <strong style={{ fontSize: "1.2rem" }}>School payment details</strong>
          <p style={{ color: "#525252", fontSize: "0.9rem" }}>Your institute is already registered with us, and we have their bank details</p>
        </div>
      </div>
      {isSchoolPaymentDetailsFilled ? (
        <img
          style={{ height: "1.5rem" }}
          src={tick_mark}
          alt="Details filled"
        />
      ) : (
        <img
          style={{ height: "1.5rem" }}
          src={isSchoolPaymentDetailsMinimized ? maximize : minimize}
          alt={isSchoolPaymentDetailsMinimized ? "Maximize" : "Minimize"}
          onClick={toggleSchoolPaymentDetails}
        />
      )}
    </div>
    {/* School Payment Details Input Section */}
    <div
      style={{
        overflow: "hidden",
        transition: "max-height 0.3s ease",
        maxHeight: isSchoolPaymentDetailsMinimized ? "0" : "1000px",
      }}
    >
      {!isSchoolPaymentDetailsMinimized && (
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
          <Button onPress={handleSaveSchoolPaymentDetails} text={"Save"} fullWidth secondary />
        </div>
      )}
    </div>
  </>
)}


          {active === "STUDENT" && (
            <>
              {/* Program Details Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: isProgramDetailsMinimized ? "12px" : "12px 12px 0px 0px",
                  transition: "border-radius 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <img
                    style={{height: "2.2rem",marginRight:"0rem"  }}
                    src={program_details}
                    alt=""
                  />
                  <strong style={{ fontSize: "1.2rem" }}>Program details</strong>
                </div>
                {isProgramDetailsFilled ? (
                  <img
                    style={{ height: "1.5rem" }}
                    src={tick_mark}
                    alt="Details filled"
                  />
                ) : (
                  <img
                    style={{ height: "1.5rem" }}
                    src={isProgramDetailsMinimized ? maximize : minimize}
                    alt={isProgramDetailsMinimized ? "Maximize" : "Minimize"}
                    onClick={toggleProgramDetails}
                  />
                )}
              </div>
              {/* Program Details Input Section */}
              <div
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  maxHeight: isProgramDetailsMinimized ? "0" : "1000px", // Set a large value to ensure the full height is reached
                }}
              >
                {!isProgramDetailsMinimized && (
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
                    <Label text="Program name" />
                    <InputText square placeholder="Program name" />
                    <Label text="Total program fee" />
                    <InputText square placeholder="Total program fee" />
                    <Label text="School / College name" />
                    <InputText square placeholder="Enter School / College name" />
                    <Button onPress={() => handleSaveProgramDetails()} text={"Save"} fullWidth secondary />
                  </div>
                )}
              </div>
              <br />
              <br />
              {/* Institute Payment Details Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: isInstitutePaymentDetailsMinimized ? "12px" : "12px 12px 0px 0px",
                  transition: "border-radius 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <img
                    style={{ height: "2.2rem",marginRight:"0.5rem" }}
                    src={institute_payment_detials}
                    alt=""
                  />
                  <div>
                  <strong style={{ fontSize: "1.2rem" }}>Institute payment details</strong>
                  <p style={{color:"#525252",fontSize:"0.9rem"}}>Your institute is already registered with us, and we have their bank details</p>
                  </div>
                </div>
                {isInstitutePaymentDetailsFilled ? (
                  <img
                    style={{ height: "1.5rem" }}
                    src={tick_mark}
                    alt="Details filled"
                  />
                ) : (
                  <img
                    style={{ height: "1.5rem" }}
                    src={isInstitutePaymentDetailsMinimized ? maximize : minimize}
                    alt={isInstitutePaymentDetailsMinimized ? "Maximize" : "Minimize"}
                    onClick={toggleInstitutePaymentDetails}
                  />
                )}
              </div>
              {/* Institute Payment Details Input Section */}
              <div
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  maxHeight: isInstitutePaymentDetailsMinimized ? "0" : "1000px", // Set a large value to ensure the full height is reached
                }}
              >
                {!isInstitutePaymentDetailsMinimized && (
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
                    <Button onPress={() => handleSaveInstitutePaymentDetails()} text={"Save"} fullWidth secondary />
                  </div>
                )}
              </div>
            </>
          )}


          {active === "COAPP" && (
            <>
              <div
                style={{
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: "12px 12px 0px 0px",
                }}
              >
                <p>
                  <strong
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    Beneficiary details
                  </strong>
                </p>
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
              ></div>
              <br />
            </>
          )}
          
          <>
           
          </>
          <br />
          <Button
            onPress={() => {
              navigate("/parking-page");
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

export default LoanStepsCourseDetails;
