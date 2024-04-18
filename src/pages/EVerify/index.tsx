import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import EVerifyImg from "../../images/static_assests/thumb.svg";
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
              width: "90%",
              marginLeft:"1.3rem"
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
            We are happy to be part of your/child's
            <p>education journey.</p> 
          </p>
          <br />
          <p
            style={{
              textAlign: "center",
              color: "#D32028",
            }}
          >
            As one final step, please finish the 
            <p>e-Mandate through Digital Sign</p>
          </p>

          <br />

          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              border: "1px solid #F9D8D6",
              background: "#FFFCFA",
              padding: "1rem",
              boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
              borderRadius: "12px",
              marginBottom:"2rem"
            }}
          >
            <img style={{width:"6rem",marginBottom:"2rem"}}src={EVerifyImg} alt="" />
            <Button
            
            text={"Proceed & digital sign"}
            onPress={() => {
              navigate("/sanction-letter");
            }}
            imageRight={ArrowRight}
            fullWidth
          />
          <p
            style={{
              marginTop:"2rem",
              
              color:"#667085",
              fontSize:"1.15rem"
            }}
          >
            I authorize <span style={{color:"#D32028",fontWeight:"500"}}>Fee</span><span style={{color:"#000",fontWeight:"500"}}>monk</span> to utilize my digital sign at the authentic
            areas for the purpose of loan
          </p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          
          <br />
          
        </div>
      </div>
    </div>
  );
}

export default EVerify;
