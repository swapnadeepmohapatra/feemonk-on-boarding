import React from "react";
import styles from "./index.module.css";

// interface LoansCardProps {
//   status: "Approved" | "Rejected" | "In Progress";
// }

function LoansCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardNumber}>
        <p className={styles.cardDate}>Principal Amount</p>
        <p className={styles.cardNumberText}>#EL202303010</p>
      </div>
      <div className={styles.cardDetails}>
        <div>
          <p className={styles.label}>Loan Start Date</p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div>
          <p className={styles.label}>EMI</p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
      </div>
    </div>
  );
}

export default LoansCard;
