import React from "react";
import styles from "./index.module.css";
import rightArrow from "../../../../images/icons/RedArrow.svg";
import cashBag from "../../../../images/static_assests/cashbag.svg";
import calendar from "../../../../images/static_assests/calendar.svg";
import emi from "../../../../images/static_assests/emi.svg";
import doc from "../../../../images/static_assests/doc.svg";
import wallet from "../../../../images/static_assests/wallet.svg";
import eye from "../../../../images/static_assests/eye.svg";

import { useNavigate } from "react-router-dom";

interface LoansCardProps {
  status: "Active" | "Inactive";
}

function LoansCard({ status }: LoansCardProps) {
  const navigate = useNavigate();

  const renderActiveCard = () => (
    <div className={styles.card}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}><span><img style={{ marginRight: "0.3rem" }} src={cashBag} /></span>Principal Amount</p>
          <p className={styles.cardNumberText}>₹ 10,00,000</p>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <p className={styles.seeMore}>see more</p>
          </div>
          <div className={styles.arrowContainer}>
            <img src={rightArrow} alt="Right Arrow" className={styles.arrow} />
          </div>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={calendar} /></span>Loan Start Date</p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{marginRight:"1.2rem"}}>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={emi} /></span>EMI</p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
      </div>
      <div className={styles.offerContainer}>
        <div>
          <p className={styles.offerText}>
            <span><img src={doc} alt="Document" /></span>Pre-closure offer
          </p>
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
    <div className={styles.card}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}><span><img style={{ marginRight: "0.3rem" }} src={cashBag} /></span>Principal Amount</p>
          <p className={styles.cardNumberText}>₹ 10,00,000</p>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <p className={styles.seeMore}>see more</p>
          </div>
          <div className={styles.arrowContainer}>
            <img src={rightArrow} alt="Right Arrow" className={styles.arrow} />
          </div>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={calendar} /></span>Loan Closure Date</p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{marginRight:"1.2rem"}}>
          <p className={styles.label}><span><img style={{ marginRight: "0.3rem" }} src={emi} /></span>EMI</p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
        
      </div>
      <div className={styles.offerContainer}>
        <div>
          <p className={styles.offerText}>
            <span><img src={doc} alt="Document" /></span>No-due Certificate
          </p>
        </div>
        <div>
          <button className={styles.offerButton} onClick={() => navigate("/loan-steps")}>
            <span><img src={eye} alt="EMI History" /></span>EMI History
          </button>
        </div>
      </div>

        
    </div>
  );

  return status === "Active" ? renderActiveCard() : renderInactiveCard();
}

export default LoansCard;
