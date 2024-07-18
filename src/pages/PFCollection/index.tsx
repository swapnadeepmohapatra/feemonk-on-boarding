import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
// import Navbar from "../../components/molecules/Navbar";
// import Footer from "../../components/molecules/Footer";
import Button from "../../components/atoms/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../utils/keys";

function PFCollection() {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState<{
    id?: number;
    applicationId?: string;
    fundCode?: string;
    productId?: string;
    loanAmount?: number;
    emi?: number;
    emiFirstDate?: string;
    dayOfEmi?: number;
    sanctionLetterUrl?: string;
    productDetails?: any;
  }>({});

  useEffect(() => {
    getProductsDetails();
  }, []);

  const getProductsDetails = async () => {
    try {
      const response = await fetch(
        `${API_URL}/admin/application/sanction-details?applicationId=${
          location?.state?.data?.applicationId || "FM24000923"
        }`
      );
      const result = await response.json();
      console.log(result);
      setProduct(result.data);

      const response1 = await fetch(`${API_URL}/login/auth`, {
        method: "POST",
        body: JSON.stringify({
          // memberId: location?.state?.data.userId,
          memberId: "26ae9a50-b0cd-4e7a-abc4-705edd5ae399",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result1 = await response1.json();
      const authToken = result1.data;

      const response2 = await fetch(
        `${API_URL}/products/id?productId=${result.data.productId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const result2 = await response2.json();
      console.log(result2);

      setProduct((prev) => ({
        ...prev,
        productDetails: result2.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const paymentLink = () => {
    fetch(`${API_URL}/login/auth`, {
      method: "POST",
      body: JSON.stringify({
        // memberId: location?.state?.data.userId,
        memberId: "26ae9a50-b0cd-4e7a-abc4-705edd5ae399",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        if (data.message === "Successful") {
          fetch(`${API_URL}/pre-disbursement-collection/create-link-for-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.data}`,
            },
            body: JSON.stringify({
              userId:
                location?.state?.data?.userId ||
                "a34c5d28-f8bf-432a-9d65-fe941e68c433",
              applicationId:
                location?.state?.data?.applicationId || "FM24000923",
              advEmi:
                Number(product?.productDetails?.advanceEmis) *
                Number(product?.emi),
              processingFee:
                Number(product?.productDetails?.processingfeeValue) *
                  Number(product?.loanAmount) +
                0.18 *
                  Number(product?.loanAmount) *
                  Number(product?.productDetails?.processingfeeValue),
              totalAmount: Number(product?.loanAmount),
              instituteName: product?.productDetails?.instituteId,
              status: 0,
              utr: "string",
              mode: 0,
              paidDate: {},
              remarks: "string",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              window.open(data.data, "_blank", "noopener,noreferrer");
            });
        }
      });
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.backdrop}>
        {/* <Navbar /> */}
        <div className={styles.container}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <p
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            You need to pay Rs.{" "}
            <strong
              style={{
                fontFamily: "Outfit",
              }}
            >
              {Math.ceil(
                Number(product?.productDetails?.processingfeeValue) *
                  Number(product?.loanAmount) +
                  0.18 *
                    Number(product?.loanAmount) *
                    Number(product?.productDetails?.processingfeeValue) +
                  Number(product?.productDetails?.advanceEmis) *
                    Number(product?.emi)
              )}{" "}
            </strong>
            to {location?.state?.name} as Processing Fee / Advance EMI.
          </p>
          <Button
            // insureFin={location?.state?.data?.channelId === 5}
            text={"Pay Now"}
            onPress={() => paymentLink()}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default PFCollection;
