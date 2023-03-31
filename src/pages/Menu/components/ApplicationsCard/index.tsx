import React from "react";
import styles from "./index.module.css";

interface ApplicationsCardProps {
  status: "Approved" | "Rejected" | "In Progress";
}

function ApplicationsCard({ status }: ApplicationsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardNumber}>
        <p>#EL202303010</p>
      </div>
      <div className={styles.cardDetails}>
        <div>
          <p className={styles.label}>Date</p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div>
          <p className={styles.label}>Status</p>
          <p
            className={`${styles.cardStatus} ${
              styles[status.split(" ").join("")]
            }`}
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsCard;
