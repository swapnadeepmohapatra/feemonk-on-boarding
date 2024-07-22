import React, { useState, useEffect } from "react";
import Button from "../../../../components/atoms/Button";
import InputText from "../../../../components/atoms/InputText";
import styles from "./index.module.css";
import ArrowRight from "../../../../images/icons/arrow_right.svg";
import Label from "../../../../components/atoms/Label";
import FooterText from "../../../../components/atoms/FooterText";
import OtpText from "../../../../components/atoms/OtpText";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../../../../utils";
import { useLocalStorage } from "../../../../hooks";
import truecaller from "../../../../images/static_assests/truecaller.svg";
import whatsapp from "../../../../images/static_assests/whatsapp-filled.svg";
import { notifyUrlChange } from "../../../../utils/notifyUrlChange";

interface OTPCredential extends Credential {
  code: string;
}

interface OTPCredentialRequestOptions extends CredentialRequestOptions {
  otp?: { transport: string[] };
}

declare global {
  interface Window {
    OTPlessSignin?: any;
  }
}
function LoginDialog({ reload }: any) {
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [state, setState] = useState<"PHONE" | "OTP">("PHONE");
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useLocalStorage("auth_token", "");

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (state === "OTP") {
      receiveOTP();
    }
  }, [state]);

  useEffect(() => {
    const callback = (otplessUser: any) => {
      const emailMap = otplessUser.identities.find(
        (item: any) => item.identityType === "EMAIL"
      );
      const mobileMap = otplessUser.identities.find(
        (item: any) => item.identityType === "MOBILE"
      )?.identityValue;
      const token = otplessUser.token;
      const email = emailMap?.identityValue;
      const mobile = mobileMap?.identityValue;
      const name = emailMap?.name || mobileMap?.name;

      console.log("User Info:", otplessUser);

      if (token) {
        setAuthToken({ value: token, mob: mobile });
        authenticate(token);
      }
    };

    // Load OTPLESS SDK if not already present
    if (!window.OTPlessSignin) {
      const script = document.createElement("script");
      script.id = "otpless-sdk";
      script.src = "https://otpless.com/v2/headless.js";
      script.dataset.appid = "77L4509B8ZHAQ7YUECPV";
      document.head.appendChild(script);

      script.onload = () => {
        (window as any).OTPlessSignin = new (window as any).OTPless(callback);
      };
    } else {
      (window as any).OTPlessSignin = new (window as any).OTPless(callback);
    }
  }, []);

  const updateSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
    notifyUrlChange(window.location.href);
  };

  const sendOtp = (mob?: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ mobile: mob || number });

    updateSearchParams("mobile", number);

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

  useEffect(() => {
    if (searchParams.get("mobile")) {
      setNumber(searchParams.get("mobile") as string);
      sendOtp(searchParams.get("mobile") as string);
      setState("OTP");

      if (searchParams.get("otp")) {
        setOtp(searchParams.get("otp") as string);
        verifyOtp(searchParams.get("otp") as string);
      }
    }
  }, [searchParams]);

  const verifyOtp = (_otp?: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      mobile: number,
      otp: _otp || otp,
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

  const receiveOTP = async () => {
    // Suppress TypeScript error for WebOTP API
    // @ts-ignore
    if (!navigator.credentials || !navigator.credentials.get) {
      console.error("WebOTP API not supported in this browser.");
      return;
    }

    try {
      // Suppress TypeScript error for unsupported `otp` property
      const options: OTPCredentialRequestOptions = {
        otp: { transport: ["sms"] },
        signal: new AbortController().signal,
      };

      // Suppress TypeScript error for `credentials.get`
      // @ts-ignore
      const content = (await navigator.credentials.get(
        options
      )) as OTPCredential;

      if (content && content.code) {
        setOtp(content.code);
        alert("OTP received automatically!");
        verifyOtp(content.code);
      } else {
        console.error("No OTP received.");
      }
    } catch (err) {
      console.error("Error receiving OTP:", err);
    }
  };

  const launchTruecaller = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `truecallersdk://truesdk/web_verify?type=btmsheet&requestNonce=UNIQUE_REQUEST_ID&partnerKey=bicXuac7c6d070212436d80177b56a0f9c688&partnerName=feemonk&lang=EN&privacyUrl=https://www.feemonk.com/&termsUrl=https://www.feemonk.com/&loginPrefix=continue&loginSuffix=login&ctaPrefix=use&ctaColor=%23d32028&ctaTextColor=%23ffffff&btnShape=round&skipOption=useanothernum&ttl=8000`;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);

      if (document.hasFocus()) {
        // Truecaller app not present on the device, handle fallback
        console.log("Truecaller app not present");
        window.open(
          "https://play.google.com/store/apps/details?id=com.truecaller"
        );
      } else {
        // Truecaller app present, handle the app opening
        console.log("Truecaller app opened");
      }
    }, 600);
  };

  const handleWhatsAppLogin = () => {
    (window as any).OTPlessSignin.initiate({
      channel: "OAUTH",
      channelType: "WHATSAPP",
    });
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
            onPress={() => verifyOtp(otp)}
            imageRight={ArrowRight}
            fullWidth
          />
          <br />
          <br />
          <FooterText text="By logging in you consent to share your mobile number and name with Feemonk" />
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
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <img
              src={truecaller}
              style={{
                height: "3.5rem",
                cursor: "pointer",
              }}
              onClick={launchTruecaller}
              alt="Login with Truecaller"
            />
            <img
              src={whatsapp}
              style={{
                height: "3.5rem",
                cursor: "pointer",
              }}
              onClick={handleWhatsAppLogin}
              alt="Login with whatsapp"
            />
          </div>
          <br />
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <p className={styles.orText}>OR</p>
            <div className={styles.line}></div>
          </div>
          <br />
        </div>

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
          onPress={() => sendOtp(number)}
          imageRight={ArrowRight}
          fullWidth
        />
        <br />
        <br />
        <FooterText text="By logging in you consent to share your mobile number and name with Feemonk" />
      </div>
    </div>
  );
}

export default LoginDialog;
