import React, { useState } from "react";
import styles from "./index.module.css";
import redProfile from "../../images/icons/redProfile.svg";
import EduLoanIcon from "../../images/icons/edu_loan.svg";
import LoanAdpng from "../../images/LoanAd.png";
import MyApplicationsImage from "../../images/static_assests/my_applications_icon.svg";
import MyLoansImage from "../../images/static_assests/my_loans_icon.svg";
import MyRepaymentsImage from "../../images/static_assests/my_repayments_icon.svg";
import MyEmiImage from "../../images/static_assests/my_repayments_icon.svg";

import redClose from "../../images/static_assests/redClose.svg";
import ArrowRight from "../../images/icons/RedArrow.svg";
import Button from "../../components/atoms/Button";
import HomeIconBlack from "../../images/icons/home_black.svg";
import GridIconBlack from "../../images/icons/grid_black.svg";
import UserIconBlack from "../../images/icons/user_black.svg";
import HomeIconWhite from "../../images/icons/home_white.svg";
import GridIconWhite from "../../images/icons/grid_white.svg";
import UserIconWhite from "../../images/icons/user_white.svg";
import LoginDialog from "./components/LoginDialog";
import BottomNavigationBar from "../../components/molecules/BottomNavBar";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";

const loanAd = {
  title: "Avail up to",
  amount: "₹ 10 lakhs of loan",
  action: {
    text: "Apply Now",
    url: "/loan-steps"
  },
  benefits: [
    { text: "No processing fee" },
    { text: "Paperless process" },
    { text: "Best EMI options" }
  ],
  finePrint: {
    text: "T&C"
  }
};

const loanSections = [
  { text: "My Applications", image: MyApplicationsImage },
  { text: "My Loans", image: MyLoansImage },
  { text: "My Repayments", image: MyRepaymentsImage },
  { text: "My Fee Payments", image: MyEmiImage }
];

function Home() {
  const [authToken] = useLocalStorage("auth_token", "");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  
  const [isProfileClicked, setIsProfileClicked] = useState(false);
const toggleProfile = () => {
  setIsProfileClicked(!isProfileClicked);
  };


  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {reload ? null : null}
        <div className={styles.homeHeader}>
          <img className={styles.logo} src="main_logo.png" alt="" />
          <img
          style={{ height: "2.5rem" ,width:"2.5rem"}}
          src={redProfile}
          onClick={() => {
            navigate("/profile");
          }}
        />
        </div>
        
        <div className={styles.loanAdContainer}>
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%",paddingTop:"1rem"}}>
            <div style={{padding:"1rem"}}>
              <p style={{fontStyle:"normal",fontSize:"24px"}}>{loanAd.title}</p>
              <p className={styles.amount}><strong>₹ 2 crores</strong> of loan</p>
              
            </div>
            <img src={LoanAdpng} alt="Loan Image" style={{ maxWidth:"180px",height:"120px" }} />
          </div>
          <div style={{display:"flex", alignItems:"center",justifyContent:"space-around",marginRight:"6rem"}}>
          
            <button style ={{backgroundColor:"#D32028", padding: "5px 26px",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 32,
        border: "none",
        marginRight:"-8rem" ,
        marginBottom:"1.85rem"
        }} onClick={() => {
          navigate("/loan-steps");
        }}
        >  Apply Now</button>
            <p className={styles.finePrint}> {loanAd.finePrint.text} <img src={ArrowRight} alt="Right Arrow" style={{ marginLeft: "1px",height:"10px" }} /></p>
          </div>
          

          <div className={styles.benefits}>
            {/* {loanAd.benefits.map((benefit, index) => (
              <div key={index} className={styles.benefit}>
                {benefit.text}
              </div>
            ))} */}
            <p style={{fontFamily: 'Outfit',}}> No processing fee  |</p>
            <p> Paperless process</p>
            <p>|  Best EMI options</p>
          </div>
        </div>
        <div className={styles.loanSectionContainer}>
          {loanSections.map((item, index) => (
            <div key={index} className={styles.loanSection}>
              <img src={item.image} alt="" />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}></div>
        <BottomNavigationBar active="Home" />
        {!authToken && (
          <LoginDialog reload={() => setReload(!reload)} />
        )}
      </div>
    </div>
  );
}

export default Home;
