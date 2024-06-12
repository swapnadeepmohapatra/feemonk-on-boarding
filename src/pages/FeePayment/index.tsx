import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import visa from "../../images/static_assests/visa.svg";
import add from "../../images/static_assests/add.svg";
import gpay from "../../images/static_assests/gpay.svg";
import phpay from "../../images/static_assests/phpay.svg";
import paytm from "../../images/static_assests/paytm.svg";

import slidearrow from "../../images/static_assests/slidearrow.svg";

import ArrowRight from "../../images/icons/arrow_right.svg";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import Home from "../Home";

function FeePayment() {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(""); // Explicitly define type as string
  const handlePaymentMethodChange = (method: string) => { // Define type for method parameter
    setSelectedPaymentMethod(method);
  };

  const [isPaying, setIsPaying] = useState(false); // State to track payment process
  const [startX, setStartX] = useState(0); // Initial X position of the drag
  const [offsetX, setOffsetX] = useState(0); // Offset of the drag

  // Function to handle mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Mouse up event triggered");
    console.log("OffsetX:", e);
    setIsPaying(true);
    setStartX(e.pageX - offsetX);
  };

  // Function to handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isPaying) {
   console.log("move")

      const newOffsetX = e.pageX - startX;
      setOffsetX(newOffsetX);
    }
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
   console.log("up")
    setIsPaying(false);
    if (offsetX >= 150) {
      window.location.href = "/home"; // Redirect to home
    } else {
      setOffsetX(0);
    }
  };


  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div  style={{ display: "flex", alignItems: "center",marginTop:"1.5rem", }}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => {
                navigate("/loan-steps");
              }}
            >
              <img
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem", height: "1.75rem" }}
                src={BackArrow}
                alt=""
              /> 
            </button>
            <span style={{fontSize:"1.8rem"}}>Fee Payment</span>
          </div>
          <br />
          <br />
          <br />
          <h3 className={styles.heading}>Credit and Debit cards</h3>
          <div style={{ paddingTop: "1rem" }}>
          {/* <div style={{ padding: "1rem" }}> */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            border: "1px solid #F9D8D6",
            background: "#FFFCFA",
            padding: "2.5rem 1rem",
            boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
            borderRadius: "12px 12px 12px 12px",
            justifyContent: "space-around"
          }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between",paddingBottom:"1rem",borderBottom:"0.5px solid rgba(196, 196, 196, 0.56)" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={visa} style={{ width: "2rem" }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1rem" }}>
                    <p style={{ fontSize: "0.875rem", margin: 0 }}>HDFC Bank</p>
                    <p style={{ color: "#737373", fontSize: "0.575rem", fontWeight: "bold", margin: 0 }}>********2193</p>
                  </div>
                </div>
                {/* Radio button implementation */}
                <label className={styles.radioContainer}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="visa"
                    checked={selectedPaymentMethod === "visa"}
                    onChange={() => handlePaymentMethodChange("visa")}
                  />
                  <span className={styles.radioMark}></span>
                </label>
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between",paddingBottom:"1rem",borderBottom:"0.5px solid rgba(196, 196, 196, 0.56)" }}>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <img src={visa} style={{ width: "2rem" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1rem" }}>
      <p style={{ fontSize: "0.875rem", margin: 0 }}>HDFC Bank</p>
      <p style={{ color: "#737373", fontSize: "0.575rem", fontWeight: "bold", margin: 0 }}>********2193</p>
    </div>
  </div>
  {/* Radio button implementation */}
  <label className={styles.radioContainer}>
    <input
      type="radio"
      name="paymentMethod"
      value="visa"
      checked={selectedPaymentMethod === "visa"}
      onChange={() => handlePaymentMethodChange("visa")}
    />
    <span className={styles.radioMark}></span>
  </label>
