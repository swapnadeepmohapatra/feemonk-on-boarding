import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DigioButton from "../../components/atoms/DigioButton";
import styles from "./styles.module.css";
// import icon_check_circle from "../../images/icons/check-circle.svg";
import icon_check_circle from "../../images/static_assests/check-circle.svg";
import feemonk from "../../Assets/images/FeeMonk_HighRes_Logo.png";
import styless from "./styles.module.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { jwtDecode } from "jwt-decode";
import styless1 from "./sanction/index.module.css";

import { useLocalStorage } from "../../hooks";
import {
  AgreementStatus,
  DigilockerStatus,
  MandateStatus,
  SelfieStatus,
} from "../../utils/config";
import { MandateType } from "../../utils/types";
import Label from "../../components/atoms/Label";
import InputText from "../../components/atoms/InputText";
import Button from "../../components/atoms/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import { process.env.REACT_APP_DASHBOARD_URL } from "../../utils";

let Digio: any;

function Mandate() {
  const [mandateStatus, setMandateStatus] = useState<MandateType>({});
  const user = sessionStorage.getItem("auth_token") || "";
  const decode = JSON.parse(user).value as any;
  console.log(decode);
  const intAuthUser = sessionStorage.getItem("authToken") || "";

  // Ensure authToken is a valid JWT string before decoding

  const [error, setError] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [radioSelectedAccount, setRadioSelectedAccount] = useState("SAVINGS");
  const [radioSelectedMandate, setRadioSelectedMandate] =
    useState("NET_BANKING");

  //    console.log("Item received in Mandate component:", item);

  const applicationId = sessionStorage.getItem("appId") ?? "";
  const userId = sessionStorage.getItem("userId") ?? "";
  const mobileNumber = sessionStorage.getItem("mobile") ?? "";
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  //   const [token] = useLocalStorage("feemonk_data", "");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //  setMandateStatus(decode as MandateType);
    callAuthApiDelayed();
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
          setLoading(false);
        });
    }, 5000);
  };
  // callAuthApiDelayed()

  const delayedUpdateDigioCall = (kid: any, id: any) => {
    setTimeout(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${decode && decode}`);
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
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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

  // useEffect(() => {
  //   if (
  //     mandateStatus?.selfieStatus === SelfieStatus.Successful &&
  //     mandateStatus?.enachStatus === MandateStatus.Successful &&
  //     mandateStatus?.agreementStatus === AgreementStatus.Signed
  //   ) {
  //     navigate("/thank-you");
  //   }
  // }, [mandateStatus, navigate]);

  function digilockerHandler() {
    fetchJsFromCDN("https://app.digio.in/sdk/v10/digio.js", ["Digio"]).then(
      (digio: any) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${decode}`);

        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(`${process.env.REACT_APP_DASHBOARD_URL}/digilocker/create`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            // console.log(result);

            const { kid, authTokenId, id } = result.data;

            Digio = digio[0];
            let d = new Digio({
              environment: "production",
              logo: "yourlogourl",
              theme: {
                primaryColor: "#234FDA",
                secondaryColor: "#234FDA",
              },
              is_iframe: true,
              callback: (_digio: any) => {
                // console.log("ALL: ", _digio);

                delayedUpdateDigioCall(kid, id);

                if (_digio.error_code === "CANCELLED") {
                  // console.log("Flow cancelled by user");
                  setFlag(!flag);
                  // navigate("/mandate");
                  callAuthApiDelayed();
                  return;
                }
                if (_digio.error_code !== undefined) {
                  setFlag(!flag);
                  // navigate("/mandate");
                  callAuthApiDelayed();
                  throw new Error(_digio.message);
                }

                // navigate("/mandate");
                callAuthApiDelayed();

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

  function loanAgreementHandler() {
    fetchJsFromCDN("https://app.digio.in/sdk/v10/digio.js", ["Digio"]).then(
      (digio: any) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${decode}`);

        var requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `${process.env.REACT_APP_DASHBOARD_URL}/agreement/${
            mandateStatus.isCoapplicant ? "coapplicant-generate" : "generate"
          }`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result: any) => {
            console.log(result, "RES");

            const { email, id, tokenId } = result.data;

            Digio = digio[0];
            let d = new Digio({
              environment: "production",
              logo: "yourlogourl",
              theme: {
                primaryColor: "#234FDA",
                secondaryColor: "#234FDA",
              },
              digioDocumentId: id,
              digioUserIdentifier: email,
              is_iframe: true,
              callback: (_digio: any) => {
                // console.log("ALL: ", _digio);
                setLoading(true);
                if (_digio.error_code === "CANCELLED") {
                  // console.log("Flow cancelled by user");
                  setFlag(!flag);
                  // navigate("/mandate");
                  callAuthApiDelayed();
                  return;
                }
                if (_digio.error_code !== undefined) {
                  setFlag(!flag);
                  // navigate("/mandate");
                  callAuthApiDelayed();
                  throw new Error(_digio.message);
                }

                setFlag(!flag);
                // navigate("/mandate");

                callAuthApiDelayed();

                // console.log(_digio);
              },
            });

            // console.log(d);

            d.init();
            d.submit(id, email, tokenId);
          })
          .catch((error) => console.log("error MESG", error));
      }
    );
  }

  function getOneWayKycUrl() {
    console.log("authotoken", decode);
    fetch(`${process.env.REACT_APP_DASHBOARD_URL}/one-way-kyc/create`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${decode.value}`,
        Authorization: `Bearer ${decode}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   // TODO: get from use state
      //   // accountNumber: "50100514289789",
      //   // ifscCode: "HDFC0001252",
      //   // accountType: "savings",
      //   // mandateType: "debitcard",
      //   accountNumber: accountNumber.trim(),
      //   ifscCode: ifscCode.trim(),
      //   accountType: radioSelectedAccount,
      //   mandateType: radioSelectedMandate,
      // }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.message === "success") {
          // console.log(res.data.url);
          const redirect_url = window.open(
            `https://app.digio.in/#/gateway/login/${res.data.kid}/vI3atY/${decode?.mobile}?token_id=${res?.data?.tokenId}&redirect_url=https://sanctions.feemonk.com/mandate`,
            "_blank",
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
            setError(
              "Please check the internet connection. Contact our support team if the error is not resolved."
            );
          }
        }
      });
  }
  const slefieClick = () => {
    fetch(`${process.env.REACT_APP_DASHBOARD_URL}/integrations-login/auth`, {
      headers: {
        Authorization: `Bearer ${intAuthUser}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("IMP", data);
        setMandateStatus(data?.data);

        if (data.data?.selfieStatus === SelfieStatus.Successful) {
        }
      });
  };
  const [mandateModals, setMandateModals] = useState(false);
  const toggleMandates = () => setMandateModals(!mandateModals);

  function submitMandate() {
    fetch(`${process.env.REACT_APP_DASHBOARD_URL}/nach/register`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${decode.value}`,
        Authorization: `Bearer ${decode}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // TODO: get from use state
        // accountNumber: "50100514289789",
        // ifscCode: "HDFC0001252",
        // accountType: "savings",
        // mandateType: "debitcard",
        accountNumber: accountNumber.trim(),
        ifscCode: ifsc.trim(),
        accountType: radioSelectedAccount,
        mandateType: radioSelectedMandate,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        if (res.message === "success") {
          // console.log(res.data.url);
          window.open(res.data.url, "_blank", "noopener,noreferrer");

          //   navigation.navigate("NachRazorpay", {
          //     razorpayUrl: res.data.url,
          //   });
        } else {
          if (
            res.message ===
            "Oops. There is an issue at our end. Please contact our support team"
          ) {
            setError(
              "Please check the bank details entered. Contact our support team if the error is not resolved."
            );
          }
          if (
            res.message ===
            "Debit card authentication for this bank is currently not available. Please try authenticating with netbanking"
          ) {
            setError(
              "Debit card authentication for this bank is currently not available. Please try authenticating with netbanking"
            );
          }
        }
      });
  }
  return (
    <div className={styles.main}>
      <div className={styles.backdrop}>
        {showProgress ? (
          <Box
            sx={{ display: "flex", marginTop: "5rem", placeContent: "center" }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Modal isOpen={mandateModals} size="lg" style={{ height: "100%" }}>
              <ModalHeader toggle={toggleMandates}>Mandate</ModalHeader>
              <ModalBody>
                <div className={styless1.inputField}>
                  <Label text="Account Number" />
                  <InputText
                    placeholder="Account Number"
                    type="text"
                    value={accountNumber}
                    changeHandler={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                <div className={styless1.inputField}>
                  <Label text="IFSC Code" />
                  <InputText
                    placeholder="IFSC Code"
                    type="text"
                    value={ifsc}
                    changeHandler={(e: any) => setIfsc(e.target.value)}
                  />
                </div>
                <div className={styless1.inputField}>
                  <Label text="Account Type" />
                  <div
                    onChange={(event) =>
                      setRadioSelectedAccount(
                        (event.target as HTMLInputElement).value
                      )
                    }
                    defaultValue="SAVINGS"
                  >
                    <input
                      type="radio"
                      value="SAVINGS"
                      name="student"
                      checked={radioSelectedAccount === "SAVINGS"}
                    />{" "}
                    <span
                      style={{ fontFamily: "Outfit-Medium", margin: "5px" }}
                    >
                      Savings
                    </span>{" "}
                    <br />
                    <input
                      type="radio"
                      value="CUURENT"
                      name="student"
                      checked={radioSelectedAccount === "CUURENT"}
                    />{" "}
                    <span
                      style={{ fontFamily: "Outfit-Medium", margin: "5px" }}
                    >
                      Current
                    </span>
                  </div>
                </div>
                <div className={styless1.inputField}>
                  <Label text="How do you want to authenticate your account?" />
                  <div
                    onChange={(event) =>
                      setRadioSelectedMandate(
                        (event.target as HTMLInputElement).value
                      )
                    }
                    defaultValue="NET_BANKING"
                  >
                    <input
                      type="radio"
                      value="NET_BANKING"
                      name="Net Banking"
                      checked={radioSelectedMandate === "NET_BANKING"}
                    />{" "}
                    <span
                      style={{ fontFamily: "Outfit-Medium", margin: "5px" }}
                    >
                      Net Banking
                    </span>{" "}
                    <br />
                    <input
                      type="radio"
                      value="DEBIT_CARD"
                      name="Debit Card"
                      checked={radioSelectedMandate === "DEBIT_CARD"}
                    />{" "}
                    <span
                      style={{ fontFamily: "Outfit-Medium", margin: "5px" }}
                    >
                      Debit Card
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onPress={() => {
                      if (accountNumber.trim() === "") {
                        setError("Please Enter Account Number");
                        return;
                      }

                      if (ifsc.trim() === "") {
                        setError("Please Enter IFSC Code");
                        return;
                      }
                      submitMandate();
                    }}
                    text="SUBMIT"
                  />
                </div>
              </ModalBody>
            </Modal>
            {loading && (
              <div className={styles.loadingBox}>
                <p className={styles.loadingText}>Loading...</p>
              </div>
            )}

            <div className={styless.container}>
              {/* <h1>Mandate</h1> */}
              {/* <img src={feemonk} alt="" className={styless.image} /> */}
              {/* {mandateStatus.digilockerStatus &&
          mandateStatus.digilockerStatus !== 3 && ( */}
              {!mandateStatus?.kycDone &&
                mandateStatus?.selfieStatus === SelfieStatus.Mismatch && (
                  <DigioButton
                    disabled={disabledCheckDigiLocker(mandateStatus)}
                    text="Digilocker KYC"
                    onPress={() => {
                      digilockerHandler();
                    }}
                    imageRight={
                      mandateStatus?.digilockerStatus === 3
                        ? icon_check_circle
                        : null
                    }
                  />
                )}
              {mandateStatus?.selfieStatus !== SelfieStatus.Failed && (
                <DigioButton
                  disabled={disabledCheckSelfie(mandateStatus)}
                  text="Selfie"
                  onPress={() => {
                    slefieClick();
                    getOneWayKycUrl();
                  }}
                  imageRight={
                    mandateStatus?.selfieStatus === 3 ? icon_check_circle : null
                  }
                />
              )}
              {mandateStatus?.selfieStatus === SelfieStatus.Failed && (
                <DigioButton
                  disabled={disabledCheckDigiLockerAfterSelfie(mandateStatus)}
                  text="Digilocker KYC"
                  onPress={() => {
                    digilockerHandler();
                  }}
                  imageRight={
                    mandateStatus?.digilockerStatus === 3
                      ? icon_check_circle
                      : null
                  }
                />
              )}
              <DigioButton
                disabled={disabledCheckAgreement(mandateStatus)}
                text="Agreement"
                onPress={() => {
                  loanAgreementHandler();
                }}
                imageRight={
                  mandateStatus?.agreementStatus === 3
                    ? icon_check_circle
                    : null
                }
              />
              <DigioButton
                disabled={disabledCheckMandate(mandateStatus)}
                text={"e-Mandate"}
                onPress={() => {
                  // navigate("/digio-mandate");
                  // navigate("/razorpay-mandate");
                  toggleMandates();
                }}
                imageRight={
                  mandateStatus?.enachStatus === 4 ? icon_check_circle : null
                }
              />
              <p className={styless.footerText}>
                Powered By
                <img
                  className={styless.footerImage}
                  src="https://www.digio.in/images/digio_blue.png"
                  alt=""
                />
              </p>
            </div>
            <Button
              text={"Get sanction & offer letter"}
              // imageRight={ArrowRight}
              onPress={() => {}}
              fullWidth
              disabled={mandateStatus.enachStatus !== MandateStatus.Successful}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Mandate;
