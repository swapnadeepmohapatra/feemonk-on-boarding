import React from "react";
import Styles from "./index.module.css";

export interface LabelProps {
  text: string;
}

function Label({ text }: LabelProps) {
  return <label className={Styles.labelText}>{text}</label>;
}

export default Label;
