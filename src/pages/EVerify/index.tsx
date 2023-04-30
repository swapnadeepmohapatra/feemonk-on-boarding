import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import EVerifyImg from "../../images/static_assests/e_verify_img.svg";
import Progress from "../../images/static_assests/progress_99.svg";
import Label from "../../components/atoms/Label";
import InputText from "../../components/atoms/InputText";

function EVerify() {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <br />
          <img
            src={Progress}
            alt=""
            style={{
              width: "100%",
            }}
          />
          <br />
          <br />
          <p
            style={{
              textAlign: "center",
              fontSize: "2rem",
              color: "#D32028",
            }}
          >
            Thank you
          </p>
          <br />
          <p
            style={{
              textAlign: "center",
            }}
          >
            We are happy to be part of your/child's education journey.
          </p>
          <br />
          <p
            style={{
              textAlign: "center",
              color: "#D32028",
            }}
          >
            As one final step, please finish the e-verification
          </p>

          <br />

          <br />
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
              borderRadius: "12px",
            }}
          >
            <img src={EVerifyImg} alt="" />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button
            text={"Get Sanction Letter"}
            onPress={() => {
              navigate("/sanction-letter");
            }}
            imageRight={ArrowRight}
            fullWidth
          />
          <br />
          <p
            style={{
              textAlign: "center",
            }}
          >
            I authorize Feemonk to utilize my digital sign at the authentic
            areas for the purpose of loan
          </p>
        </div>
      </div>
    </div>
  );
}

export default EVerify;
