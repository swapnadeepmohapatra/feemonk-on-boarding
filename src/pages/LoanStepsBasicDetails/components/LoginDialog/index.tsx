import React, { useState } from "react";
import Button from "../../../../components/atoms/Button";
import InputText from "../../../../components/atoms/InputText";
import styles from "./index.module.css";

import monk from "../../../../images/static_assests/monk_with_bg.svg";
// import close from "../../../../images/static_assests/redClose.svg";
import Label from "../../../../components/atoms/Label";
import FooterText from "../../../../components/atoms/FooterText";
import OtpText from "../../../../components/atoms/OtpText";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../utils";
import { useLocalStorage } from "../../../../hooks";

function LoginDialog({ support }: any) {
  return (
    <div className={styles.backdrop}>
      <div
        className={styles.loginContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <img style={{marginLeft:"auto",width:"2rem"}}src = {close} onClick={onClose}/> */}
        <img style={{ justifyContent: "center" }} src={monk} />
        <p className={styles.textPreLogin}>Validating your PAN</p>

        <div className={styles.loader}>
          <li className={styles.ball}></li>
          <li className={styles.ball}></li>
          <li className={styles.ball}></li>
        </div>
      </div>
    </div>
  );
}

export default LoginDialog;
