import React from "react";
import Button from "../../../../components/atoms/Button";
import InputText from "../../../../components/atoms/InputText";
import styles from "./index.module.css";
import ArrowRight from "../../../../images/icons/arrow_right.svg";
import Label from "../../../../components/atoms/Label";
import FooterText from "../../../../components/atoms/FooterText";
import OtpText from "../../../../components/atoms/OtpText";

function LoginDialog() {
  if (true) {
    return (
      <div className={styles.backdrop}>
        <div className={styles.loginContainer}>
          <p className={styles.textLogin}>Enter OTP</p>
          <p className={styles.textPreLogin}>
            sent to <strong>+91 8098765432</strong>
          </p>
          <br />
          {/* <Label text="Mobile Number" /> */}
          <br />
          <br />
          {/* <h1>LoginDialog</h1> */}
          <OtpText />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#3A3A3A",
              }}
            >
              30 sec
            </p>
            <p
              style={{
                color: "#D32028",
                textDecoration: "underline",
              }}
            >
              Resend OTP
            </p>
          </div>
          <br />
          <Button
            text={"Verify"}
            onPress={() => {}}
            imageRight={ArrowRight}
            fullWidth
          />
          <br />
          <br />
          <FooterText
            text="By logging in you consent to share your mobile number and name with
            Feemonk"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.loginContainer}>
        <p className={styles.textPreLogin}>To get started</p>
        <p className={styles.textLogin}>Login with</p>
        <br />
        <Label text="Mobile Number" />
        <br />
        <br />
        {/* <h1>LoginDialog</h1> */}
        <InputText placeholder="+91" />
        <br />
        <Button
          text={"Get OTP"}
          onPress={() => {}}
          imageRight={ArrowRight}
          fullWidth
        />
        <br />
        <br />
        <FooterText
          text="By logging in you consent to share your mobile number and name with
          Feemonk"
        />
      </div>
    </div>
  );
}

export default LoginDialog;
