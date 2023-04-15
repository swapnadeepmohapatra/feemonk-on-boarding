import React, { useState } from "react";
import OtpInput from "react-otp-input";

function OtpText({ otp, setOtp }: any) {
  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span></span>}
      renderInput={(props) => <input {...props} />}
      inputStyle={{
        padding: "6px 0",
        width: "calc(100% / 5)",
        borderRadius: "10px",
        background: "#ffffff",
        border: "1px solid rgba(212, 33, 41, 0.3)",
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        fontSize: "3rem",
        textAlign: "center",
        color: "#D42129",
      }}
      containerStyle={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    />
  );
}

export default OtpText;
