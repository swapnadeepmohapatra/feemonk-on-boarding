import React, { useState } from "react";
import styles from "./index.module.css";
// import SideBar from "../../components/molecules/SideBar";
import Button from "../../../components/atoms/Button";
import { API_URL } from "../../../utils";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useLocation,useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';


function AccountAggregator() {
  const [authToken] = useLocalStorage("feemonk_data", "");
  const navigate = useNavigate();
  const [redirectLink, setRedirectLink] = useState("");
  const user=sessionStorage.getItem('auth_token') || ""
  const decode=(JSON.parse(user).value)  as any
  console.log(decode)
  const { state } = useLocation();

  console.log(state);
  const getAARedirectLink = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${decode}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(
        // `${API_URL_STAGING}/account-aggregator/generate`,
        // `${API_URL_STAGING}/account-aggregator/finbox`,
        `${API_URL}/account-aggregator/finbox`,
        {
          method: "POST",
          headers: headers,
          redirect: "follow",
          body: JSON.stringify({
            bank: (state as any)?.bank?.Name,
          }),
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
