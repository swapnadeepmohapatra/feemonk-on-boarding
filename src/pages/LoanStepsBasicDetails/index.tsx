import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import Progress from "../../images/static_assests/progress_first.svg";
import BasicDetails from "../../images/static_assests/basic_details.svg";
import Loading from "../Menu/components/Loading";
import closee from "../../images/static_assests/redClose.svg";
import Button from "../../components/atoms/Button";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../helpers/axios";
// import { process.env.REACT_APP_DASHBOARD_URL } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { createApplication } from "../../services/application";
import { Console } from "console";
import BottomNavigationBar from "../../components/molecules/BottomNavBar";
import LoginDialog from "./components/LoginDialog";
import axios from "axios";
function LoanStepsBasicDetails() {
  const navigate = useNavigate();
  // Define types or interfaces if necessary
  interface PanProDetails {
    aadhaarId?: string;
    currentAddress?: string;
    currentCity?: string;
    currentPincode?: string;
    currentState?: string;
    // dob?: string;
    email?: string;
    firstName?: string;
    gender?: string;
    // id?: string;
    lastName?: string;
    // mobile?: string;
    panId?: string;
  }

  interface CkycData {
    fullName?: string;
    gender?: string;
    panNumber?: string;
    email?: string;
    currentAddress?: string;
    currentCity?: string;
    currentState?: string;
    currentPincode?: string;
    indentityList?: {
      name: string;
      id: string;
    }[];
  }
  const [loading, setLoading] = useState(false); // State for loading screen
  // const [toggleConsent, setToggleConsent] = useState(false);
  // Assuming panProDetails and ckycData are objects of type PanProDetails and CkycData respectively

  const [panProDetails, setpanProDetails] = useState<PanProDetails>();

  const [ckycData, setCkycData] = useState<CkycData>();
  // const { data } = useParams();

  const [applicantEmail, setApplicantEmail] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [userData, setUserData] = useState<{
    mobileNumber: string;
    course: string;
    fees: number;
    studentName: string;
    instituteName: string;
  }>({
    mobileNumber: "",
    course: "",
    fees: 0,
    studentName: "",
    instituteName: "",
  });
  const [dob, setDob] = useState("");
  const [pan, setPan] = useState("");
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const [dateOfBirth, setDOB] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const user = sessionStorage.getItem("auth_token") || "";
  // console.log(JSON.parse(user).value)
  const headerVal = JSON.parse(user).value;
  const decode = jwtDecode(JSON.parse(user).value) as any;
  // console.log(decode?.userId)
  const toggle = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const [dobError, setDobError] = useState(false);
  const [panError, setPanError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [blockTimestamp, setBlockTimestamp] = useState<number | null>(null);
  useEffect(() => {
    localStorage.setItem("verificationAttempts", attempts.toString());
    if (blockTimestamp !== null) {
      localStorage.setItem("blockTimestamp", blockTimestamp.toString());
    } else {
      localStorage.removeItem("blockTimestamp");
    }

    // Check if 48 hours have passed since the block
    if (blockTimestamp !== null) {
      const elapsedTime = Date.now() - blockTimestamp;
      if (elapsedTime >= 48 * 60 * 60 * 1000) {
        setAttempts(0); // Reset attempts after 48 hours
        setBlockTimestamp(null); // Reset block timestamp
        localStorage.removeItem("blockTimestamp");
        localStorage.setItem("verificationAttempts", "0");
      }
    }
  }, [attempts, blockTimestamp]);

  useEffect(() => {
    localStorage.setItem("verificationAttempts", attempts.toString());
    if (blockTimestamp !== null) {
      localStorage.setItem("blockTimestamp", blockTimestamp.toString());
    } else {
      localStorage.removeItem("blockTimestamp");
    }
  }, [attempts, blockTimestamp]);

  const [consentLink, setLink] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
    setDobError(e.target.value.trim() === "");
  };
  //age
  function getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPan(e.target.value);
    setPanError(e.target.value.trim() === "");
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(!emailPattern.test(e.target.value));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox status
  };

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, err);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({
      latitude,
      longitude,
    });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function err() {
    console.log("Unable to retrieve your location");
  }

  const [addFiles, setAddFiles] = useState(false);
  const [errors, setErrors] = useState({});
  const createLoanApplication = () => {
    // const headerVal = sessionStorage.getItem('auth_token') || "";
    handleLocationClick();
    const userId = decode?.userId; // Ensure userId is available
    if (userId) {
      const data2 = {
        // userId,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      // Make API call to submit data
      axios
        .post(`${process.env.REACT_APP_DASHBOARD_URL}/end-user/submit`, data2, {
          headers: {
            Authorization: `Bearer ${headerVal}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Handle success response if needed

          console.log("Data submitted successfully:", response.data);
        })
        .catch((error) => {
          // Handle error response if needed
          console.error("Error submitting data:", error);
        });
    }
  };
  const getPanPro = () => {
    setLoading(true);
    const panProUrl = `${process.env.REACT_APP_DASHBOARD_URL}/pay-later-flow/create-from-pan`;
    const panBody = {
      panId: pan,
      dob: moment(dob).format("DD/MM/YYYY"),
      email: email,
      mobile: decode?.mobile,
      userId: decode?.userId,
    };
    console.log(decode);
    if (attempts >= 5) {
      setBlockTimestamp(Date.now()); // Block the user

      window.alert(
        `You have reached the maximum number of verification attempts. You are blocked for 48 hours.`
      );
      setLoading(false);
      return;
    }

    if (dateOfBirth && getAge(dateOfBirth) >= 18) {
      window.alert("Check borrower age ! must be above 18 years old");
    } else {
      axiosInstance
        .post(panProUrl, panBody)
        .then((res: any) => {
          setLoading(false);
          console.log("res?.data?.data---->",res?.data?.data);
          if (res?.data?.data?.currentState?.length > 0) {
            setpanProDetails(res?.data?.data);
          } else {
            fetchCKYCDetails();
            // window.alert("Invalid PAN Details or Date of Birth")
          }
          handleStartSession(res?.data?.data);

          const data2 = {
            userId:decode?.userId,
            latitude: location.latitude,
            longitude: location.longitude,
          };
          axios
          .post(`${process.env.REACT_APP_DASHBOARD_URL}/end-user/submit`, data2, {
            headers: {
              Authorization: `Bearer ${headerVal}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            // Handle success response if needed
  
            console.log("Data submitted successfully:", response.data);
          })
          .catch((error) => {
            // Handle error response if needed
            console.error("Error submitting data:", error);
          });
          handleStartSession(res?.data)
          const headers = {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          };

          const data = {
            mobile: decode?.mobile,
            firstName:
              res?.data?.data?.firstName ||
              ckycData?.fullName?.split(" ")?.[1] ||
              "",
            lastName:
              res?.data?.data?.lastName ||
              ckycData?.fullName?.split(" ")?.[2] ||
              "",
            instituteName: instituteName,
            studentName: studentName,
            dateOfBirth: dob,
            courseName: courseName,
            courseFees: courseFee,
            gender: res?.data?.data
              ? res?.data?.data?.gender === "M"
                ? "Male"
                : "Female"
              : ckycData?.gender === "M"
              ? "Male"
              : "Female",
            panId: res?.data?.data
              ? res?.data?.data?.panId
              : ckycData?.panNumber,
            aadhaarId: res?.data?.data
              ? res?.data?.data?.aadharId
              : ckycData?.indentityList?.find(
                  (item) => item.name === "E-KYC Authentication"
                )?.id,
            email: email,
            currentAddress:
              res?.data?.data && res?.data?.data?.currentAddress
                ? res?.data?.data?.currentAddress
                : ckycData?.currentAddress,
            currentCity:
              res?.data?.data && res?.data?.data?.currentCity
                ? res?.data?.data?.currentCity
                : ckycData?.currentCity,
            currentState:
              res?.data?.data && res?.data?.data?.currentState
                ? res?.data?.data?.currentState
                : ckycData?.currentState,
            currentPincode:
              res?.data?.data && res?.data?.data?.currentPincode
                ? res?.data?.data?.currentPincode
                : ckycData?.currentPincode,
            ocrId: "",
            channel: 4,
          };
          setData(data)
          handleLocationClick();

          const userId = decode?.userId; // Ensure userId is available
          if (userId) {
            const data2 = {
              userId,
              latitude: location.latitude,
              longitude: location.longitude,
            };

            // New logic integration
            console.log(data);
            const mobileNumber = decode?.mobile;
            axiosInstance
              .get(`${process.env.REACT_APP_DASHBOARD_URL}/rules/eligibility?phone=${mobileNumber}`)
              .then((res) => {
                const qecBody = {
                  applicationId: decode?.applicationId,
                  userId: decode?.userId,
                  instituteId: decode?.instituteId,
                  studentName: data.firstName,
                  applicantName: `${data.firstName} ${data.lastName}`,
                  panId: data.panId,
                  dob: dob,
                  phone: mobileNumber,
                  status: "Created",
                  eligibility: res?.data?.data?.status,
                };
                console.log(qecBody);

                axiosInstance
                  .post(`${process.env.REACT_APP_DASHBOARD_URL}/rules/create/eligibility`, qecBody)
                  .then((result) => {
                    console.log(result);

                    // Navigate to loan steps start after successful API calls
                    // setToggleConsent(false);
                    // setTimeout(() => {
                    //   navigate("/loan-steps-start", { state: { data, data2 } });
                    // }, 500);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })

        .catch((err: any) => {
          console.log("err-------->",err);
          window.alert("Invalid PAN Details or Date of Birth");
          setAttempts((prev) => {
            const newAttempts = prev + 1;
            if (newAttempts >= 5) {
              setBlockTimestamp(Date.now()); // Block the user if attempts exceed 5
            }
            return newAttempts;
          });
        });
    }
  };

  const fetchCKYCDetails = () => {
    const userId = decode.userId;
    const applicationId = decode.applicationId;

    // Make sure userId and applicationId are available

    const ckycUrl = `${process.env.REACT_APP_DASHBOARD_URL}/ckyc/create`;
    const ckycBody = {
      userId: decode?.userId,
      panNumber: pan,
      dateOfBirth: moment(dob, "YYYY-MM-DD").format("DD/MM/YYYY"),
    };
    axiosInstance
      .post(ckycUrl, ckycBody)
      .then((res) => {
        setCkycData(res?.data?.data);
      })
      .catch((err) => {
        alert("Error while fetching CKYC");
        setAttempts((prev) => {
          const newAttempts = prev + 1;
          if (newAttempts >= 5) {
            setBlockTimestamp(Date.now());
          }
          return newAttempts;
        });
      });
  };
console.log("panprodetails--->",panProDetails)
  const [toggleConsent,setToggleConsent]=useState(false)

   const handleStartSession=(item : any)=>{
    console.log("item--->",item)
    const randomGen= Date.now().toString(36) + Math.random().toString(36).substr(2);

    (window as any). getBureauSession('708587bad0904485abe1127847dd62cd',randomGen,item.firstName,'',item.lastName,decode?.mobile).then((res :any)=>{
    console.log(res)
    setToggleConsent(true)
    setLink(res)
    }
    )
  }

    const handleLoadSession = async () => {
      const result = await (window as any).startBureauSession();
      if (result) {
          switch (result.status) {
              case "SUCCESS":
                  const headers = {
                      'Authorization': `Bearer ${user}`,
                      'Content-Type': 'application/json',
                  };
                  navigate("/loan-steps-start", { state: { data } });
                  break;

              case "EXIT":
                  alert("Retry Submit");
                  toggle();
                  break;

              case "ERROR":
                  alert("Error Please Try Later");
                  toggle();
                  break;

              default:
                  alert("Contact ouri co team for assistance");
                  break;
          }
      }
  };

  const isBlocked = () => {
    if (blockTimestamp === null) return false;
    const elapsedTime = Date.now() - blockTimestamp;
    return elapsedTime < 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  };

  console.log(attempts);

  // Calculate remaining time
  const getRemainingTime = () => {
    if (blockTimestamp === null) return null;
    const elapsedTime = Date.now() - blockTimestamp;
    const remainingTime = 48 * 60 * 60 * 1000 - elapsedTime;
    return remainingTime > 0 ? remainingTime : null;
  };

  const renderRemainingTime = () => {
    const remainingTime = getRemainingTime();
    if (remainingTime === null) return null;

    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    const minutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
        {toggleConsent ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "4rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    paddingTop: "0.5rem",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                  }}
                >
                  Consent:
                </p>
                <img
                  src={closee}
                  style={{
                    width: "2rem",
                    cursor: "pointer",
                    paddingBottom: "0.5rem",
                  }}
                  onClick={() => setToggleConsent(!toggleConsent)}
                />
              </div>
              <div>
                <iframe
                  style={{ top: "0" }}
                  width="350"
                  height="600"
                  src={consentLink}
                  onLoad={handleLoadSession}
                ></iframe>
              </div>
            </div>
          </div>
        )  : (
            // Show main content if toggleConsent is false
            <div className={styles.main}>
              <div className={styles.Header}>
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <img
                    style={{ marginLeft: "0.5rem", height: "1.5rem" }}
                    src={BackArrow}
                    alt=""
                  />
                </button>
                <p style={{ marginRight: "0.5rem", fontWeight: "bold" }}>T&C</p>
              </div>
              <br />
              <div>
              <img
                style={{ maxWidth: "90%", paddingLeft: "2rem" }}
                src={Progress}
                alt=""
              />
              </div>
              <div>
              <LoanStepCard
                title="Basic Details"
                image={BasicDetails}
                tiime="1 min"
              />
              </div>
              {/* <br /> */}
              {loading ? (
                <Loading/>
              ):(
<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
              <div className={styles.inputField}>
                <div style={{display:'flex',alignItems:'center'}}>
                <Label text="Date of birth" />
                {dobError && (
                <p
                  style={{
                    color: "#d32028",
                    fontSize: "0.8rem",
                    paddingLeft: "1rem",
                  }}
                >
                  Date of birth is required.
                </p>
              )}
                </div>

                <div className={styles.dateInputWrapper}>
                  <InputText
                    placeholder="Date of birth"
                    type="date"
                    value={dob}
                    changeHandler={handleDateChange}
                  />
                </div>
              </div>
              
              <div className={styles.inputField}>
                <div style={{display:'flex',alignItems:'center'}}>
                <Label text="PAN number" />
                {panError && (
                <p
                  style={{
                    color: "#d32028",
                    fontSize: "0.8rem",
                    paddingLeft: "1rem",
                  }}
                >
                  PAN number is required.
                </p>
              )}
                </div>
               
                <InputText
                  placeholder="EBP0000000XR"
                  type="text"
                  value={pan}
                  changeHandler={handlePanChange}
                />
              </div>
              
              <div className={styles.inputField}>
                <div style={{display:'flex',alignItems:'center'}}>
                <Label text="Email" />
                {emailError && (
                <p
                  style={{
                    color: "#d32028",
                    fontSize: "0.8rem",
                    paddingLeft: "1rem",
                  }}
                >
                  Invalid Email address
                </p>
              )}
                </div>
                
                <InputText
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  changeHandler={handleEmailChange}
                />
              </div>
             
              </div>
              )}
              
              {/* <br />
              <br />
              <br />
              <br /> */}
              {/* {!loading && ( // Render checkbox only when loading and toggleConsent are false
                <div
                  style={{
                    display: "flex",
                    alignItems: "self-start",
                    gap: "8px",
                  }}
                >
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                  <p
                    style={{
                      marginBottom: "1rem",
                      paddingBottom: "1rem",
                      color: "#667085",
                      fontSize: "1rem",
                    }}
                  >
                    I consent and authorize{" "}
                    <span style={{ color: "#d32028" }}>Fee</span>
                    <span style={{ color: "black" }}>monk</span> to get a
                    background check and a consumer credit report on me
                  </p>
                </div>
              )} */}
              {isBlocked() ? (
                <p
                  style={{
                    color: "red",
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  You have reached the maximum number of verification attempts.
                  Please try again in <strong>{renderRemainingTime()}</strong>.
                </p>
              ) : (
                <div style={{marginBottom:'20%',marginTop:'2rem'}}>
                <Button
                  onPress={getPanPro}
                  text={"Verify"}
                  imageRight={ArrowRight}
                  fullWidth
                  disabled={ dobError || panError} // Disable button if attempts >= 5
                />
                </div>
              )}
            </div>
          )}
          <BottomNavigationBar active="Home"/>
        </div>
      </div>
    </>
  );
}

export default LoanStepsBasicDetails;
