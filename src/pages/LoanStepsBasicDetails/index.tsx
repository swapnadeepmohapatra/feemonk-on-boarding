
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import Progress from "../../images/static_assests/progress_first.svg";
import BasicDetails from "../../images/static_assests/basic_details.svg";

import closee from "../../images/static_assests/redClose.svg";
import Button from "../../components/atoms/Button";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment'
import axiosInstance from '../../helpers/axios';
import { API_URL } from "../../utils";
import {jwtDecode} from 'jwt-decode';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createApplication } from "../../services/application";
import { Console } from "console";
import LoginDialog from "./components/LoginDialog";
function LoanStepsBasicDetails() {
  const navigate = useNavigate();
  // Define types or interfaces if necessary
interface PanProDetails {
  user_full_name_split?: any;
  user_gender?: string;
  pan_number?: string;
  masked_aadhaar?: string;
  user_email?: string;
  user_address?: {
      full?: string;
      city?: string;
      state?: string;
      zip?: string;
  };
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
  
  const [applicantEmail,setApplicantEmail] = useState("")
  const [instituteName,setInstituteName] = useState("")
  const [studentName,setStudentName] = useState("")
  const [courseName,setCourseName] = useState("")
  const [courseFee,setCourseFee] = useState("")
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
  const user=sessionStorage.getItem('auth_token') || ""
  // console.log(JSON.parse(user).value)
  const decode=jwtDecode(JSON.parse(user).value)  as any
  // console.log(decode?.userId)
  const toggle = ()  => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const [dobError, setDobError] = useState(false);
  const [panError, setPanError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blockTimestamp, setBlockTimestamp] = useState<number | null>(null);
  useEffect(() => {
    const storedAttempts = parseInt(localStorage.getItem("verificationAttempts") || "0");
    const storedBlockTimestamp = localStorage.getItem("blockTimestamp");

    setAttempts(storedAttempts);
    if (storedBlockTimestamp) {
      setBlockTimestamp(parseInt(storedBlockTimestamp));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("verificationAttempts", attempts.toString());
    if (blockTimestamp !== null) {
      localStorage.setItem("blockTimestamp", blockTimestamp.toString());
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox status
  };

  const [location, setLocation] = useState({
    latitude:0,
    longitude:0});

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success,err);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position:any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    setLocation({
        latitude,
        longitude
    });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    
  }

  function err() {
    console.log("Unable to retrieve your location");
  }

  const [addFiles,setAddFiles]=useState(false)
  const [errors, setErrors] = useState({});

  const getPanPro=()=>{
    setLoading(true);
    const panProUrl=`${API_URL}/pan-pro`
    const panBody={
        
      panNumber     :     pan    ,
      dateOfBirth     :     moment(dob).format('DD/MM/YYYY')  
    }

    if (dateOfBirth && getAge(dateOfBirth) <= 18) {
       window.alert("Check borrower age ! must be above 18 years old")
      }
      else
      {
      axiosInstance.post(panProUrl,panBody)
      .then((res: any)=>{
        setLoading(false);
        if(res?.data?.data?.user_address?.state?.length>0)
        {

          setpanProDetails(res?.data?.data)
          
        
        }
        else
        {
          fetchCKYCDetails();
          // window.alert("Invalid PAN Details or Date of Birth")
        }
        // handleStartSession(res?.data?.data)
        const headers = {
          'Authorization': `Bearer ${user}`,
          'Content-Type': 'application/json',
      };
        const data = {
          mobile: decode?.mobile,
          firstName: res?.data?.data ? res?.data?.data?.user_full_name_split[0]?.trim() : ckycData?.fullName?.split(" ")[1],
          lastName: res?.data?.data ? res?.data?.data?.user_full_name_split[2]?.trim() : ckycData?.fullName?.split(" ")[2],
          instituteName: instituteName,
          studentName: studentName,
          dateOfBirth: dob,
          courseName: courseName,
          courseFees: courseFee,
          gender: res?.data?.data ? (res?.data?.data?.user_gender === "M" ? "Male" : "Female") : (ckycData?.gender === "M" ? "Male" : "Female"),
          panId: res?.data?.data ? res?.data?.data?.pan_number : ckycData?.panNumber,
          aadhaarId: res?.data?.data ? res?.data?.data?.masked_aadhaar : ckycData?.indentityList?.find(item => item.name === "E-KYC Authentication")?.id,
          email: res?.data?.data ? res?.data?.data?.user_email || applicantEmail : ckycData?.email,
          currentAddress: res?.data?.data && res?.data?.data?.user_address?.full ? res?.data?.data?.user_address?.full : ckycData?.currentAddress,
          currentCity: res?.data?.data && res?.data?.data?.user_address?.city ? res?.data?.data?.user_address?.city : ckycData?.currentCity,
          currentState: res?.data?.data && res?.data?.data?.user_address?.state ? res?.data?.data?.user_address?.state : ckycData?.currentState,
          currentPincode: res?.data?.data && res?.data?.data?.user_address?.zip ? res?.data?.data?.user_address?.zip : ckycData?.currentPincode,
          panImage: " ",
          aadhaarFrontImage: " ",
          aadhaarBackImage: " ",
          isCoapplicant: false,
          relatedTo: " ",
          employmentType: " ",
          employerName: " ",
          salary: " ",
          incomePerMonth: " ",
          typeOfBusiness: " ",
          salesperson: " ",
          loanTenure: " ",
          ocrId: "",
          channel: 4
      };

      handleLocationClick();

      const userId = decode?.userId; // Ensure userId is available
      if (userId) {
          const data2 = {
              userId,
              latitude: location.latitude,
              longitude: location.longitude,
          };

          // New logic integration
          console.log(data)
          const mobileNumber = decode?.mobile;
          axiosInstance.get(`${API_URL}/rules/eligibility?phone=${mobileNumber}`)
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
                  console.log(qecBody)

                  axiosInstance.post(`${API_URL}/rules/create/eligibility`, qecBody)
                      .then((result) => {
                          console.log(result);

                          // Navigate to loan steps start after successful API calls
                          // setToggleConsent(false);
                          setTimeout(() => {
                              navigate("/loan-steps-start", { state: { data, data2 } });
                          }, 500);
                      })
                      .catch((err) => {
                          console.log(err);
                      });
              })
              .catch((err) => {
                  console.log(err);
              });
      }

      }
      
    )

      .catch((err: any)=>{
        setLoading(false);
        window.alert("Invalid PAN Details or Date of Birth")
        setAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= 5) {
            setBlockTimestamp(Date.now());
          }
          return newAttempts;
        });
      })
    }
  }

  const fetchCKYCDetails = () => {
    const userId = decode.userId;
    const applicationId = decode.applicationId;
  
    // Make sure userId and applicationId are available
    
    const ckycUrl=`${API_URL}/ckyc/create`
    const ckycBody={
    userId: decode?.userId,
    panNumber: pan,
    dateOfBirth: moment(dob,"YYYY-MM-DD").format("DD/MM/YYYY")
  }
    axiosInstance.post(ckycUrl,ckycBody)
    .then((res)=>{
      setCkycData(res?.data?.data)
    }
  )
  .catch((err)=>{
    alert("Error while fetching CKYC")
    setAttempts(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= 5) {
        setBlockTimestamp(Date.now());
      }
      return newAttempts;
    });
  })
  };
  
  // const [toggleConsent,setToggleConsent]=useState(false)

  //  const handleStartSession=(item : any)=>{
  //   const randomGen= Date.now().toString(36) + Math.random().toString(36).substr(2);
   
  //   (window as any). getBureauSession('708587bad0904485abe1127847dd62cd',randomGen,item.user_full_name_split[0].trim(),'',item.user_full_name_split[2].trim(),decode?.mobile).then((res :any)=>{
  //   console.log(res)
  //   setToggleConsent(true)
  //   setLink(res)
  //   }
  //   )
  // }

  const handleLoadSession = async () => {
    const result = await (window as any).startBureauSession();
    if (result) {
        switch (result.status) {
            case "SUCCESS":
                const headers = {
                    'Authorization': `Bearer ${user}`,
                    'Content-Type': 'application/json',
                };

              
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
                alert("Contact our team for assistance");
                break;
        }
    }
};

  const isBlocked = () => {
    if (blockTimestamp === null) return false;
    const elapsedTime = Date.now() - blockTimestamp;
    return elapsedTime < 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  };

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
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          {loading ? ( // Show loading screen if loading is true
            <LoginDialog />
          ) : ( // Show main content if toggleConsent is false
            <div className={styles.main}>
              <div className={styles.Header}>
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={() => {
                    navigate("/loan-steps");
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
              <img style={{ maxWidth: "90%", paddingLeft: "2rem" }} src={Progress} alt="" />
              <br />
              <LoanStepCard
                title="Basic Details"
                image={BasicDetails}
                tiime="1 min"
              />
              <br />
              <div className={styles.inputField}>
                <Label text="Date of birth" />
                <div className={styles.dateInputWrapper}>
                  <InputText
                    placeholder="Date of birth"
                    type="date"
                    value={dob}
                    changeHandler={handleDateChange}
                  />
                </div>
              </div>
              {dobError && <p style={{ color: "#d32028", fontSize: "0.8rem", paddingLeft:"1rem" }}>Date of birth is required.</p>}
              <div className={styles.inputField}>
                <Label text="PAN number" />
                <InputText
                  placeholder="EBP0000000XR"
                  type="text"
                  value={pan}
                  changeHandler={handlePanChange}
                />
              </div>
              {panError && <p style={{ color: "#d32028", fontSize: "0.8rem", paddingLeft:"1rem"}}>PAN number is required.</p>}
              <br />
              <br />
              <br />
              <br />
              {!loading&& ( // Render checkbox only when loading and toggleConsent are false
            <div
              style={{
                display: "flex",
                alignItems: "self-start",
                gap: "8px",
              }}
            >
              <label className={styles.checkboxContainer}>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span className={styles.checkmark}></span>
              </label>
              <p style={{ marginBottom: "1rem", paddingBottom: "1rem", color: "#667085", fontSize: "1.2rem" }}>
                I consent and authorize <span style={{ color: "#d32028" }}>Fee</span><span style={{ color: "black" }}>monk</span> to get a background check and a
                consumer credit report on me
              </p>
            </div>
          )}
              {isBlocked() ? (
                <p style={{ color: "red", marginTop: "1rem" ,textAlign:"center"}}>
                  You have reached the maximum number of verification attempts. Please try again in <strong>{renderRemainingTime()}</strong>.
                </p>
              ) : (
                <Button
                  onPress={getPanPro}
                  text={"Verify"}
                  imageRight={ArrowRight}
                  fullWidth
                  disabled={!isChecked || attempts >= 5 || dobError || panError}  // Disable button if attempts >= 5
                />
              )}
            </div>
          )
          }
          
        </div>
      </div>
    </>
  );
  
}

export default LoanStepsBasicDetails;
