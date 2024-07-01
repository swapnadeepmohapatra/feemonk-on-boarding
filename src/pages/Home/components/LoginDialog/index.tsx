import React, { useState, useEffect } from "react";
import Button from "../../../../components/atoms/Button";
import InputText from "../../../../components/atoms/InputText";
import styles from "./index.module.css";
import ArrowRight from "../../../../images/icons/arrow_right.svg";
import Label from "../../../../components/atoms/Label";
import FooterText from "../../../../components/atoms/FooterText";
import OtpText from "../../../../components/atoms/OtpText";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../utils";
import { useLocalStorage } from "../../../../hooks";

function LoginDialog({ reload }: any) {
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState<"PHONE" | "OTP">("PHONE");
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useLocalStorage("auth_token", "");

  useEffect(() => {
    if ("OTPCredential" in window) {
      window.addEventListener("DOMContentLoaded", () => {
        const input = document.querySelector(
          'input[autocomplete="one-time-code"]'
        ) as HTMLInputElement | null;
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest("form");
        if (form) {
          form.addEventListener("submit", () => {
            ac.abort();
          });
        }
        (
          navigator.credentials.get({
            // @ts-ignore
            otp: { transport: ["sms"] },
            signal: ac.signal,
          }) as Promise<any>
        )
          .then((otp) => {
            if (otp && input) {
              input.value = otp.code;
              if (form) form.submit();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, []);

  const sendOtp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile: number,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_URL}/login/otp`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          alert(result.message[0]);
        } else if (result.message === "Successful") {
          setState("OTP");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const verifyOtp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile: number,
      otp: otp,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_URL}/login/verify-otp`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result.message === "Invalid OTP") {
          alert("Invalid OTP");
        } else if (result.message === "Successful") {
          setAuthToken({
            value: result.data,
            mob: number,
          });

          authenticate(result.data);

          reload();

          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const authenticate = (auth_token: string) => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${authToken && authToken.value}`);

    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${API_URL}/login/auth`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Successful") {
          navigate("/home");

          setTimeout(() => {}, 500);
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (state === "OTP") {
    return (
      <div className={styles.backdrop}>
        <div className={styles.loginContainer}>
          <p className={styles.textLogin}>Enter OTP</p>
          <p className={styles.textPreLogin}>
            sent to <strong>+91 {number}</strong>
          </p>
          <br />
          <OtpText otp={otp} setOtp={setOtp} />
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
            onPress={verifyOtp}
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
        <InputText
          placeholder="Mobile Number"
          changeHandler={(e) => setNumber(e.target.value)}
          type="number"
        />
        <br />
        <Button
          text={"Get OTP"}
          onPress={sendOtp}
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
