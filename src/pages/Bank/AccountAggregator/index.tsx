import React, { useState } from "react";
import styles from "./index.module.css";
// import SideBar from "../../components/molecules/SideBar";
import Button from "../../../components/atoms/Button";
// import { process.env.REACT_APP_DASHBOARD_URL } from "../../../utils";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BottomNavigationBar from "../../../components/molecules/BottomNavBar";
import BackArrow from "../../../images/icons/arrow-left-circle.svg"
function AccountAggregator() {
  const [authToken] = useLocalStorage("feemonk_data", "");
  const navigate = useNavigate();
  const [redirectLink, setRedirectLink] = useState("");
  const user = sessionStorage.getItem("auth_token") || "";
  const decode = JSON.parse(user).value as any;
  console.log(decode);
  const { state } = useLocation();
  const location = useLocation();
  const stateData = location.state || {};
  console.log(stateData);

  const data1 = stateData.data1;
  console.log(state);
  const getAARedirectLink = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${decode}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(
        // `${process.env.REACT_APP_DASHBOARD_URL_STAGING}/account-aggregator/generate`,
        // `${process.env.REACT_APP_DASHBOARD_URL_STAGING}/account-aggregator/finbox`,
        `${process.env.REACT_APP_DASHBOARD_URL}/account-aggregator/finbox`,
        {
          method: "POST",
          headers: headers,
          redirect: "follow",
          body: JSON.stringify({
            bank: (state as any)?.bank?.Name,
            redirectUrl: `http://localhost:3000/view-offer`,
          }),
        }
      );

      const result = await response.json();

      setRedirectLink(result.data.url);
      window.open(result.data.url, "_self", "noopener,noreferrer");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.Header}>
          <button
            style={{ border: "none", background: "none" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              style={{ marginLeft: "0.5rem", height: "1.5rem" }}
              src={BackArrow}
              alt=""
            />
          </button>
          <p style={{ marginRight: "0.5rem", fontWeight: "bold" }}>T&C</p>
        </div>
        <div className={styles.box}>
            <h1 style={{padding:'1rem'}}>Account Aggregator</h1>
            <div style={{padding:'1rem'}}>
            <Button
              text={"Securely Share Bank Statement by OTP sent through bank"}
              onPress={() => {
                getAARedirectLink();
              }}
            />
            </div>
            <div style={{padding:'1rem'}}>
            <Button
              text={"Upload Bank Statement"}
              onPress={() => {
                navigate("/pdf-upload-bank", { state: { data1, stateData } });
              }}
            />
            </div>
          
          </div>
          
      </div>
      <BottomNavigationBar active="Home"/>

    </div>

  </div>
  );
}

export default AccountAggregator;
