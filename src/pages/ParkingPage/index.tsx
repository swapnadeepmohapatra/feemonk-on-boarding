// import React from "react";

// function ParkingPage() {
//   return (
//     <div>
//       ParkingPage
//       <p>Your application is under review. We will update soon</p>
//     </div>
//   );
// }

// export default ParkingPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import Confeti from "../../images/static_assests/confeti.svg";

function LoanOffer() {
  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <img
          src={Confeti}
          alt=""
          style={{
            position: "fixed",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "4rem",
            marginTop: "6rem",
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
              stroke-width="2.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <br />
          <h1
            style={{
              color: "#D32028",
            }}
          >
            Thank You!
          </h1>
          <br />
          <p
            style={{
              textAlign: "center",
              fontSize: "1.4rem",
            }}
          >
            Your application is under review. We will update soon
          </p>
          <br />
          <br />
          <br />
          <br />
          <div>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              If you have a problem, please contact us:
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
              }}
            >
              hello@feemonk.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanOffer;
