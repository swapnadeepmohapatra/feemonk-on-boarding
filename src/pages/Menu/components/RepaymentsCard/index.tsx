import React from "react";
import styles from "./index.module.css";
import rightArrow from "../../../../images/icons/RedArrow.svg";
import cashBag from "../../../../images/static_assests/cashbag.svg";
import calendar from "../../../../images/static_assests/calendar.svg";
import emi from "../../../../images/static_assests/emi.svg";
import doc from "../../../../images/static_assests/doc.svg";
import wallet from "../../../../images/static_assests/wallet.svg";
import eye from "../../../../images/static_assests/eye.svg";
import redProfile from "../../../../images/icons/redProfile.svg";
import BottomNavigationBar from "../../../../components/molecules/BottomNavBar";
import { useNavigate } from "react-router-dom";

interface LoansCardProps {
  status: "Active" | "Inactive";
}

function RepaymentsCard() {
  const navigate = useNavigate();

  // const renderActiveCard = () => (
  //   <div className={styles.card}>
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <div className={styles.cardNumber}>
  //         <p className={styles.cardDate}>
  //           <span>
  //             <img style={{ marginRight: "0.3rem" }} src={cashBag} />
  //           </span>
  //           Outstanding Amount
  //         </p>
  //         <p className={styles.cardNumberText}>₹ 10,00,000</p>
  //       </div>
  //       <div className={styles.actionContainer}>
  //         <div className={styles.action}>
  //           <p style={{ color: "#d23028", fontSize: "0.875rem" }}>
  //             #EL202303010
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //     <div className={styles.cardDetails}>
  //       <div style={{ marginRight: "1.2rem" }}>
  //         <p className={styles.label}>
  //           <span>
  //             <img style={{ marginRight: "0.3rem" }} src={emi} />
  //           </span>
  //           EMI
  //         </p>
  //         <p className={styles.cardDate}>₹ 25,000</p>
  //       </div>
  //       <div style={{ marginRight: "2rem" }}>
  //         <p className={styles.label}>
  //           <span>
  //             <img style={{ marginRight: "0.3rem" }} src={calendar} />
  //           </span>
  //           Due Date
  //         </p>
  //         <p className={styles.cardDate}>20/03/2023</p>
  //       </div>
  //       <div style={{ marginTop: "0.5rem", marginRight: "0.3rem" }}>
  //         <button
  //           className={styles.offerButton}
  //           onClick={() => navigate("/loan-steps")}
  //         >
  //           <span>
  //             <img src={wallet} alt="Cash Bag" />
  //           </span>
  //           Pay now
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderInactiveCard = () => (
    <div className={styles.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={cashBag} />
            </span>
            Outstanding Amount
          </p>
          <p className={styles.cardNumberText}>₹ 10,00,000</p>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <p style={{ color: "#d23028", fontSize: "0.875rem" }}>
              #EL202303010
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div style={{ marginRight: "1.2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={emi} />
            </span>
            EMI
          </p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
        <div style={{ marginRight: "2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={calendar} />
            </span>
            Due Date
          </p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{ marginTop: "0.5rem", marginRight: "0.3rem" }}>
          <button
            className={styles.offerButton}
            onClick={() => navigate("/loan-steps")}
          >
            <span>
              <img src={eye} alt="Cash Bag" />
            </span>
            View
          </button>
        </div>
      </div>
    </div>
  );

  // return status === "Active" ? renderActiveCard() : renderInactiveCard();
  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <div className={styles.main}>
      <div className={styles.homeHeader}>
            <img className={styles.logo} src="main_logo.png" alt="" />
            <img className={styles.icon} src={redProfile} alt="" />
          </div>
      <br/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><h3 className={styles.heading}>Emi History</h3> 
      <p style={{fontSize:"1rem",fontWeight:'bold',marginRight:'0.5rem'}}>0 / 12 {" "} Completed</p></div>
    
    <div className={styles.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={cashBag} />
            </span>
            Outstanding Amount
          </p>
          <p className={styles.cardNumberText}>₹ 10,00,000</p>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <p style={{ color: "#d23028", fontSize: "0.875rem" }}>
              #EL202303010
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div style={{ marginRight: "1.2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={emi} />
            </span>
            EMI
          </p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
        <div style={{ marginRight: "2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={calendar} />
            </span>
            Due Date
          </p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{ marginTop: "0.5rem", marginRight: "0.3rem" }}>
          <button
            style={{backgroundColor:'rgba(223, 248, 228, 1)',padding:'0.2rem 0.7rem',border:'none',borderRadius:'10px',color:'green'}}
            onClick={() => navigate("/loan-steps")}
          >
           
           Paid
          </button>
        </div>
      </div>
    </div>
    <div className={styles.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={cashBag} />
            </span>
            Outstanding Amount
          </p>
          <p className={styles.cardNumberText}>₹ 10,00,000</p>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <p style={{ color: "#d23028", fontSize: "0.875rem" }}>
              #EL202303010
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div style={{ marginRight: "1.2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={emi} />
            </span>
            EMI
          </p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
        <div style={{ marginRight: "2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={calendar} />
            </span>
            Due Date
          </p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{ marginTop: "0.5rem", marginRight: "0.3rem" }}>
          <button
            className={styles.offerButton}
            onClick={() => navigate("/loan-steps")}
          >
            <span>
              <img src={wallet} alt="Cash Bag" />
            </span>
            Pay now
          </button>
        </div>
      </div>
    </div>
    <div className={styles.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={cashBag} />
            </span>
            Outstanding Amount
          </p>
          <p className={styles.cardNumberText}>₹ 10,00,000</p>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <p style={{ color: "#d23028", fontSize: "0.875rem" }}>
              #EL202303010
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div style={{ marginRight: "1.2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={emi} />
            </span>
            EMI
          </p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
        <div style={{ marginRight: "2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={calendar} />
            </span>
            Due Date
          </p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{ marginTop: "0.5rem", marginRight: "0.3rem" }}>
          <button
            className={styles.offerButton}
            onClick={() => navigate("/loan-steps")}
          >
            <span>
              <img src={wallet} alt="Cash Bag" />
            </span>
            Pay now
          </button>
        </div>
      </div>
    </div>
    <div className={styles.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.cardNumber}>
          <p className={styles.cardDate}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={cashBag} />
            </span>
            Outstanding Amount
          </p>
          <p className={styles.cardNumberText}>₹ 10,00,000</p>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <p style={{ color: "#d23028", fontSize: "0.875rem" }}>
              #EL202303010
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cardDetails}>
        <div style={{ marginRight: "1.2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={emi} />
            </span>
            EMI
          </p>
          <p className={styles.cardDate}>₹ 25,000</p>
        </div>
        <div style={{ marginRight: "2rem" }}>
          <p className={styles.label}>
            <span>
              <img style={{ marginRight: "0.3rem" }} src={calendar} />
            </span>
            Due Date
          </p>
          <p className={styles.cardDate}>20/03/2023</p>
        </div>
        <div style={{ marginTop: "0.5rem", marginRight: "0.3rem" }}>
          <button
            className={styles.offerButton}
            onClick={() => navigate("/loan-steps")}
          >
            <span>
              <img src={wallet} alt="Cash Bag" />
            </span>
            Pay now
          </button>
        </div>
      </div>
    </div>
      </div>
      {/* <BottomNavigationBar active="Menu" /> */}
    </div>
   
    </div>
  )

}

export default RepaymentsCard;
