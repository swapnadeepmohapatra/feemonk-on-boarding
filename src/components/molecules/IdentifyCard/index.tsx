import React from "react";
import styles from "./index.module.css";

function IdentityCard({ image, text }: any) {
  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <p>{text}</p>
    </div>
  );
}

export default IdentityCard;
