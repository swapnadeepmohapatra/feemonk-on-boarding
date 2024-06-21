import React from "react";
import styles from "./index.module.css";
import calendar from "../../../../images/static_assests/calendar.svg";
import rightArrow from "../../../../images/icons/RedArrow.svg";

interface ApplicationsCardProps {
  status: "In Progress" | "Approved" | "Rejected";
}

function ApplicationsCard({ status }: ApplicationsCardProps) {
  const renderAction = () => {
    switch (status) {
      case "In Progress":
        return (
          <div className={styles.actionContainer}>
            <div className={styles.action}>
              <p className={styles.continue}>Continue</p>
            </div>
            <div className={styles.arrowContainer}>
              <img
                src={rightArrow}
                alt="Right Arrow"
                className={styles.arrow}
              />
            </div>
          </div>
        );
      case "Approved":
        return (
          <div className={styles.actionContainer}>
            <div className={styles.action}>
              <p className={styles.seeMore}>See more</p>
            </div>
            <div className={styles.arrowContainer}>
              <img
                src={rightArrow}
                alt="Right Arrow"
                className={styles.arrow}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p className={styles.label}>
            <span>
              <img
                style={{ marginRight: "0.2rem", marginTop: "0.2rem" }}
                src={calendar}
                alt="Calendar"
              />
            </span>
            Start Date
          </p>
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
      <div className={styles.cardDetails}>
        <div className={styles.cardNumber}>
          <p>#EL202303010</p>
        </div>
        {renderAction()}
      </div>
    </div>
  );
}

export default ApplicationsCard;
