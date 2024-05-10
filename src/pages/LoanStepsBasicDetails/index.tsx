import React, { useState } from "react";
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
  
  const [consentLink, setLink] = useState("");
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
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


  const data = {
    mobile: decode?.mobile,
    firstName: (panProDetails && panProDetails.user_full_name_split && panProDetails.user_full_name_split[0]) ? panProDetails.user_full_name_split[0].trim() : (ckycData?.fullName?.split(" ")[0] || ""),
    lastName: (panProDetails && panProDetails.user_full_name_split && panProDetails.user_full_name_split[2]) ? panProDetails.user_full_name_split[2].trim() : (ckycData?.fullName?.split(" ")[1] || ""),
    instituteName: "", // Assuming instituteName is initialized elsewhere
    studentName: "", // Assuming studentName is initialized elsewhere
    dateOfBirth: dob, // Assuming dob is initialized elsewhere
    courseName: "", // Assuming courseName is initialized elsewhere
    courseFees: "", // Assuming courseFees is initialized elsewhere
    gender: (panProDetails?.user_gender === "M" ? "Male" : "Female") || (ckycData?.gender === "M" ? "Male" : "Female"),
    panId: panProDetails?.pan_number || ckycData?.panNumber || "",
    aadhaarId: panProDetails?.masked_aadhaar || (ckycData?.indentityList?.find(item => item.name === "E-KYC Authentication")?.id || ""),
    email: panProDetails?.user_email || ckycData?.email || "",
    currentAddress: panProDetails?.user_address?.full || ckycData?.currentAddress || "",
    currentCity: panProDetails?.user_address?.city || ckycData?.currentCity || "",
    currentState: panProDetails?.user_address?.state || ckycData?.currentState || "",
    currentPincode: panProDetails?.user_address?.zip || ckycData?.currentPincode || "",
    // Add other properties as needed
};

// Use 'data' object as needed in your code


// Use 'data' object as needed in your code


// Use 'data' object as needed in your code

// Use 'data' object as needed in your code

  
  // const [panProDetails,setPanProDetails]=useState({})
  const [addFiles,setAddFiles]=useState(false)

 
  //       .then((result) => {
  //         console.log(result);
  //         navigate("/loan-steps-course-details");
  //       })


