import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loading from "../Loading";
interface LoansCardProps {
  status: "Active" | "Inactive";
}

function RepaymentsCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const loanId = location.state.data
  const user = sessionStorage.getItem("auth_token") || "";
  const headerVal = JSON.parse(user).value
  const decode = jwtDecode(JSON.parse(user).value) as any;
  const [loading, setLoading] = useState(false);
  const [emis, setEmis] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0); 
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
  useEffect(() => {
    setLoading(true);
    const url = `${process.env.REACT_APP_DASHBOARD_URL}/loan-repayment/emis-table?loanId=${loanId}`
    axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${headerVal}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setLoading(false);
      const data = response?.data?.data?.data || [];
      const status2Count = data.filter((item: { status: number; }) => item.status === 2).length;
      const status4Count = data.filter((item: { status: number; }) => item.status === 4).length;

      const total = status2Count + status4Count;
      setTotalCount(total);
      setEmis(data);
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
    });
    

 
  }, []);
  function formatNumberWithCommas(number: { toLocaleString: (arg0: string) => any; }) {
    return number?.toLocaleString('en-IN'); 
  }
  // return status === "Active" ? renderActiveCard() : renderInactiveCard();
  return (
    <div className={styles.body}>
    <div className={styles.container}>
      <div className={styles.main}>
      <div className={styles.homeHeader}>
            <img className={styles.logo} src="main_logo.png" alt="" onClick={() => {
              navigate("/home");
            }}/>
            <img className={styles.icon} src={redProfile} alt="" onClick={() => {
              navigate("/profile");
            }}/>
          </div>
      <br/>
      
      {loading ? (
        <Loading/>
      ):(
        <>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><h3 className={styles.heading}>Emi History</h3> 
        <p style={{fontSize:"1rem",fontWeight:'bold',marginRight:'0.5rem'}}>{totalCount} / {emis?.length} {" "} Completed</p></div>
          {emis?.map((item)=>(
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
      <p className={styles.cardNumberText}>₹ {formatNumberWithCommas(item?.outstanding ? item?.outstanding:0)}</p>
    </div>
    <div className={styles.actionContainer}>
      <div className={styles.action}>
        <p style={{ color: "#d23028", fontSize: "0.875rem" }}>
          {item?.loanId ? item?.loanId:null}
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
      <p className={styles.cardDate}>₹ {formatNumberWithCommas(item?.emiAmount ? item?.emiAmount:0)}</p>
    </div>
    <div style={{ marginRight: "2rem" }}>
      <p className={styles.label}>
        <span>
          <img style={{ marginRight: "0.3rem" }} src={calendar} />
        </span>
        Due Date
      </p>
      <p className={styles.cardDate}>{item?.emiDueDate}</p>
    </div>
    <div style={{ marginTop: "0.5rem", marginRight: "0.3rem" }}>
     
       
       {item.status?
                            item.status == 1?<span style={{backgroundColor:'#EFE4FF',color:'#6E24E7', borderRadius:'15px',padding:'5px',fontSize:'14px'}}>UnPaid</span>
                            :item.status==3?<span style={{backgroundColor:'rgba(211, 32, 40, 1)',color:'white', borderRadius:'15px',padding:'5px',fontSize:'14px'}}>Pay Now</span>
                            :item.status==2?<span style={{backgroundColor:'#ECFDF3',color:'#12B76A',borderRadius:'15px',padding:'5px',fontSize:'14px'}}>Paid</span>
                            :item.status==4?<span style={{backgroundColor:'#8ab7ff',color:'black',borderRadius:'15px',padding:'5px',fontSize:'14px'}}>OvdPd.</span>
                            :item.status==5?<span style={{backgroundColor:'#FEEAEB',color:'#D22129',borderRadius:'15px',padding:'5px',fontSize:'14px'}}>Ovd</span>
                            :item.status==6?<span style={{backgroundColor:'#FFF6E8',color:'#F8A31F', borderRadius:'15px',padding:'5px',fontSize:'14px'}}>Paused</span>
                            :item.status==7?<span style={{backgroundColor:'#EDC7E2',color:'black', borderRadius:'15px',padding:'5px',fontSize:'14px'}}>Mand.In Prog</span>
                            :item.status
                            :'-'}
     
    </div>
  </div>
</div>
    ))}
        </>
      )}
  

      </div>
      <BottomNavigationBar active="Menu" />
    </div>
   
    </div>
  )

}

export default RepaymentsCard;
