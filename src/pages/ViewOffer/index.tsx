import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import Label from "../../components/atoms/Label";
import InputText from "../../components/atoms/InputText";
import BackArrow from "../../images/icons/close-btn.svg";
import bigcalendar from "../../images/static_assests/bigcalendar.svg";
import bigemi from "../../images/static_assests/bigemi.svg";

import download from "../../images/icons/download.svg";
import biginterest from "../../images/static_assests/biginterest.svg";
import { API_URL } from "../../utils";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { formatToIndianRupees } from "../../utils/formatToIndianRpuees";
import { getNextFifthDate } from "../../utils/getNextFifthDate";

// Define the structure of summary data
interface SummaryData {
  mobile: string;
  userId: string;
  applicationId: string;
}

function ViewOffer() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [products, setProducts] = useState([
    {
      tenure: 0,
    },
  ]);
  const [activeEmiPlan, setActiveEmiPlan] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const user = sessionStorage.getItem("auth_token") || "";
  const decode = JSON.parse(user).value as any;
  console.log(decode);

  useEffect(() => {
    // Fetch summary data when the component mounts
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get(`${API_URL}/summary`, {
          headers: {
            Authorization: `Bearer ${decode}`,
          },
        });
        const { mobile, userId, applicationId } = response.data.data;
        setSummaryData({ mobile, userId, applicationId });
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, [decode]);

  const approve = async (data: any) => {
    return fetch(`${API_URL}/application/approve`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${decode}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        return console.error(error);
      });
  };

  const handleButtonClick = async () => {
    const url = `${API_URL}/integrations-login/generate-token`;

    // Ensure summaryData is available before making the request
    if (!summaryData) {
      console.error("Summary data is not available.");
      return;
    }

    const requestData = {
      mobile: summaryData.mobile,
      userId: summaryData.userId,
      applicationId: summaryData.applicationId,
    };

    try {
      // const response = await axios.post(url, requestData, {
      //   headers: {
      //     Authorization: `Bearer ${user}`,
      //   },
      // });
      // console.log("token", response?.data?.data);
      // sessionStorage.setItem("authToken", response?.data?.data);
      console.log(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzdmMTQ3ZC01NjE1LTQ4ODAtYWZhNi0yZWEzMzgzNTRkYmMiLCJhcHBsaWNhdGlvbklkIjoiRk0yNDAwMDUzMyIsIm1vYmlsZSI6IjgxMDYwODcwOTkiLCJ2YWxpZEJhbmtEZXRhaWxzIjozLCJlbmFjaFN0YXR1cyI6MSwiYWdyZWVtZW50U3RhdHVzIjoxLCJkaWdpbG9ja2VyU3RhdHVzIjozLCJreWNEb25lIjpmYWxzZSwic2VsZmllRGV0YWlscyI6MywiaXNDb3BwbGljYW50IjpmYWxzZSwiaWF0IjoxNzE4NzgwMzQ0LCJleHAiOjE3MTkzODUxNDR9.heC_f8QXmU6uEC5nAyCourmCvIuAAy5nFnhPMsJBpKs"
      );
      sessionStorage.setItem(
        "authToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzdmMTQ3ZC01NjE1LTQ4ODAtYWZhNi0yZWEzMzgzNTRkYmMiLCJhcHBsaWNhdGlvbklkIjoiRk0yNDAwMDUzMyIsIm1vYmlsZSI6IjgxMDYwODcwOTkiLCJ2YWxpZEJhbmtEZXRhaWxzIjozLCJlbmFjaFN0YXR1cyI6MSwiYWdyZWVtZW50U3RhdHVzIjoxLCJkaWdpbG9ja2VyU3RhdHVzIjozLCJreWNEb25lIjpmYWxzZSwic2VsZmllRGV0YWlscyI6MywiaXNDb3BwbGljYW50IjpmYWxzZSwiaWF0IjoxNzE4NzgwMzQ0LCJleHAiOjE3MTkzODUxNDR9.heC_f8QXmU6uEC5nAyCourmCvIuAAy5nFnhPMsJBpKs"
      );
      navigate("/PFcollection", { state: { data: summaryData } });
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/products/instituteId?instituteId=B2C`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Header}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => {
                navigate("/loan-steps");
              }}
            >
              <img
                style={{ marginLeft: "0.5rem", height: "1.5rem" }}
                src={BackArrow}
                alt=""
              />
            </button>
            <p style={{ marginRight: "0.5rem", fontWeight: "bold" }}>Help</p>
          </div>
          <br />
          <br />
          <div
            style={{
              padding: "1rem",
              background: "#FFF7F2",
              border: "1px solid #F9D8D6",
              borderRadius: "12px 12px 0px 0px",
            }}
          >
            <p
              style={{
                fontSize: "2rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              ₹ 10,00,000
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid #F9D8D6",
              background: "#FFFCFA",
              padding: "1rem",
              boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
              borderRadius: "0px 0px 12px 12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <img
                  src={bigemi}
                  style={{ width: "4rem", marginBottom: "1.5rem" }}
                />
                <p style={{ color: "#737373", fontSize: "0.875rem" }}>EMI</p>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  {activeEmiPlan
                    ? `₹ ${formatToIndianRupees(
                        Number(
                          Number(
                            600000 /
                              Number(
                                products
                                  .sort((a, b) => a.tenure - b.tenure)
                                  .find(
                                    (product: any) =>
                                      product.productId === activeEmiPlan
                                  ) &&
                                  products
                                    .sort((a, b) => a.tenure - b.tenure)
                                    .find(
                                      (product: any) =>
                                        product.productId === activeEmiPlan
                                    )?.tenure
                              )
                          ).toFixed(2)
                        )
                      )}`
                    : "₹ 0"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <img
                  src={bigcalendar}
                  style={{ width: "4rem", marginBottom: "1.5rem" }}
                />
                <p style={{ color: "#737373", fontSize: "0.875rem" }}>TENURE</p>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  {activeEmiPlan
                    ? products
                        .sort((a, b) => a.tenure - b.tenure)
                        .find(
                          (product: any) => product.productId === activeEmiPlan
                        )?.tenure
                    : "0"}{" "}
                  Months
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <img
                  src={biginterest}
                  style={{ width: "4rem", marginBottom: "1.5rem" }}
                />
                <p style={{ color: "#737373", fontSize: "0.875rem" }}>
                  Starts On
                </p>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    color: "#d23028",
                    cursor: "pointer",
                  }}
                  // onClick={() =>
                  //   document.getElementById("emiDateInput")?.focus()
                  // }
                >
                  {getNextFifthDate()}
                  {/* {selectedDate ? formatDate(selectedDate) : "Select Date"} */}
                </p>
              </div>
            </div>
          </div>
          <br />
          <br />
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={bigemi}
                style={{ width: "4rem", marginBottom: "1.5rem" }}
              />
                <p style={{ color: "#737373",
                Processing Fee
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={bigcalendar}
                style={{ width: "4rem", marginBottom: "1.5rem" }}
              />
              <p style={{ color: "#737373", fontSize: "0.875rem" }}>
                Foreclosure Charges
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={biginterest}
                style={{ width: "4rem", marginBottom: "1.5rem" }}
              />
              <p style={{ color: "#737373", fontSize: "0.875rem" }}>
                Pay Back Anytime
              </p>
            </div>
          </div>
          <br />
          <Label text="EMI date" />
          <br />
          <InputText
            id="emiDateInput"
            placeholder="DD-MM-YYYY"
            type="date"
            value={selectedDate}
            changeHandler={handleDateChange}
          /> */}
          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                textAlign: "left",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Choose EMI plan
            </p>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              {products
                .sort((a, b) => a.tenure - b.tenure)
                .map((product: any) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2.4rem 1rem",
                      border:
                        activeEmiPlan === product.productId
                          ? "1px solid #D32028"
                          : "1px solid #F9D8D6",
                      borderRadius: "12px",
                      marginBottom: "1rem",
                      flex: 1,
                      background: "#FFF8F4",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                    key={product.productId}
                    onClick={() => {
                      setActiveEmiPlan(product.productId);
                    }}
                  >
                    <p
                      style={{
                        textAlign: "left",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {formatToIndianRupees(
                        Number(
                          Number(600000 / Number(product.tenure)).toFixed(2)
                        )
                      )}
                    </p>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "1rem",
                        // fontWeight: "bold",
                      }}
                    >
                      {product.tenure} Months
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p
              style={{
                textAlign: "left",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Sanction Letter
            </p>
            <img
              src={download}
              style={{ width: "2rem", marginBottom: "1.5rem" }}
            />
          </div>
          <p></p>
          <Button
            text={"Avail Loan Now"}
            onPress={handleButtonClick}
            imageRight={ArrowRight}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default ViewOffer;
