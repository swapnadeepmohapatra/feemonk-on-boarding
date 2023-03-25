import React from "react";
import Styles from "./index.module.css";

export interface FooterTextProps {
  text: string;
}

function FooterText({ text }: FooterTextProps) {
  return <p className={Styles.labelText}>{text}</p>;
}

export default FooterText;