// Use 'data' object as needed in your code


  const getPanPro=()=>{
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
        
        if(res?.data?.data?.user_address?.full?.length>0)
        {

          setpanProDetails(res?.data?.data)
          
        
        }
        else
        {
          fetchCKYCDetails();
          // window.alert("Invalid PAN Details or Date of Birth")
        }
        handleStartSession(res?.data?.data)


      }
      
    )

      .catch((err: any)=>{
        window.alert("Invalid PAN Details or Date of Birth")
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
  })
  };
  
  const [toggleConsent,setToggleConsent]=useState(false)

   const handleStartSession=(item : any)=>{
    const randomGen= Date.now().toString(36) + Math.random().toString(36).substr(2);
   
    (window as any). getBureauSession('708587bad0904485abe1127847dd62cd',randomGen,item.user_full_name_split[0].trim(),'',item.user_full_name_split[2].trim(),decode?.mobile).then((res :any)=>{
    console.log(res)
    setToggleConsent(true)
    setLink(res)
    }
    )
  }

  const handleLoadSession=async()=>{
    const result=await (window as any).startBureauSession()
    if(result)
    {
      switch(result.status)
      {
        case "SUCCESS": const headers = {
                        'Authorization': `Bearer ${user}`,
                        'Content-Type': 'application/json',
                      };
                      
                      
                      const data = {
                        mobile: decode?.mobile,
                        firstName: panProDetails ? panProDetails?.user_full_name_split[0]?.trim() : ckycData?.fullName?.split(" ")[1],
                        lastName: panProDetails ? panProDetails?.user_full_name_split[2]?.trim() : ckycData?.fullName?.split(" ")[2],
                        instituteName: instituteName,
                        studentName: studentName,
                        dateOfBirth: dob,
                        courseName: courseName,
                        courseFees: courseFee,
                        gender: panProDetails ? (panProDetails?.user_gender === "M" ? "Male" : "Female") : (ckycData?.gender === "M" ? "Male" : "Female"),
                        panId: panProDetails ? panProDetails?.pan_number : ckycData?.panNumber,
                        aadhaarId: panProDetails ? panProDetails?.masked_aadhaar : ckycData?.indentityList?.find(item => item.name === "E-KYC Authentication")?.id,
                        email: panProDetails ? panProDetails?.user_email || applicantEmail : ckycData?.email,
                        currentAddress: panProDetails && panProDetails?.user_address?.full ? panProDetails?.user_address?.full : ckycData?.currentAddress,
                        currentCity: panProDetails && panProDetails?.user_address?.city ? panProDetails?.user_address?.city : ckycData?.currentCity,
                        currentState: panProDetails && panProDetails?.user_address?.state ? panProDetails?.user_address?.state : ckycData?.currentState,
                        currentPincode: panProDetails && panProDetails?.user_address?.zip ? panProDetails?.user_address?.zip : ckycData?.currentPincode,
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
                      handleLocationClick()
                       axiosInstance.post(`${API_URL}/summary/create`, data, { headers })
                      .then((response) => {

                        const userId = response.data.data;
                        
                        
                        if (userId) {
                          const data2 = { userId,
                          latitude : location.latitude,
                        longitude : location.longitude, };
                    
                          
                          axiosInstance.post(`${API_URL}/end-user/submit`, data2, { headers })
                            .then(() => {
                              setToggleConsent(false)
                              setTimeout(() => {
                                window.location.reload()
                              }, 1000);
                            })
                            .catch((error) => console.log("error", error));
                        }
                      })
                      .catch((error) => console.log("error", error));
       
                      break;
        case "EXIT":
                    alert("Retry Submit");
                    toggle();
                    break;
        case "ERROR":
                    alert("Error Please Try Later");
                    toggle();
                    break;
        default:alert("Contact our team for assistance");
                break;
      }
    }
  }


  
  
  return (
    <>
    
    <div className={styles.body}>
     
      <div className={styles.container}>
      
      { !toggleConsent? <div className={styles.main}>
         
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

          <div className={styles.inputField}>
            <Label text="PAN number" />
            <InputText
              placeholder="EBP0000000XR"
              type="text"
              value={pan}
              changeHandler={handlePanChange}
            />
          </div>
          <br />
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
          <br />
          <br />
          <br />
          <br />
          
          <Button
            onPress={getPanPro} // Call getPanPro function on button click
            text={"Verify"}
            imageRight={ArrowRight}
            fullWidth
            disabled={!isChecked} // Disable button if checkbox is not checked
          />
        </div>: <div style={{display:"flex",flexDirection:"column",paddingTop:"1rem",paddingBottom:"1rem",justifyContent:"center",alignItems:"center",marginTop:"4rem"}}>
    <div >
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <p style={{paddingTop:"0.5rem",fontWeight:"bold",fontSize:"1.3rem"}}>Consent:</p>
         <img src={closee}style={{width:'2rem',cursor:'pointer',paddingBottom:"0.5rem"}} onClick={()=>setToggleConsent(!toggleConsent)}/></div>
        <div>
        <iframe style={{top:'0'}} width="350" height="600" src={consentLink} onLoad={handleLoadSession} title="bureau"> </iframe> 
        </div>
        {/* <ModalFooter>
          <button color="primary" onClick={()=>toggle()}>
            Do Something
          </button>{' '}
          <button color="secondary" onClick={()=>toggle()}>
            Cancel
          </button>
        </ModalFooter> */}
      
      </div>
    </div>}

      </div>
    </div>
   
    </>
  );
}

export default LoanStepsBasicDetails;
