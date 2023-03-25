import React from "react";
import styles from "./index.module.css";

function LoginDialog() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.loginContainer}>
        <p className={styles.textPreLogin}>To get started</p>
        <p className={styles.textLogin}>Login with</p>
        {/* <h1>LoginDialog</h1> */}
      </div>
    </div>
  );
}

export default LoginDialog;