</div>
<div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <img src={add} style={{ width: "1rem",marginLeft:"0.5rem" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1rem" }}>
      <p style={{ fontSize: "0.875rem", margin: 0,color: "#11A744" }}>Add new card</p>
      <p style={{ color: "#737373", fontSize: "0.575rem", fontWeight: "bold", margin: 0 }}>Save and pay via cards
</p>
    </div>
  </div>
  {/* Radio button implementation */}
  <label className={styles.radioContainer}>
    <input
      type="radio"
      name="paymentMethod"
      value="visa"
      checked={selectedPaymentMethod === "visa"}
      onChange={() => handlePaymentMethodChange("visa")}
    />
    <span className={styles.radioMark}></span>
  </label>
</div>
          </div>
          </div>
          <br />
          <br />
          <h3 className={styles.heading}>UPI</h3>
          <div style={{ paddingTop: "1rem" }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            border: "1px solid #F9D8D6",
            background: "#FFFCFA",
            padding: "2.5rem 1rem",
            boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
            borderRadius: "12px 12px 12px 12px",
            justifyContent: "space-around"
          }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" ,paddingBottom:"1rem",borderBottom:"0.5px solid rgba(196, 196, 196, 0.56)"}}>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <img src={gpay} style={{ width: "1.2rem" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1rem" }}>
      <p style={{ fontSize: "0.875rem", margin: 0 }}>Google Pay</p>
      {/* <p style={{ color: "#737373", fontSize: "0.575rem", fontWeight: "bold", margin: 0 }}>********2193</p> */}
    </div>
  </div>
  {/* Radio button implementation */}
  <label className={styles.radioContainer}>
    <input
      type="radio"
      name="paymentMethod"
      value="visa"
      checked={selectedPaymentMethod === "visa"}
      onChange={() => handlePaymentMethodChange("visa")}
    />
    <span className={styles.radioMark}></span>
  </label>
</div>
<div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" ,paddingBottom:"1rem",borderBottom:"0.5px solid rgba(196, 196, 196, 0.56)"}}>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <img src={phpay} style={{ width: "1.2rem" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1rem" }}>
      <p style={{ fontSize: "0.875rem", margin: 0 }}>Phone Pe</p>
      {/* <p style={{ color: "#737373", fontSize: "0.575rem", fontWeight: "bold", margin: 0 }}>********2193</p> */}
    </div>
  </div>
  {/* Radio button implementation */}
  <label className={styles.radioContainer}>
    <input
      type="radio"
      name="paymentMethod"
      value="visa"
      checked={selectedPaymentMethod === "visa"}
      onChange={() => handlePaymentMethodChange("visa")}
    />
    <span className={styles.radioMark}></span>
  </label>
</div>
<div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <img src={paytm} style={{ width: "1.2rem" }} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1rem" }}>
      <p style={{ fontSize: "0.875rem", margin: 0 }}>Paytm</p>
      {/* <p style={{ color: "#737373", fontSize: "0.575rem", fontWeight: "bold", margin: 0 }}>********2193</p> */}
    </div>
  </div>
  {/* Radio button implementation */}
  <label className={styles.radioContainer}>
    <input
      type="radio"
      name="paymentMethod"
      value="visa"
      checked={selectedPaymentMethod === "visa"}
      onChange={() => handlePaymentMethodChange("visa")}
    />
    <span className={styles.radioMark}></span>
  </label>
</div>


          </div>
         

            
          </div>
          
        </div>
        <div className={styles.backdrop} style={{ display: "flex", justifyContent: "center", }}>
          <div className={styles.loginContainer}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            // border: "1px solid #F9D8D6",
            // background: "#393939",
            padding: "0.75rem 0.85rem",
            borderRadius: "15px 15px 15px 15px",
            justifyContent: "center"
          }}>
            <p ><span style={{color:"#d23028",fontSize:"0.875rem",marginRight:"0.3rem",fontWeight:"bold"}}>Fee Amount </span>   <span style={{fontWeight:"bold"}}>₹ 25,000</span></p>
            

            </div>
            
            <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
      }}
    >
      <button
  style={{
    backgroundColor: "#D32028",
    padding: "5px 26px",
    alignItems: "center",
    borderRadius: 32,
    border: "none",
    color: "#FFFFFF",
    width: "18rem",
    fontSize: "1.5rem",
    position: "relative",
    overflow: "hidden",
    zIndex: 1 // Add this line to ensure the slide button is above other elements
  }}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseUp}
>
  {offsetX < 150 ? (
    <span>
      Slide to pay
      <span style={{ position: "absolute", left: offsetX }}>
        <img src={slidearrow} style={{ width: "1.2rem" }} alt="slide arrow" />
      </span>
    </span>
  ) : (
    <span style={{ display: "none" }}>Slide to pay</span>
  )}
</button>

    </div>



            
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeePayment;
