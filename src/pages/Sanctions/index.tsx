import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg"
import {jwtDecode} from "jwt-decode";
import selected from "../../images/static_assests/selected.png"
import kycImage from "../../images/static_assests/kyc.png"
import { MandateType } from "../../utils/types";
// import { process.env.REACT_APP_DASHBOARD_URL} from "../../utils";
import {
  AgreementStatus,
  DigilockerStatus,
  MandateStatus,
  SelfieStatus,
} from "../../utils/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Label from "../../components/atoms/Label";
import InputText from "../../components/atoms/InputText";
import axios from "axios";

let Digio: any;

function Sanctions() {
  const [mandateStatus, setMandateStatus] = useState<MandateType>({});
  const user = sessionStorage.getItem("auth_token") || "";
  const decode = JSON.parse(user).value as any;
  const intAuthUser = sessionStorage.getItem("authToken") || "";
  const token = jwtDecode(JSON.parse(user).value) as any;
    const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [radioSelectedAccount, setRadioSelectedAccount] = useState("SAVINGS");
  const [radioSelectedMandate, setRadioSelectedMandate] =
    useState("NET_BANKING");

  const navigate = useNavigate();
  const callAuthApiDelayed = () => {
    setInterval(() => {
      fetch(`${process.env.REACT_APP_DASHBOARD_URL}/integrations-login/auth`, {
        headers: {
          Authorization: `Bearer ${intAuthUser}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setMandateStatus(data.data);
        });
    }, 2000);
  };

  useEffect( () => {
    callAuthApiDelayed();
    const url = `${process.env.REACT_APP_DASHBOARD_URL}/integrations-login/generate-token`;
    const requestData = {
      mobile: "9052978077",
      userId: "c6d92b00-2115-4f1f-90b8-3ae75d06fadf",
      applicationId: "FM24001155",
    };
     axios.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      .then((res)=>{
        console.log("token", res?.data?.data);
        sessionStorage.setItem("authToken", res?.data?.data);
      })
    .catch (()=> {
      console.error("Error generating token:", error);
    })
    
  }, []);

  const fetchJsFromCDN = (src: any, externals: string[]) => {
    externals = !externals ? (externals = []) : externals;
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      script.addEventListener("load", () => {
        resolve(
          externals.map((key: any) => {
            const ext = window[key];
            typeof ext === "undefined" &&
              console.warn(`No external named '${key}' in window`);
            return ext;
          })
        );
      });
      script.addEventListener("error", reject);
      document.body.appendChild(script);
    });
  };

  const delayedUpdateDigioCall = (kid: any, id: any) => {
    setTimeout(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${intAuthUser}`);
      myHeaders.append("Content-Type", "application/json");

      var requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `${process.env.REACT_APP_DASHBOARD_URL}/digilocker/updateDetails?entityId=${kid}&transactionId=${id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          // console.log(result);
          setFlag(!flag);
          // navigate("/mandate");
        })
        .catch((error) => console.log("error", error));
    }, 3000);
  };

  const disabledCheckDigiLockerAfterSelfie = (mandateStatus: MandateType) => {
    if (mandateStatus?.digilockerStatus === DigilockerStatus.Successful) {
      return true;
    }
    if (mandateStatus?.selfieStatus === SelfieStatus.Failed) {
      return false;
    }
    if (mandateStatus?.kycDone) {
      return true;
    } else if (
      !mandateStatus?.kycDone &&
      mandateStatus?.digilockerStatus !== DigilockerStatus.Successful
    ) {
      return false;
    }
    return true;
  };

  const disabledCheckDigiLocker = (mandateStatus: MandateType) => {
    if (mandateStatus.kycDone) {
      return true;
    } else if (
      !mandateStatus?.kycDone &&
      mandateStatus?.digilockerStatus !== DigilockerStatus.Successful
    ) {
      return false;
    }
    return true;
  };

  const disabledCheckSelfie = (mandateStatus: MandateType) => {
    if (
      !mandateStatus?.kycDone &&
      mandateStatus?.digilockerStatus !== DigilockerStatus.Successful
    ) {
      return true;
    }
    if (mandateStatus?.selfieStatus !== SelfieStatus.Successful) {
      return false;
    }
    return true;
  };

  const disabledCheckAgreement = (mandateStatus: MandateType) => {
    if (
      !mandateStatus?.kycDone &&
      mandateStatus?.digilockerStatus !== DigilockerStatus.Successful
    ) {
      return true;
    }
    if (mandateStatus?.selfieStatus === SelfieStatus.Failed) {
      if (mandateStatus?.agreementStatus === AgreementStatus.Signed) {
        return true;
      }
      return false;
    }
    if (mandateStatus?.selfieStatus !== SelfieStatus.Successful) {
      return true;
    }
    if (mandateStatus?.agreementStatus !== AgreementStatus.Signed) {
      return false;
    }
    return true;
  };

  const disabledCheckMandate = (mandateStatus: MandateType) => {
    if (
      !mandateStatus?.kycDone &&
      mandateStatus?.digilockerStatus !== DigilockerStatus.Successful
    ) {
      return true;
    }
    if (mandateStatus?.selfieStatus === SelfieStatus.Failed) {
      if (mandateStatus?.agreementStatus === MandateStatus.Successful) {
        return true;
      }
      return false;
    }
    if (mandateStatus?.selfieStatus !== SelfieStatus.Successful) {
      return true;
    }
    if (mandateStatus?.agreementStatus === AgreementStatus.PendingCoapplicant) {
      return false;
    }
    if (mandateStatus?.agreementStatus !== AgreementStatus.Signed) {
      return true;
    }
    if (mandateStatus?.enachStatus !== MandateStatus.Successful) {
      return false;
    }
    return true;
  };

  function digilockerHandler() {
    console.log("process.env.REACT_APP_DIGIO_SDK,",process.env.REACT_APP_DIGIO_SDK);
    fetchJsFromCDN(process.env.REACT_APP_DIGIO_SDK, ["Digio"]).then(
      (digio: any) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${intAuthUser}`);

        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_DASHBOARD_URL}/digilocker/create`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("result,",result);

            const { kid, authTokenId, id } = result.data;

            Digio = digio[0];
            let d = new Digio({
              environment: process.env.REACT_APP_DIGIO_ENV,
              logo: "yourlogourl",
              theme: {
                primaryColor: "#234FDA",
                secondaryColor: "#234FDA",
              },
              is_iframe: true,
              callback: (_digio: any) => {
                // console.log("ALL: ", _digio);

                // delayedUpdateDigioCall(kid, id);

                if (_digio.error_code === "CANCELLED") {
                  // console.log("Flow cancelled by user");
                  setFlag(!flag);
                  navigate("/Sanctions");
                  // callAuthApiDelayed();
                  return;
                }
                if (_digio.error_code !== undefined) {
                  setFlag(!flag);
                  navigate("/Sanctions");
                  // callAuthApiDelayed();
                  throw new Error(_digio.message);
                }

                navigate("/Sanctions");
                // callAuthApiDelayed();

                // console.log(_digio);
              },
            });

            // console.log(d);

            d.init();
            d.submit(kid, authTokenId);
          })
          .catch((error) => console.log("error", error));
      }
    );
  }

  function selfieHandler() {
    fetch(`${process.env.REACT_APP_DASHBOARD_URL}/selfie/create`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${authToken.value}`,
        Authorization: `Bearer ${intAuthUser}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.message === "success") {
          // console.log(res.data.url);
          const redirect_url = window.open(
            `https://app.digio.in/#/gateway/login/${res.data.entityId}/vI3atY/${mandateStatus?.mobile}?token_id=${res.data.tokenId}&redirect_url=https://feemonk.com/${decode}`,
            "_self",
            "noopener,noreferrer"
          );

          //   navigation.navigate("NachRazorpay", {
          //     razorpayUrl: res.data.url,
          //   });
        } else {
          if (
            res.message ===
            "Oops. There is an issue at our end. Please contact our support team"
          ) {
            alert(
              "Please check the internet connection. Contact our support team if the error is not resolved."
            );
            // setError(
            //   "Please check the internet connection. Contact our support team if the error is not resolved."
            // );
          }
        }
      });
  }

  const loanAgreementHandler = () => {
    fetchJsFromCDN(process.env.REACT_APP_DIGIO_SDK, ["Digio"])
      .then((digio: any) => {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          `Bearer ${intAuthUser}`
        );

        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `${process.env.REACT_APP_DASHBOARD_URL}/agreement/${
            mandateStatus?.isCoapplicant ? "coapplicant-generate" : "generate"
          }`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            const { email, id, tokenId } = result.data;

            const Digio = digio[0];
            let d = new Digio({
              environment: process.env.REACT_APP_DIGIO_ENV,
              logo: "yourlogourl",
              theme: {
                primaryColor: "#234FDA",
                secondaryColor: "#234FDA",
              },
              digioDocumentId: id,
              digioUserIdentifier: email,
              is_iframe: true,
              callback: (_digio: any) => {
                // API call completed, disable loader and enable button
                if (_digio.error_code === "CANCELLED") {
                  setFlag(!flag);
                  navigate("/Sanctions");
                  return;
                }
                if (_digio.error_code !== undefined) {
                  setFlag(!flag);
                  navigate("/Sanctions");
                  throw new Error(_digio.message);
                }
                setFlag(!flag);
                navigate("/Sanctions");
              },
            });

            d.init();
            d.submit(id, email, tokenId);
          })
          .catch((error) => {
            // API call failed, disable loader and enable button
            // setLoaderAgreement(false);
            console.log("error", error);
          });
      })
      .catch((error) => {
        // Fetching digio.js failed, disable loader and enable button
        // setLoaderAgreement(false);
        console.log("error", error);
      });
  };

  const getRazorpayUrl = () => {
    const url = `${process.env.REACT_APP_DASHBOARD_URL}/pay-later-flow/nach/register`;
    const requestData = {
      userId: "c6d92b00-2115-4f1f-90b8-3ae75d06fadf",
      applicationId: "FM24001155",
    };
     axios.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      .then((res)=>{
        console.log("ressdsfs",res)
        window.open(res?.data?.data?.authLink, "_self", "noopener,noreferrer");
        
      })
    .catch (()=> {
      console.error("Error generating token:", error);
    })
  }

  return (
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
          
        <p style={{textAlign:'center',padding:'2.5rem',fontWeight:'bold',fontSize:'15px'}}>Complete the below following steps to proceed further</p>
        <div style={{backgroundColor:'rgba(255, 223, 224, 1)',border: "1px solid rgba(212, 33, 41, 0.15)",borderRadius:'12px',padding:'2rem',margin:'0.5rem'}}>

        {!mandateStatus?.kycDone && (
                  <button 
            onClick={()=>digilockerHandler()}  
            disabled={disabledCheckDigiLocker(mandateStatus)}

            style={{backgroundColor:'rgba(255, 248, 244, 1)',padding:'0.5rem',borderRadius:'8px',boxShadow:disabledCheckDigiLocker(mandateStatus) ? "none" : "0px 3px 3px 0px rgba(0, 0, 0, 0.15)",width:'100%',border:mandateStatus?.digilockerStatus === 3?"1px solid rgba(64, 182, 75, 1)":'none'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center'}}>
            <img src = {kycImage} style={{backgroundColor:'rgba(244, 229, 221, 1)',padding:'0.5rem',borderRadius:'50%'}}/>
            <p style={{fontWeight:'bold',marginLeft:'1rem'}}>DigiLocker</p>
            </div>
                  {mandateStatus?.digilockerStatus === 3 ? <img src = {selected} style={{width:'20px',height:'20px'}}/> : null} 
           {/* {mandateStatus?.digilockerStatus === 3 ? <img src = {selected} style={{width:'20px',height:'20px'}}/> : <img src = {BackArrow} style={{width:'25px',height:'25px', transform: 'rotate(180deg)'}}/>}  */}
            {/* <p style={{color: "rgba(115, 115, 115, 1)",fontSize:'13px',paddingTop:'2.5px'}}>Aadhar Linked Mobile Number required </p> */}
            </div>
            <p style={{color: "rgba(115, 115, 115, 1)",fontSize:'13px',paddingTop:'2.5px'}}>Aadhar Linked Mobile Number required </p>

                  </button>
                )}
              {mandateStatus?.selfieStatus !== SelfieStatus.Failed && (
                <button
                 onClick={()=>selfieHandler()}
                 disabled={disabledCheckSelfie(mandateStatus)}

                 style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'2rem',backgroundColor:'rgba(255, 248, 244, 1)',padding:'0.5rem',borderRadius:'8px',boxShadow:disabledCheckSelfie(mandateStatus) ? "none" : "0px 3px 3px 0px rgba(0, 0, 0, 0.15)",width:'100%',border:mandateStatus?.selfieStatus === 3?"1px solid rgba(64, 182, 75, 1)":'none'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <img src = {kycImage} style={{backgroundColor:'rgba(244, 229, 221, 1)',padding:'0.5rem',borderRadius:'50%'}}/>
                <div style={{marginLeft:'1rem'}}>
                <p style={{fontWeight:'bold'}}>Selfie</p>
                </div>
                </div>
                  {mandateStatus?.selfieStatus === 3 ? <img src = {selected} style={{width:'20px',height:'20px'}}/> : null} 
    
                </button>
              )}
              {mandateStatus?.selfieStatus === SelfieStatus.Failed && (
                <button
                onClick={() => digilockerHandler()}
                disabled={disabledCheckDigiLockerAfterSelfie(mandateStatus)}
                style={{display:'flex',alignItems:'center',justifyContent:'space-between',backgroundColor:'rgba(255, 248, 244, 1)',padding:'0.5rem',borderRadius:'8px',boxShadow:disabledCheckDigiLockerAfterSelfie(mandateStatus) ? "none" : "0px 3px 3px 0px rgba(0, 0, 0, 0.15)",width:'100%',border:mandateStatus?.digilockerStatus === 3?"1px solid rgba(64, 182, 75, 1)":'none'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <img src = {kycImage} style={{backgroundColor:'rgba(244, 229, 221, 1)',padding:'0.5rem',borderRadius:'50%'}}/>
                <div style={{marginLeft:'1rem'}}>
                <p style={{fontWeight:'bold'}}>DigiLocker</p>
                <p style={{color: "rgba(115, 115, 115, 1)",fontSize:'13px',paddingTop:'2.5px'}}>Aadhar Linked Mobile Number required </p>
                </div>
                </div>
                {mandateStatus?.digilockerStatus === 3 ? <img src = {selected} style={{width:'20px',height:'20px'}}/> : null}    
                      </button>
              )}


            <button 
            onClick={() => loanAgreementHandler()}
            disabled={disabledCheckAgreement(mandateStatus)}

            style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'2rem',backgroundColor:'rgba(255, 248, 244, 1)',padding:'0.5rem',borderRadius:'8px',boxShadow:disabledCheckAgreement(mandateStatus) ? "none" : "0px 3px 3px 0px rgba(0, 0, 0, 0.15)",width:'100%',border:mandateStatus?.agreementStatus === 3?"1px solid rgba(64, 182, 75, 1)":'none'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <img src = {kycImage} style={{backgroundColor:'rgba(244, 229, 221, 1)',padding:'0.5rem',borderRadius:'50%'}}/>
            <div style={{marginLeft:'1rem'}}>
            <p style={{fontWeight:'bold'}}>Agreement</p>
            </div>
            </div>
                  {mandateStatus?.agreementStatus === 3 ? <img src = {selected} style={{width:'20px',height:'20px'}}/> : null} 
            </button>


            <button 
            disabled={disabledCheckMandate(mandateStatus)}
            onClick={() => {
              getRazorpayUrl()
            }}
            style={{marginTop:'2rem',backgroundColor:'rgba(255, 248, 244, 1)',padding:'0.5rem',borderRadius:'8px',boxShadow:disabledCheckMandate(mandateStatus) ? "none" : "0px 3px 3px 0px rgba(0, 0, 0, 0.15)",width:'100%',border:mandateStatus?.enachStatus === 4 || mandateStatus?.enachStatus === 6 || mandateStatus?.enachStatus === 11?"1px solid rgba(64, 182, 75, 1)":'none'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center'}}>
              <img src = {kycImage} style={{backgroundColor:'rgba(244, 229, 221, 1)',padding:'0.5rem',borderRadius:'50%'}}/>
              <p style={{fontWeight:'bold',marginLeft:'1rem'}}>Mandate</p>
              </div>
                  {mandateStatus?.enachStatus === 4 || mandateStatus?.enachStatus === 6 || mandateStatus?.enachStatus === 11 ? <img src = {selected} style={{width:'20px',height:'20px'}}/> : null} 
            </div>
            <p style={{color: "rgba(115, 115, 115, 1)",fontSize:'13px',paddingTop:'2.5px'}}>NetBanking or Debit card details required </p>

            </button>
        </div>
        {process.env.REACT_APP_CURRENT === "dev" ?(
              <button style={{margin:'40px'}}
              onClick={() => {
                console.log("Clicked");
                // console.log(redirectUrl);

                fetch(`${process.env.REACT_APP_DASHBOARD_URL}/nach/skip`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: "c6d92b00-2115-4f1f-90b8-3ae75d06fadf",
                    applicationId: "FM24001155",
                  }),
                }).then((res) => {
                  navigate("/PFCollection");
                });

                // window.open(redirectUrl, "_self");
              }}
            >
              Skip (for dev purposes)
            </button>
            ):null}
        </div>
      </div>
    </div>
  );
}

export default Sanctions;
