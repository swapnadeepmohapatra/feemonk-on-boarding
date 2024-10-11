import React from "react";
import styles from "./index.module.css";

// Define prop types for IdentityCard
interface IdentityCardProps {
  image: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

function IdentityCard({ image, text, isSelected, onClick }: IdentityCardProps) {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <img src={image} alt="" />
      <p>{text}</p>
    </div>
  );
}

export default IdentityCard;
