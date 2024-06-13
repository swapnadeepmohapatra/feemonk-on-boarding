import React, { useState,useEffect } from "react";
// import "semantic-ui-css/components/dropdown.min.css";
// import Select from 'react-select';
import styles from "./index.module.css";
import Progress from "../../images/static_assests/progress_90.svg";
// import Progress from "../../images/static_assests/process.svg";
// import Course1 from "../../images/static_assests/course1.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import ParentTab from "../../images/static_assests/parent_tab.svg";
import CoAppTab from "../../images/static_assests/co_app_icon.svg";
import StudentTab from "../../images/static_assests/student_icon.svg";
import Button from "../../components/atoms/Button";
import CourseDetails from "../../images/icons/course_details.svg";
import maximize from "../../images/icons/maximize.svg";
import minimize from "../../images/icons/minimize.svg";
import program_details from "../../images/static_assests/program_details.svg";
import ArrowRight from "../../images/icons/arrow_right.svg";
import institute_payment_detials from "../../images/static_assests/institute_payment_detials.svg";
import school_payment_detials from "../../images/static_assests/institute_payment_detials.svg";
import tick_mark from "../../images/static_assests/tick_mark.svg";
import child_details from "../../images/static_assests/child_details.svg"
import axios from "axios";
import parents_icon from "../../images/static_assests/parents_icon.svg"
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import { useNavigate ,useLocation} from "react-router-dom";
import { relative } from "path";
import axiosInstance from '../../helpers/axios';import {jwtDecode} from 'jwt-decode';
import { API_URL } from "../../utils";

import closee from "../../images/static_assests/redClose.svg";

import { Dropdown } from 'semantic-ui-react';
import { Autocomplete, TextField } from "@mui/material";


type SchoolOption = {
  key: string;
  value: string;
  text: string;
};

