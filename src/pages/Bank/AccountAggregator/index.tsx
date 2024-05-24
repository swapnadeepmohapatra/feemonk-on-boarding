import React, { useState } from "react";
import styles from "./index.module.css";
// import SideBar from "../../components/molecules/SideBar";
import Button from "../../../components/atoms/Button";
import { API_URL } from "../../../utils";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";import {jwtDecode} from 'jwt-decode';


function AccountAggregator() {
  const [authToken] = useLocalStorage("feemonk_data", "");
  const navigate = useNavigate();
  const [redirectLink, setRedirectLink] = useState("");
  // const user=sessionStorage.getItem('auth_token') || ""
  // const decode=jwtDecode(JSON.parse(user).value)  as any
  const getAARedirectLink = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${authToken.value}`);

      const response = await fetch(
        `${API_URL}/account-aggregator/generate`,
        // `${API_URL_STAGING}/account-aggregator/finbox`,
        {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();

      setRedirectLink(result.data.url);
      window.open(result.data.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.container}>
        <div className = {styles.box}>
          <h1>Account Aggregator</h1>
          <br/><br/><br/>
          
          <Button
            text={"Securely Share Bank Statement by OTP sent through bank"}
            onPress={() => {
              getAARedirectLink();
            }}
          />
          <br/>
          <Button
            text={"Upload Bank Statement"}
            onPress={() => {
              navigate("/pdf-upload-bank");
            }}
          />
          </div>
          {/* {redirectLink && <p>{JSON.stringify(redirectLink)}</p>} */}
        </div>
      </div>
    </div>
  );
}

export default AccountAggregator;
