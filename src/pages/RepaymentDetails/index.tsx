import React, { useState } from "react";
import styles from "./index.module.css";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
// import SlideButton from 'rn-slide-button/src/components/SlideButton';

import Button from "../../components/atoms/Button";

import wallet from "../../images/static_assests/wallet.svg";

import monk from "../../images/monk_illustration.png"
import info from "../../images/static_assests/info.svg";

import { useNavigate } from "react-router-dom";

function RepaymentDetails() {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.Header} style={{ display: "flex", alignItems: "center" }}>
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
            <p style={{ fontSize: "1.4rem", margin: "0 0rem", display: "flex" }}>Repayment details
              <span>
                <p style={{ fontSize: "0.675rem", marginLeft: "0.5rem", padding: "2px 9px", backgroundColor: "#DFF8E4", color: "#45B21E", borderRadius: "16px", position: "fixed", marginRight: "10rem" ,marginTop:"0.5rem"}}>Active</p>
              </span>
            </p>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
              {/* <button
                style={{ border: "none", background: "none", marginLeft: "1rem" }}
              >
                <img
                  style={{ height: "1.75rem", marginRight: "2rem" }}
                  src={download}
                  alt=""
                />
              </button> */}
            </div>
          </div>
          <div style={{ marginLeft: "2.75rem" }}>
            <p style={{ fontSize: "0.775rem", color: "#919191" }}>Application ID: EL202303010</p>
          </div>
          <br />
          <br />
          <div className={styles.principal}>
            <div>
              <p style={{ color: "#606060", marginLeft: "0rem" }}>Outstanding amount</p>
              <p style={{ fontSize: "1.7rem", fontWeight: "bold" }}>₹ 10,00,000</p>
            </div>
            
          </div>
          <br />
          <br />
          <div style={{display:'flex',justifyContent: 'center',alignItems:'center',marginLeft:'1rem'}}>
            <div style={{border:'1px solid #d32028',width:'15rem',position:'absolute'}}>

            </div>
            <div style={{border:'1px solid #d32028',width:'10rem',position:'absolute',transform:'rotate(-90deg)'}}>

            </div>
          <div style={{
              display: "block",
              
              justifyContent: "center",
              alignItems: "center",
            }}>
              <div style={{ display: "flex", flexDirection: "column", marginBottom:'3rem' }}>
                <p style={{ fontSize: "0.875rem", fontWeight: "bold", }}>20 Jun, 21</p>
                <p style={{ color: "#737373", fontSize: "0.625rem", width: "max-content" }}>EMI start date</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column"}}>
                <p style={{ fontSize: "0.875rem", fontWeight: "bold", }}>₹ 15,000</p>
                <p style={{ color: "#737373", fontSize: "0.625rem", width: "max-content" }}>EMI amount</p>
              </div>
              
              
            </div>
            <img src={monk} alt="Monk illustration" style={{zIndex:'999',backgroundColor:'#FFFFFF',borderRadius:'10px',padding:'10px',marginLeft:'2.5rem',width: "4rem", alignContent:"center",justifyContent:"center",}} />
            <div style={{
              display: "block",
            
              justifyContent: "center",
              alignItems: "center",
            }}>

              <div style={{ display: "flex", flexDirection: "column",marginBottom:'3rem' }}>
                <p style={{ fontSize: "0.875rem", fontWeight: "bold", }}>20 Jul, 23</p>
                <p style={{ color: "#737373", fontSize: "0.625rem", width: "max-content" }}>EMI end date</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column",}}>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", }}>₹ 0</p>
                <p style={{ color: "#737373", fontSize: "0.625rem", width: "max-content" }}>Pending EMI amount</p>
              </div>
              
            </div>


            </div>

            <br />
          <br />
          
            <div style={{textAlign:"center"}}>
              <p style={{color:"#606060",textAlign:"center",fontSize:"1.3rem"}}>Principal amount <span style={{color:"#d32028"}}>₹ 10,00,000</span></p>
            </div>
            <br />
            <br />
            <div className={styles.backdrop} style={{ display: "flex", justifyContent: "center", }}>
          <div className={styles.loginContainer}>
            <div style={{ backgroundColor: "#E3C4C4", width: "3rem", height: "0.25rem", borderRadius: "0.25rem", margin: "0 auto" }}></div>
            <p className={styles.textEMI}>EMI History</p>
            <p className={styles.textEMIno}>15/17 EMIs completed</p>
            <br />
            <br />
            <table style={{ borderCollapse: "collapse" ,padding:"2px", borderSpacing: "1rem"
            }}>

  <div >
  <thead>
    <tr style={{padding:'10px'}} >
      <th style={{ width: '4rem', border: "none" }} scope="col">#</th>
      <th style={{  width: '20rem', textAlign: 'left', border: "none" }} scope="col">Due Date</th>
      <th style={{ width: '10rem', textAlign: 'center', border: "none" }} scope="col">EMI</th>
      <th style={{ width: '10rem', textAlign: 'left', border: "none" }} scope="col">Status</th>
      <th style={{ width: '10rem', textAlign: 'left', border: "none" }} scope="col">Info</th>
    </tr>
  </thead>
            <tbody style={{overflowY:"scroll",height:'10rem'}} >
    <tr className={styles.tableRow}>
      <td style={{padding:'8px'}} scope="row">
        <label className={styles.checkboxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
      </td>
      <td scope="row" style={{ width: '12rem', }}>20 Jun, 21</td>
      <td scope="row" style={{ width: '6rem' }}>₹ 15,000</td>
      <td scope="row" style={{ width: '8rem' }}>
        <p style={{ fontSize: "0.80rem", padding: "2px 9px", backgroundColor: "#DFF8E4", color: "#45B21E", borderRadius: "16px", fontWeight: "bold", position: "relative", width: "3rem" }}>Active</p>
      </td>
      <td scope="row" style={{ width: '8rem' }}><img style={{ width: "1.2rem" }} src={info} /></td>
    </tr>
    <tr className={styles.tableRow}>
    <td style={{padding:'8px'}} scope="row">
        <label className={styles.checkboxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
      </td>
      <td>20 Jul, 21</td>
      <td>₹ 15,000</td>
      <td>
        <p style={{ fontSize: "0.675rem", padding: "2px 9px", backgroundColor: "#DFF8E4", color: "#45B21E", borderRadius: "16px", fontWeight: "bold", position: "relative", width: "3rem" }}>Early</p></td>
      <td scope="row" style={{ width: '8rem' }}><img style={{ width: "1.2rem" }} src={info} /></td>
    </tr>

    <tr className={styles.tableRow}>
    <td style={{padding:'8px'}} scope="row">
        <label className={styles.checkboxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
      </td>
      <td>20 Aug, 21</td>
      <td>₹ 15,000</td>
      <td>
        <p style={{ fontSize: "0.675rem", padding: "2px 12px", backgroundColor: "#FAD9DB", color: "#D23028", borderRadius: "16px", fontWeight: "bold", position: "relative", width: "3rem" }}>Late</p></td>
      <td scope="row" style={{ width: '8rem' }}><img style={{ width: "1.2rem" }} src={info} /></td>
    </tr>
    <tr className={styles.tableRow}>
    <td style={{padding:'8px'}} scope="row">
        <label className={styles.checkboxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
      </td>
      <td>20 Sept, 21</td>
      <td>₹ 15,000</td>
      <td>
---</td>
      <td scope="row" style={{ width: '8rem' }}><img style={{ width: "1.2rem" }} src={info} /></td>
    </tr>
    
    <tr className={styles.tableRow}>
    <td style={{padding:'8px'}} scope="row">
        <label className={styles.checkboxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
      </td>
      <td>20 Sept, 21</td>
      <td>₹ 15,000</td>
      <td>
---</td>
      <td scope="row" style={{ width: '8rem' }}><img style={{ width: "1.2rem" }} src={info} /></td>
    </tr>

    <tr className={styles.tableRow}>
    <td style={{padding:'8px'}} scope="row">
        <label className={styles.checkboxContainer}>
          <input type="checkbox" />
          <span className={styles.checkmark}></span>
        </label>
      </td>
      <td>20 Oct, 21</td>
      <td>₹ 15,000</td>
      <td>---</td>
      <td scope="row" style={{ width: '8rem' }}><img style={{ width: "1.2rem" }} src={info} /></td>
    </tr>
  </tbody>
  </div>
  
</table>
<br/>

<br/>


<div style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            border: "1px solid #F9D8D6",
            background: "#393939",
            padding: "0.75rem 0.85rem",
            borderRadius: "15px 15px 15px 15px",
            justifyContent: "space-between"
          }}>
            <div style={{display: "flex",
            flexDirection: "row",
            color:"#ffffff",
            fontSize:"1.1rem",
            justifyContent: "space-between",
            marginTop:"1rem"
            }}>
              <p>2 EMIS</p><span style={{paddingLeft:"0.3rem",paddingRight:"0.3rem"}}>|  </span>
              
              <p> ₹ 30000</p>
            </div>
            <div style={{ marginLeft: "1rem" }}>
                <button className={styles.offerButton2} onClick={() => navigate("/loan-steps")}>
                  <span style={{ marginRight: "0.3rem", display: "flex", alignItems: "center" }}>
                    <img src={wallet} alt="Cash Bag" style={{ width: "1.5rem" }} />
                  </span>
                  <span style={{ fontSize: "1.1rem" }}>Pay now</span>
                </button>
              </div>

            </div>



            
          </div>
        </div>


          
              
          </div>
        </div>
      </div>
    
  );
}

export default RepaymentDetails;