function LoanStepsCourseDetails() {

  const [active, setActive] = useState<"PARENT" | "STUDENT" | "COAPP">("PARENT");
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(""); // Initialize selectedClass state

  const [isChildDetailsFilled, setIsChildDetailsFilled] = useState(false);
  const [isChildDetailsMinimized, setIsChildDetailsMinimized] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(true);
  const location = useLocation();
  const stateData = location.state.data || {};
  console.log(stateData)

  const  data  = stateData;

  const [studentName, setStudentName] = useState("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [className, setClassName] = useState("");
  const [annualFees, setAnnualFees] = useState("");
  const [dob, setDob] = useState("");
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };
  const [errors, setErrors] = useState({
    studentName: "",
    schoolName: "",
    courseName: "",
    annualFees: "",
  });
  
  useEffect(() => {
    const isFormValid =
      studentName.trim() !== "" &&
      schoolName.trim() !== "" &&
      className.trim() !== "" &&
      annualFees.trim() !== "";

    setIsChildDetailsFilled(isFormValid);
  }, [studentName, schoolName, className, annualFees]);

  useEffect(() => {
    handleLocationClick();
  }, []);
  const [isStudentNameValid, setIsStudentNameValid] = useState(true);
  const [isSchoolNameValid, setIsSchoolNameValid] = useState(true);
  const [isClassNameValid, setIsClassNameValid] = useState(true);
  const [isAnnualFeesValid, setIsAnnualFeesValid] = useState(true);
  const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveChildDetails = () => {
    let validationErrors = {
      studentName: "",
      schoolName: "",
      courseName: "",
      annualFees: "",
    };
  
    if (!studentName) validationErrors.studentName = "Student name is required";
    if (!schoolName) validationErrors.schoolName = "School/Institute name is required";
    if (!className) validationErrors.courseName = "Class/Course name is required";
    if (!annualFees) validationErrors.annualFees = "Total annual fees is required";
  
    setErrors(validationErrors);
  
    if (!Object.values(validationErrors).some(error => error !== "")) {
      setIsChildDetailsMinimized(true);
      setIsChildDetailsFilled(true);
    } else {
      setIsChildDetailsMinimized(false); // Show the fields if any error exists
      setIsChildDetailsFilled(false);
    }
  };
  
  const handleInputChange = async (field: any, value: any) => {
  setErrors((prevErrors) => ({
    ...prevErrors,
    [field]: "",
  }));

  switch (field) {
    case 'studentName':
      setStudentName(value);
      break;
    case 'schoolName':
      setSchoolName(value);
      // if (value.length > 4) {
      //   setIsLoading(true);
      //   try {
      //     const response = await axiosInstance.get(`${API_URL}/institute/info/name`, { params: { name: value } });
      //     if (response.data.message === "Successful") {
      //       const options: SchoolOption[] = response.data.data.map((school: any) => ({
      //         key: school.id,
      //         value: school.brandName,
      //         text: school.brandName,
      //       }));
      //       // Combine fetched options with user input as an option
      //       const allOptions: SchoolOption[] = [...options, { key: value, value, text: value }];
      //       setSchoolOptions(allOptions);
      //     } else {
      //       console.error("Failed to fetch school options:", response.data.message);
      //     }
      //   } catch (error) {
      //     console.error("Error fetching school options:", error);
      //     // If no response, treat user input as an option
      //     setSchoolOptions([{ key: value, value, text: value }]);
      //   }
      // };
      break;
    case 'courseName':
      setClassName(value);
      break;
    case 'annualFees':
      setAnnualFees(value);
      break;
    default:
      break;
  }
};

  
  const isContinueDisabled= !(studentName && schoolName && className && annualFees);
  const user=sessionStorage.getItem('auth_token') || ""
  const decode=jwtDecode(JSON.parse(user).value)  as any
  const headerVal= JSON.parse(user).value
  console.log(headerVal)
  const [toggleConsent,setToggleConsent]=useState(false)
  const [consentLink, setLink] = useState("");
  const [open, setOpen] = useState(false);

  const toggle = ()  => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleStartSession=(item : any)=>{
    console.log(item)
   const randomGen= Date.now().toString(36) + Math.random().toString(36).substr(2);
  
   (window as any). getBureauSession('708587bad0904485abe1127847dd62cd',randomGen,item.firstName,'',item.lastName,decode?.mobile).then((res :any)=>{
   console.log(res)
   setToggleConsent(true)
   setLink(res)
   }
   )
 }


 const [location1, setLocation] = useState({
  latitude:0,
  longitude:0});

function handleLocationClick() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success,err);
  } else {
    console.log("Geolocation not supported");
  }
}
console.log(data)
function success(position:any) {
  console.log("got location")
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

  const handleLoadSession = async () => {
    const result = await (window as any).startBureauSession();
    if (result) {
        switch (result.status) {
            case "SUCCESS":
                const headers = {
                    'Authorization': `Bearer ${user}`,
                    'Content-Type': 'application/json',
                };

                const data1 = data

                // handleLocationClick();
                
                navigate("/bank-select", { state: { data1} });
                
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
  const createLoanApplication = () => {
    // const headerVal = sessionStorage.getItem('auth_token') || "";
    const requestBody = {
        userId: decode?.userId,
        courseFees: parseInt(annualFees), 
        instituteName: schoolName,
        courseName: className, 
        isCoapplicant: false, 
    };

    axiosInstance
        .post(`${API_URL}/application/create`, requestBody, {
            headers: {
                'Authorization': `Bearer ${headerVal}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log("Application created successfully:", response.data);
            // Redirect the user to the next page, if needed
            handleLocationClick()
    const userId = decode?.userId; // Ensure userId is available
    if (userId) {
        const data2 = {
            // userId,
            latitude: location1.latitude,
            longitude: location1.longitude,
        };

        // Make API call to submit data
        axios.post(`${API_URL}/end-user/submit`, data2, {
            headers: {
                'Authorization': `Bearer ${headerVal}`,
                'Content-Type': 'application/json',
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
            handleStartSession(data)
        })
        .catch((error) => {
            console.error("Error creating application:", error);
            // Optionally, display an error message to the user
        });
};


  const handleContinueClick = () => {
    

    // Call createLoanApplication when Continue button is clicked
    createLoanApplication();
    // handleStartSession(data);
};

  // const [schoolName, setSchoolName] = useState<string>("");
  // const [schoolOptions, setSchoolOptions] = useState<SchoolOption[]>([]);

  const handleSchoolNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSchoolName(value);
    if (value.length >= 5) {
      try {
        const response = await axiosInstance.get(`${API_URL}/institute/info/name`, { params: { name: value } });
        if (response.data.message === "Successful") {
          const options: SchoolOption[] = response.data.data.map((school: any) => ({
            key: school.id,
            value: school.brandName,
            text: school.brandName,
          }));
          setSchoolOptions(options);
        } else {
          console.error("Failed to fetch school options:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching school options:", error);
      }
    } else {
      setSchoolOptions([]);
    }
  };
  


  return (
    <div className={styles.body}>
      <div className={styles.container}>
      {toggleConsent ? (
          <div style={{ display: "flex", flexDirection: "column", paddingTop: "1rem", paddingBottom: "1rem", justifyContent: "center", alignItems: "center", marginTop: "4rem" }}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ paddingTop: "0.5rem", fontWeight: "bold", fontSize: "1.3rem" }}>Consent:</p>
                <img src={closee} style={{ width: '2rem', cursor: 'pointer', paddingBottom: "0.5rem" }} onClick={() => setToggleConsent(!toggleConsent)} />
              </div>
              <div>
                <iframe style={{ top: '0' }} width="350" height="600" src={consentLink} onLoad={handleLoadSession}></iframe>
              </div>
            </div>
          </div>
        ) : (
          <>
        <div className={styles.main}>
        <div className={styles.Header}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => {
                navigate("/loan-steps-income-details");
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
          <img style={{maxWidth: "90%", paddingLeft: "2rem"}}src={Progress} alt="" />
          <br />
          <LoanStepCard
            // description="Permanent Address & Current Location"
            title="Course details"
            image={CourseDetails}
            tiime="3 min"
          />
          <br />
          


          <br />
          { (
  <>
    {/* My Child Details Section */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem",
        background: "#FFF7F2",
        border: "1px solid #F9D8D6",
        borderRadius: isChildDetailsMinimized ? "12px" : "12px 12px 0px 0px",
        transition: "border-radius 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          style={{ height: "2.2rem", marginRight: "1.2rem",paddingLeft:"0.4rem" }}
          src={child_details}
          alt=""
        />
        <strong style={{ fontSize: "1.2rem" }}>Student details</strong>
      </div>
      {isChildDetailsFilled && (
        <img
          style={{ height: "1.5rem" }}
          src={tick_mark}
          alt="Details filled"
        />
      
      )}
      
    </div>
    {/* My Child Details Input Section */}
    <div
      
    >
      { (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            border: "1px solid #F9D8D6",
            background: "#FFFCFA",
            padding: "1rem",
            boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
            borderRadius: "0px 0px 12px 12px",
          }}
        >
              <Label text="Student name" />
                <InputText
                  square
                  placeholder="Student name"
                  value={studentName}
                  changeHandler={(e) => handleInputChange('studentName', e.target.value)}
                />
                {errors.studentName && <span style={{ color: "red" }}>{errors.studentName}</span>}
                
                <Label text="School / Institute name" />
                <InputText
                  square
                  placeholder="Enter School / Institute name"
                  value={schoolName}
                  changeHandler={handleSchoolNameChange}
                />
                {schoolOptions.length > 0 && (
        <Autocomplete
        options={schoolOptions}
        
        getOptionLabel={(option) => option.value} // Ensure this returns a string
        value={schoolOptions.find(option => option.value === schoolName) || null}
        onChange={(e, newValue) => {
          if (newValue) {
            const selectedOption = newValue as SchoolOption;
            handleInputChange("schoolName", selectedOption.value);
            setDropdownOpen(false);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select School/Institute"
            variant="outlined"
          />
        )}
      />
      
      
      )}
                {errors.schoolName && <span style={{ color: "red" }}>{errors.schoolName}</span>}
                
                <Label text="Class / Course" />
                <InputText
                  square
                  placeholder="Enter Class / Course name"
                  value={className}
                  changeHandler={(e) => handleInputChange('courseName', e.target.value)}
                />
                {errors.courseName && <span style={{ color: "red" }}>{errors.courseName}</span>}
                
                <Label text="Total annual fees" />
                <InputText
                  square
                  placeholder="₹"
                  value={annualFees}
                  changeHandler={(e) => handleInputChange('annualFees', e.target.value)}
                />
                {errors.annualFees && <span style={{ color: "red" }}>{errors.annualFees}</span>}
                <Button onPress={handleSaveChildDetails} text={"Save"} fullWidth secondary />
        </div>
      )}
    </div>
    <br />
    <br />
    
    
  </>
)}


              
            
          
              <br />
              <br />
    
          
          <>
           
          </>
          <br />
          <Button
            onPress={() => {
              // navigate("/bank-select"); // Navigate to "/bank-select" page
              handleContinueClick(); // Call handleContinueClick function
            }}
            text={"Continue"}
            imageRight={ArrowRight}
            fullWidth
            disabled={isContinueDisabled}
          /> 
          

        </div>
        </>
        )}
      </div>
    </div>
  );
}

export default LoanStepsCourseDetails;
