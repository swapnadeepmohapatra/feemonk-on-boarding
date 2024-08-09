import React from "react";
import styles from "./index.module.css";
import calendar from "../../../../images/static_assests/calendar.svg";
import rightArrow from "../../../../images/icons/RedArrow.svg";

interface ApplicationsCardProps {
  status: "In Review" | "In Submission" | "Rejected" | "Disbursed";
  appliedOn?: string;
  applicationId?: string;
}

function ApplicationsCard({
  status,
  appliedOn,
  applicationId,
}: ApplicationsCardProps) {
  console.log(status);

  const renderAction = () => {
    switch (status) {
      case "In Review":
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
      case "In Submission":
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
      case "Disbursed":
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
          <p className={styles.cardDate}>
            {new Date(appliedOn || "").getDate()}/
            {new Date(appliedOn || "").getMonth() + 1 < 0 ? "" : "0"}
            {new Date(appliedOn || "").getMonth() + 1}/
            {new Date(appliedOn || "").getFullYear()}
          </p>
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
          <p>#{applicationId}</p>
        </div>
        {renderAction()}
      </div>
    </div>
  );
}

export default ApplicationsCard;
