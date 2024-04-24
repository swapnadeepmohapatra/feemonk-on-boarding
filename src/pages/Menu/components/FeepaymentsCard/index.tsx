import React, { useState } from "react";
import styles from "./index.module.css";
import rightArrow from "../../../../images/icons/RedArrow.svg";
import cashBag from "../../../../images/static_assests/cashbag.svg";
import calendar from "../../../../images/static_assests/calendar.svg";
import emi from "../../../../images/static_assests/emi.svg";
import doc from "../../../../images/static_assests/doc.svg";
import wallet from "../../../../images/static_assests/wallet.svg";
import stud from "../../../../images/static_assests/stud.svg";
import maximize from "../../../../images/icons/maximize.svg";
import minimize from "../../../../images/icons/minimize.svg";
import cap from "../../../../images/static_assests/cap.svg"
import school from "../../../../images/static_assests/school.svg"

import { useNavigate } from "react-router-dom";

interface FeepaymentsCardProps {
  status: "Active" | "Inactive";
}

function FeepaymentsCard({ status }: FeepaymentsCardProps) {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [isProgramDetailsFilled, setIsProgramDetailsFilled] = useState(false);
  const [isProgramDetailsMinimized, setIsProgramDetailsMinimized] = useState(false);
const toggleProgramDetails = () => {
    setIsProgramDetailsMinimized(!isProgramDetailsMinimized);
  };
 const handleSaveProgramDetails = () => {
    
    setIsProgramDetailsFilled(true);
    setIsProgramDetailsMinimized(true); 
  };

  const renderActiveCard = () => (
    <div className={styles.card}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}><span><img style={{ marginRight: "0.3rem" ,width:"1.5rem"}} src={stud} /></span>Beneficiary name </p>
          <p className={styles.cardNumberText}>Mr. Tuviksh Aditya</p>
        </div>
        <div style={{marginTop:"0.4rem"}}>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" ,width:"1.5rem"}} src={cap} /></span>Program/Class</p>
          <p className={styles.cardDate}>Class-II</p>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem",width:"1.5rem" }} src={school} /></span>Institute/School</p>
          <p className={styles.cardDate}>Gaudium International School </p>
        </div>
        
      </div>
      <div className={styles.offerContainer}>
      <div style={{marginRight:"1.2rem",display:"flex",flexDirection:"row"}}>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={emi} /></span>Payable Fee</p>
          <p className={styles.paisa}>₹ 25,000</p>
        </div>
        <div>
          <button className={styles.offerButton} onClick={() => navigate("/loan-steps")}>
            <span><img src={wallet} alt="Cash Bag" /></span>Pay now
          </button>
        </div>
      </div>
    </div>
  );

  const renderInactiveCard = () => (
          
              <div style={{marginTop:"2rem"}}>
              <div >
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
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem",justifyContent:"space-around" }}>
                  <p style={{ fontSize: "1.2rem" ,color:"#D32028"}}>#TRYZ00121</p>
                  <span style={{color:"#E5ADAA"}}> |</span>
                  <strong style={{ fontSize: "0.875rem",color:"#737373" }}><span><img src={stud} style={{marginRight:"0.5rem"}}/></span>Tuviksh Adityas</strong>
                  
                </div>
                 
                  <img
                    style={{ height: "1.5rem" }}
                    src={isProgramDetailsMinimized ? maximize : minimize}
                    alt={isProgramDetailsMinimized ? "Maximize" : "Minimize"}
                    onClick={toggleProgramDetails}
                  />
                
          </div>
              {/* Program Details Input Section */}
              <div
                style={{
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  maxHeight: isProgramDetailsMinimized ? "0" : "1000px", // Set a large value to ensure the full height is reached
                }}>
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
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={calendar} /></span>Payment Date</p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{marginRight:"1.2rem"}}>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={emi} /></span>Amount Paid</p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"1rem",paddingBottom:"1rem"}}>
      <div >
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={calendar} /></span>Program/Class</p>
          <p className={styles.cardDate}>Class-II</p>
        </div>
      <div style={{marginRight:"3.3rem"}}>
          <p className={styles.offerText}>
            <span><img src={doc} alt="Document" /></span>Reciept
          </p>
        </div>
      </div>
      <div>
      <div>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={calendar} /></span>Institute/School</p>
          <p className={styles.cardDate}>Gaudium International School </p>
        </div>
      </div>
                  </div>
                )}
          </div>
          </div>
          
    
    </div>
  );

  return status === "Active" ? renderActiveCard() : renderInactiveCard();
}

export default FeepaymentsCard;
