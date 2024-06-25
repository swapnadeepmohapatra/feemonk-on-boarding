import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import Confetti from "../../images/static_assests/confeti.svg";
import warning from "../../images/icons/warning.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
function LoanOffer() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti after component mounts
    setShowConfetti(true);
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.container} style={{ marginBottom: "" }}>
        {/* Apply animation class if showConfetti is true */}

        <div className={styles.Header}>
          <button
            style={{ border: "none", background: "none", marginTop: "2rem" }}
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
          <p
            style={{
              marginRight: "0.5rem",
              fontWeight: "bold",
              marginTop: "2rem",
            }}
          >
            T&C
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "12rem",
            marginTop: "6rem",
          }}
        >
          <img style={{ height: "5rem" }} src={warning} alt="" />

          <br />
          <p
            style={{
              textAlign: "center",
              fontSize: "1.71rem",
              justifyContent: "center",
              margin: "1.5rem",
            }}
          >
            Your Cibil Score is not allowing us to offer you the loan, but we
            have solution for you
          </p>
          <br />

          <p
            style={{
              textAlign: "center",
              fontSize: "1.6rem",
              fontWeight: "bold",
              padding: "1rem",
              color: "#D32028",
            }}
          >
            You can add a Co-applicant & avail loan now
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button
            text={"Add Co-applicant"}
            onPress={() => {
              navigate("/coapp-details");
            }}
            imageRight={ArrowRight}
          />
        </div>
      </div>
    </div>
  );
}

export default LoanOffer;
