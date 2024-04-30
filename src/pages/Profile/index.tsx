import React, { useState } from "react";
import styles from "./index.module.css";
import redProfile from "../../images/icons/redProfile.svg";
import EduLoanIcon from "../../images/icons/edu_loan.svg";
import LoanAdpng from "../../images/LoanAd.png";
import MyApplicationsImage from "../../images/static_assests/my_applications_icon.svg";
import MyLoansImage from "../../images/static_assests/my_loans_icon.svg";
import MyRepaymentsImage from "../../images/static_assests/my_repayments_icon.svg";
import MyEmiImage from "../../images/static_assests/my_repayments_icon.svg";

import angleRight from "../../images/static_assests/angle-right.svg";

import camera from "../../images/static_assests/camera.svg";

import redClose from "../../images/static_assests/redClose.svg";
import ArrowRight from "../../images/icons/RedArrow.svg";
import Button from "../../components/atoms/Button";
import star from "../../images/icons/star.svg";
import refer from "../../images/icons/refer.svg";
import notification from "../../images/icons/notification.svg";
import infoGrey from "../../images/icons/infoGrey.svg";
import Lang from "../../images/icons/Lang.svg";
import terms from "../../images/icons/terms.svg";

import privacy from "../../images/icons/privacy.svg";

import support  from "../../images/icons/support.svg";

import Logout from "../../images/icons/Logout.svg"
// import LoginDialog from "./components/LoginDialog";
import BottomNavigationBar from "../../components/molecules/BottomNavBar";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Rate } from "rsuite";

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

function Profile() {
  const [authToken] = useLocalStorage("auth_token", "");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  
  const [isProfileClicked, setIsProfileClicked] = useState(false);
const toggleProfile = () => {
  setIsProfileClicked(!isProfileClicked);
  };
  
    const [isOn, setIsOn] = useState(false);
  
    const handleClick = () => {
      setIsOn(!isOn);
    };


  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {reload ? null : null}
        <div className={styles.homeHeader}>
          <img className={styles.logo} src="main_logo.png" alt="" />
          <img
          style={{ height: "2.5rem" ,width:"2.5rem"}}
          src={ redClose}
          alt={"Close"}
          onClick={() => {
            navigate("/home");
          }}
          
        />
        </div>
        <div style={{ padding:"1rem 2rem"}}>
        <div style={{display:"flex",gap:"1rem", paddingBottom:"1rem", borderBottom:"0.4px solid rgba(140, 140, 140, 100)"}}>
        <img
          style={{ height: "2.5rem" ,width:"2.5rem",}}
          src={ camera}
          alt={"camera"}
          onClick={() => {
            navigate("/home");
          }}
          
        />  
          <p style={{display:"flex",flexDirection:"column"}}>
          <span>Hello!</span> <span style={{fontSize:"0.875rem",color:"#d32028",textDecoration:"underline"}}>Log in</span>
          </p>
          </div>  
        <br/>
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}}>
        <img style = {{width :"1.2rem"}} src={star}/>
        <p> Rate Us</p>    
        </div>
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}}>
        <img style = {{width :"1.2rem"}} src={refer}/>
        <p> Refer</p>    
        </div>
        <br/>
        <div style={{ display: "flex", gap: "0.75rem" }}>
      <img style={{ width: "1.2rem" }} src={notification} alt="camera" />
      <p>Notification</p>
      <div
        style={{
          width: "36px",
          height: "22px",
          background: isOn ? "#D32028" : "transparent",
          borderRadius: "25px",
          position: "relative",
          cursor: "pointer",
          border: "1px solid #D32028",
          marginLeft:"auto"

        }}
        onClick={handleClick}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: isOn ? "#FFFFFF" : "#D32028",
            borderRadius: "50%",
            position: "absolute",
            top: "-0.5px",
            left: isOn ? "13px" : "0",
            transition: "left 0.3s ease-in-out"
          }}
        />
      </div>
    </div>
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}}>
        <img style = {{width :"1.2rem"}} src={infoGrey}/>
        <p> FAQs</p> 
        <img style={{marginLeft:"auto"}} src= {angleRight}/>
        </div>
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}}>
        <img style = {{width :"1.2rem"}} src={Lang}/>
        <p> Language</p>    
        <p style={{fontSize:"0.875",marginLeft:"auto"}}> English</p>
        </div> 
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}}>
        <img style = {{width :"1.2rem"}} src={terms}/>
        <p> Terms and conditions</p>    
        <img style={{marginLeft:"auto"}} src= {angleRight}/>
        </div>  
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}}>
        <img style = {{width :"1.2rem"}} src={privacy}/>
        <p> Privacy Policy</p>    
        <img style={{marginLeft:"auto"}} src= {angleRight}/>
        </div>
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}} onClick={() => {
            navigate("/support");
          }}>
        <img style = {{width :"1.2rem"}} src={support}/>
        <p> Support</p>    
        <img style={{marginLeft:"auto"}} src= {angleRight}/>
        </div>
        <br/>
        <div style={{display:"flex" , gap:"0.75rem"}}>
        <img style = {{width :"1.2rem"}} src={Logout}/>
        <p style={{color:"#FD1313"}}> Logout</p>    
        </div>
        
        </div>
        
        
        
        
        {/* <div style={{ flex: 1 }}></div> */}
        {/* <BottomNavigationBar active="Home" /> */}
       
      </div>
    </div>
  );
}

export default Profile;
