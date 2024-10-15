import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import redProfile from "../../images/icons/redProfile.svg";
import LoanAdpng from "../../images/LoanAd.png";
import MyApplicationsImage from "../../images/static_assests/my_applications_icon.svg";
import MyLoansImage from "../../images/static_assests/my_loans_icon.svg";
import MyRepaymentsImage from "../../images/static_assests/my_repayments_icon.svg";
import MyFeepaymentImage from "../../images/static_assests/feepayment_icon.svg";
import MonkHeroImage from "../../images/static_assests/monk_with_bg.svg";
import ArrowRight from "../../images/icons/RedArrow.svg";
import BottomNavigationBar from "../../components/molecules/BottomNavBar";
import LoginDialog from "./components/LoginDialog";
import { useLocalStorage } from "../../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RightArrow from "../../images/icons/RedArrow.svg"
import monkImage from "../../images/monk_illustration.png"
import wallet from "../../images/static_assests/wallet.svg";
import Loading from "../Menu/components/Loading";
const loanAd = {
  title: "Avail up to",
  amount: "₹ 10 lakhs of loan",
  action: {
    text: "Apply Now",
    url: "/loan-steps",
  },
  benefits: [
    { text: "No processing fee" },
    { text: "Paperless process" },
    { text: "Best EMI options" },
  ],
  finePrint: {
    text: "T&C",
  },
};

const loanSections = [
  // { text: "My Applications", image: MyApplicationsImage },
  { text: "My Loans", image: MyLoansImage },
  // { text: "My Repayments", image: MyRepaymentsImage },
  // { text: "My Fee Payments", image: MyFeepaymentImage },
];

