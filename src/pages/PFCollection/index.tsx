import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
// import Navbar from "../../components/molecules/Navbar";
// import Footer from "../../components/molecules/Footer";
import Button from "../../components/atoms/Button";
import { useNavigate, useLocation } from "react-router-dom";
// import { process.env.REACT_APP_DASHBOARD_URL } from "../../utils/keys";
import BackArrow from "../../images/icons/arrow-left-circle.svg"

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
        `${process.env.REACT_APP_DASHBOARD_URL}/admin/application/sanction-details?applicationId=${
          location?.state?.data?.applicationId || "FM24000923"
        }`
      );
      const result = await response.json();
      console.log(result);
      setProduct(result.data);

      const response1 = await fetch(`${process.env.REACT_APP_DASHBOARD_URL}/login/auth`, {
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
        `${process.env.REACT_APP_DASHBOARD_URL}/products/id?productId=${result.data.productId}`,
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
    fetch(`${process.env.REACT_APP_DASHBOARD_URL}/login/auth`, {
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
          fetch(`${process.env.REACT_APP_DASHBOARD_URL}/pre-disbursement-collection/create-link-for-user`, {
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
    <div>
      <div className={styles.body}>

<div className={styles.container}>
  <div className={styles.main}>
    <div className={styles.Header}>
      <button
        style={{ border: "none", background: "none" }}
        // onClick={() => {
        //   navigate("/loan-steps");
        // }}
      >
        <img
          style={{ marginLeft: "0.5rem", height: "1.5rem" }}
          src={BackArrow}
          alt=""
        />
      </button>
      <p style={{ marginRight: "0.5rem", fontWeight: "bold" }}>Help</p>
    </div>
    
  <p style={{textAlign:'center',padding:'2.5rem',fontWeight:'bold',fontSize:'15px'}}>
  As one final step, please pay the Advance EMI and Processing Fee</p>
  <p style={{textAlign:'center',padding:'1.5rem',fontWeight:'bold',fontSize:'15px'}}>
  You need to pay <span style={{color:'#D32028'}}>Rs.{" "} {Math.ceil(
                Number(product?.productDetails?.processingfeeValue) *
                  Number(product?.loanAmount) +
                  0.18 *
                    Number(product?.loanAmount) *
                    Number(product?.productDetails?.processingfeeValue) +
                  Number(product?.productDetails?.advanceEmis) *
                    Number(product?.emi)
              )}{" "}</span> as Processing Fee / Advance EMI.</p>

            <div style={{ display: "flex",justifyContent:'center' }}>
            <div>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>Processing Fee</p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>GST On PF(18%)</p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>No. of Advance EMIs</p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>Advance EMI Amount</p>
            </div>
            <div style={{ marginLeft: "1.5em" }}>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>:</p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>:</p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>:</p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>:</p>
            </div>
            <div style={{ marginLeft: "1.5em" }}>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>
                Rs.{" "}
                {Number(product?.productDetails?.processingfeeValue) *
                  Number(product?.loanAmount)}
              </p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>
                Rs.{" "}
                {Math.ceil(
                  0.18 *
                    Number(product?.loanAmount) *
                    Number(product?.productDetails?.processingfeeValue)
                )}
              </p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>{Number(product?.productDetails?.advanceEmis)}</p>
              <p style={{textAlign:'center',padding:'0.5rem',fontWeight:'bold',fontSize:'15px'}}>
                Rs.{" "}
                {Number(product?.productDetails?.advanceEmis) *
                  Number(product?.emi)}
              </p>
            </div>
          </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', 
            }}>
                <button style={{
                    textAlign: 'center',
                    padding: '0.5rem',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    backgroundColor: "#D32028",
                    color: 'white',
                    width: '100px',border:"none",borderRadius:'12px',marginTop:'5rem'
                }} onClick={()=>paymentLink()}>
                    Pay Now
                </button>
            </div>

          {/* <Button
            // insureFin={location?.state?.data?.channelId === 5}
            text={"Pay Now"}
            onPress={() => paymentLink()}
          /> */}
  </div>
</div>
</div>
 
    </div>
  );
}

export default PFCollection;
