import React from "react";

interface LoanStepCardProps {
  title?: string;
  description?: string;
  image?: string;
}

function LoanStepCard({ title, description, image }: LoanStepCardProps) {
  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          width: "2.7rem",
          height: "2.7rem",
          borderRadius: "50%",
          backgroundColor: "#F4E5DD",
        }}
      />
      <div>
        <p
          style={{
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "normal",
            color: "#737373",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default LoanStepCard;
