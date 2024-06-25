import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import Confetti from "../../images/static_assests/confeti.svg";
import closebtn from "../../images/icons/close-btn.svg";
import { API_URL } from "../../utils";
import { jwtDecode } from "jwt-decode"; // Ensure you have the correct path to your config file
const queryStringToObject = (queryString: string) => {
  if (queryString.startsWith("?")) {
    queryString = queryString.slice(1);
  }

  const pairs = queryString.split("&");
  const result: { [key: string]: string } = {};

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return result;
};
function LoanOffer() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti after component mounts
    setShowConfetti(true);
  }, []);
  const user = sessionStorage.getItem("auth_token") || "";
  console.log(user);
  const decode = jwtDecode(JSON.parse(user).value) as any;
  const headerVal = JSON.parse(user).value;
  const handleButtonClick = async () => {
    navigate("/view-offer");
  };

  const loc = useLocation();

  useEffect(() => {
    const setAAStatus = async (status: any) => {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${user}`);

        const response = await fetch(
          `${API_URL}/account-aggregator/finbox/status`,
          {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({ ...status }),
          }
        );

        const result = await response.json();

        console.log(result);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (loc.search) {
      console.log(queryStringToObject(loc.search));
      setAAStatus(queryStringToObject(loc.search));
    }
  }, [loc, user]);

  return (
    <div className={styles.body}>
      <div className={styles.container} style={{ marginBottom: "10rem" }}>
        <img
          src={Confetti}
          alt=""
          className={`${styles.confetti} ${
            showConfetti ? styles.showConfetti : ""
          }`}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "14rem",
            marginTop: "6rem",
            padding: "2rem",
          }}
        >
          <svg
            width="57"
            height="57"
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.601074"
              y="0.117188"
              width="56"
              height="56"
              rx="28"
              fill="#D1FADF"
            />
            <path
              d="M40.2677 27.0434V28.1167C40.2662 30.6325 39.4516 33.0805 37.9452 35.0955C36.4389 37.1105 34.3215 38.5846 31.9089 39.2979C29.4963 40.0112 26.9178 39.9256 24.5579 39.0537C22.198 38.1819 20.1831 36.5705 18.8138 34.46C17.4445 32.3494 16.7941 29.8528 16.9596 27.3424C17.1251 24.832 18.0977 22.4424 19.7323 20.53C21.3669 18.6175 23.5759 17.2846 26.0299 16.7302C28.4839 16.1758 31.0513 16.4294 33.3493 17.4534M40.2677 18.7834L28.601 30.4617L25.101 26.9617"
              stroke="#039855"
              strokeWidth="2.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 style={{ color: "#D32028" }}>Congratulations!</h1>
          <br />
          <br />
          <p
            style={{
              textAlign: "center",
              fontSize: "1.4rem",
              paddingTop: "1rem",
            }}
          >
            Your application is under review. We will update soon
          </p>
          <br />
          <br />
          <div>
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              If you have a problem, please contact us:
            </p>
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              hello@feemonk.com
            </p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button
            text={"Get sanction & offer letter"}
            onPress={handleButtonClick}
            imageRight={ArrowRight}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default LoanOffer;
