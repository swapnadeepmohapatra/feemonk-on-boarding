import React from "react";

function Button({
  onPress,
  text,
  imageLeft,
  imageRight,
  disabled,
}: {
  onPress: any;
  text: any;
  imageLeft?: any;
  imageRight?: any;
  disabled?: any;
}) {
  return (
    <button
      style={{
        display: "flex",
        backgroundColor: disabled ? "#c1c1c1" : "#D32028",
        padding: "10px 10px",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={onPress}
      disabled={disabled}
    >
      <img src={imageLeft} alt=""></img>
      <p
        style={{
          color: "#ffffff",
          fontSize: 16,
          flex: 1,
          textAlign: "center",
          padding: 0,
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
