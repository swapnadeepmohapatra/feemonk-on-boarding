import React from "react";

function Button({
  onPress,
  text,
  imageLeft,
  imageRight,
  disabled,
  fullWidth,
}: {
  onPress: any;
  text: any;
  imageLeft?: any;
  imageRight?: any;
  disabled?: any;
  fullWidth?: any;
}) {
  return (
    <button
      style={{
        display: "flex",
        backgroundColor: disabled ? "#c1c1c1" : "#D32028",
        padding: "10px 26px",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 32,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        width: fullWidth ? "100%" : "auto",
      }}
      onClick={onPress}
      disabled={disabled}
    >
      <img src={imageLeft} alt=""></img>
      <p
        style={{
          color: "#ffffff",
          fontSize: 22,
          flex: 1,
          textAlign: "center",
          padding: "0px 5px",
          margin: 0,
        }}
      >
        {text}
      </p>
      <img src={imageRight} alt=""></img>
    </button>
  );
}

export default Button;
