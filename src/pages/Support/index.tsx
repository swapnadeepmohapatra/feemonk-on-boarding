import React, { useState } from "react";
import styles from "./index.module.css";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import Progress from "../../images/static_assests/progress_first.svg";
import BasicDetails from "../../images/static_assests/basic_details.svg";
import Button from "../../components/atoms/Button";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { useNavigate } from "react-router-dom";
import LoginDialog from "./components/LoginDialog";

function Support() {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);

  const handleSupportClick = (support: string) => {
    setSelectedSupport(support);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Header}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => {
                navigate("/profile");
              }}
            >
              <img
                style={{ marginLeft: "0.5rem", height: "2rem" }}
                src={BackArrow}
                alt=""
              />
            </button>
            <p style={{ marginRight: "0.5rem", fontWeight: "bold",fontSize:"1.75rem"}}>Support</p>
          </div>
          <br />
          
        </div>
        <div style={{padding:"1rem 2rem"}}>
              <p style={{ paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Issue with EMI Repayment")} >Issue with EMI Repayment</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Need Assistance for Loan Application")} >Need Assistance for Loan Application</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("App not working")} >App not working</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Unable to edit child information")} >Unable to edit child information</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Unable to edit address details")} >Unable to edit address details</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Unable to upload bank statement")} >Unable to upload bank statement</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Unable to add Co-applicant details")} >Unable to add Co-applicant details</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Unable to add/edit work & bank details")} >Unable to add/edit work & bank details</p>
              <p style={{ paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid rgba(172, 172, 172, 1)", fontSize:"1.2rem"}} onClick={() => handleSupportClick("Would like to change institute/school")} >Would like to change institute/school </p>
        </div>
      </div>
      {selectedSupport && (
        <LoginDialog
          support={selectedSupport}
          onClose={() => setSelectedSupport(null)}
        />
      )}
    </div>
    
  );
}

export default Support;