function Home() {
  const [authToken] = useLocalStorage("auth_token", "");
  const [reload, setReload] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let userNumber = "";

  const user = sessionStorage.getItem("auth_token") || "";
  if (user) {
    try {
      const decoded = JSON.parse(user).mob as any;
      userNumber = decoded;
      console.log(decoded);
    } catch (error) {
      console.error("Failed to parse user token", error);
    }
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `https://customer-apis.feemonk.com/applications/getApplications/${userNumber}`
        );
        setApplications(response.data.res || []);
      } catch (err) {
        console.error("Failed to fetch applications", err);
        setError("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    if (userNumber) {
      fetchApplications();
    }
  }, [userNumber]);

  const getStatusPercentage = (status: string) => {
    switch (status.toLowerCase()) {
      case "in submission":
        return {
          percentage: 25,
          message:
            "Your application is almost completed. Just 10 mins away from availing loan ",
        };
      case "in review":
      case "on hold":
      case "in process":
        return {
          percentage: 50,
          message:
            "Your application is almost completed. Just 5 mins away from availing loan ",
        };
      case "in sanction":
      case "ready to disburse":
        return {
          percentage: 80,
          message:
            "Your application is almost completed. Just 3 mins away from availing  ",
        };
      case "disbursed":
        return { percentage: 100, message: "Your application is completed" };
      default:
        return { percentage: 0, message: "" };
    }
  };

  const [data, setData] = useState("");
  const findLatestApplication = (applications: any[]) => {
    if (applications.length === 0) {
      return null; // No applications found
    }
    return applications[applications.length - 1];
  };

  const latestApplication = findLatestApplication(applications);
  console.log("Latest Application: ", latestApplication); // Debugging line

  const latestApplicationStatus = latestApplication
    ? latestApplication.obj.applicationProfile.status
    : "";
  console.log("Latest Application Status: ", latestApplicationStatus); // Debugging line

  const { percentage, message } = getStatusPercentage(latestApplicationStatus);
  console.log("Percentage: ", percentage, "Message: ", message); // Debugging line

  const isInSubmissionWithPanIdMissing =
    latestApplication &&
    latestApplication.obj.applicationProfile.status === "In Submission" &&
    !latestApplication?.obj?.data?.panId;
  const isInSubmissionWithPanIdPresent =
    latestApplication &&
    [
      "in submission",
      "in review",
      "on hold",
      "in process",
      "in sanction",
      "ready to disburse",
    ].includes(latestApplication.obj.applicationProfile.status.toLowerCase()) &&
    latestApplication?.obj?.data?.panId;

  console.log(isInSubmissionWithPanIdPresent);
  const showApplicationAlert = applications.some((app) =>
    [
      "disbursed",
      "in submission",
      "in review",
      "on hold",
      "in process",
      "in sanction",
      "ready to disburse",
    ].includes(app?.obj?.applicationProfile?.status.toLowerCase())
  );

  //
  const handleAlertClick = () => {
    console.log(latestApplication?.obj?.data?.panId);
    const data = latestApplication?.obj?.data; // Debugging line
    if (isInSubmissionWithPanIdPresent) {
      console.log("Navigating to /loan-steps-start"); // Debugging line
      navigate("/loan-steps-start", { state: { data } });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {reload ? null : null}
        <div className={styles.homeHeader}>
          <img className={styles.logo} src="main_logo.png" alt="" />
          <img
            style={{ height: "2.5rem", width: "2.5rem" }}
            src={redProfile}
            onClick={() => {
              navigate("/profile");
            }}
          />
        </div>
        {showApplicationAlert && !isInSubmissionWithPanIdMissing ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "1rem",
              margin: "0rem 2rem 1rem",
              background: "#FFFFFF",
              border: "1px solid #F9D8D6",
              borderRadius: "12px",
              transition: "border-radius 0.3s ease",
            }}
            onClick={handleAlertClick}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#D32028",
                    fontWeight: "bold",
                  }}
                >
                  {message}
                </p>
              </div>
              <div
                style={{ width: "40px", height: "40px", marginRight: "0.5rem" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "0.5rem",
                  }}
                >
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                      textColor: "#D32028",
                      pathColor: "#D32028",
                      trailColor: "#F9D8D6",
                      textSize: "30px",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.loanAdContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                paddingTop: "1rem"
              }}
            >
              <div style={{ padding: "0.5rem" }}>
                <p style={{ fontStyle: "normal", fontSize: "1.2rem" }}>
                  {loanAd.title}
                </p>
                <p className={styles.amount}>
                  <strong>₹10 Lakhs</strong> of loan
                </p>
              </div>
              <img
                src={LoanAdpng}
                alt="Loan Image"
                style={{ maxWidth: "7rem", height: "5rem" }}
              />
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingLeft:'1rem',paddingRight:'1rem',marginBottom:'0.5rem'}}>
              <button style={{height:'25px',width:'110px',display:'flex',justifyContent:'center',alignItems:'center',whiteSpace:'nowrap',fontSize:'1rem',backgroundColor: "rgba(211, 32, 40, 1)",borderRadius:'12px',margin:'0.5rem'}}
                onClick={() => {
                  navigate("/loan-steps-basic-details");
                }}
              > Apply Now
              </button>
              <p>
                {" "}
                {loanAd.finePrint.text}{" "}
                <img
                  src={ArrowRight}
                  alt="Right Arrow"
                  style={{ marginLeft: "1px", height: "10px" }}
                />
              </p>
            </div>

            <div className={styles.benefits}>
              {/* {loanAd.benefits.map((benefit, index) => (
              <div key={index} className={styles.benefit}>
                {benefit.text}
              </div>
            ))} */}
            <div style={{whiteSpace:"nowrap",fontSize:'12px'}}>Low processing fee</div>
              <div style={{height:'18px',width:'2px',border: "1px solid rgba(254, 152, 157, 1)"}}></div>
              <div style={{whiteSpace:"nowrap",fontSize:'12px'}}>Paperless process</div>
              <div style={{height:'18px',width:'2px',border: "1px solid rgba(254, 152, 157, 1)"}}></div>
              <div style={{whiteSpace:"nowrap",fontSize:'12px'}}>Best EMI options</div>
              {/* <p style={{ fontFamily: "Outfit" }}> No processing fee |</p>
              <p> Paperless process</p>
              <p>| Best EMI options</p> */}
            </div>
          </div>
        )}

        {/* <div className={styles.loanSectionContainer}>
          {loanSections.map((item, index) => (
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff6f6',boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.25)",borderRadius:'10px',padding:'0.7em',marginBottom:'0.5em'}}>
            <div key={index} style={{display:'flex',alignItems:'center'}}>
              <img src={item.image} alt="" style={{height:'2em'}}/>
              <p style={{whiteSpace:"nowrap",fontSize:'1.2em',marginLeft:'15px'}}>{item.text}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' ,justifyContent:'center'}}>
              <img style={{width:'1em'}} src={RightArrow}/>
            </div>
            </div>
          ))}
        </div> */}
        <img src={MonkHeroImage} alt="" style={{height:'100%',padding:'1rem'}} />
          <h3 style={{display:'flex',textAlign:'center',justifyContent:'center',marginBottom:'5rem'}}>No active Loans</h3>
       
        {/* <>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <p style={{color: "rgba(95, 95, 95, 1)",fontSize:'1.5rem'}}>Outstanding amount</p>
        <p style={{color: "black",fontFamily:'outfit',fontSize:'1.5rem',fontWeight:'bold',whiteSpace:'nowrap',paddingTop:'0.5rem',marginBottom:'-1rem'}}>₹ 4,00,000</p>
        </div>
    <div className={styles.container1}>
    <div className={styles.subcontainer1}>
      <div style={{display:'flex',flexDirection:'column'}}>
      <p style={{color: "black",fontFamily:'outfit',fontSize:'1rem',fontWeight:'bold',whiteSpace:'nowrap'}}> ₹ 10,00,000</p>
      <p style={{color: "rgba(95, 95, 95, 1)",fontFamily:'outfit',fontSize:'1rem',whiteSpace:'nowrap'}}>Principal amount</p>
      </div>
    </div>
    <div className={styles.subcontainer2}>
    <div style={{display:'flex',flexDirection:'column'}}>
      <p style={{color: "black",fontFamily:'outfit',fontSize:'1rem',fontWeight:'bold'}}> ₹ 15,000</p>
      <p style={{color: "rgba(95, 95, 95, 1)",fontFamily:'outfit',fontSize:'1rem'}}>EMI amount</p>
      </div>
    </div>
    <div className={styles.subcontainer3}>
    <div style={{display:'flex',flexDirection:'column'}}>
      <p style={{color: "black",fontFamily:'outfit',fontSize:'1rem',fontWeight:'bold',whiteSpace:'nowrap'}}> 20 Jun, 21</p>
      <p style={{color: "rgba(95, 95, 95, 1)",fontFamily:'outfit',fontSize:'1rem',whiteSpace:'nowrap'}}>EMI start date</p>
      </div>
    </div>
    <div className={styles.subcontainer4}>
    <div style={{display:'flex',flexDirection:'row',backgroundColor:'#d32028',padding:'8px',borderRadius:'12px',alignItems:'center'}}>
      <img src={wallet} style={{height:'1rem',}}/>
      <p style={{color: "white",fontFamily:'outfit',fontSize:'1rem',marginLeft:'5px'}} onClick={() => navigate("/emis")}>Pay Now</p>
      </div>
    </div>
    <div className={styles.dot}></div>
  </div>
        </> */}
        

        <BottomNavigationBar active="Home" />
        {!authToken && <LoginDialog reload={() => setReload(!reload)} />}
      </div>
    </div>
  );
}

export default Home;
