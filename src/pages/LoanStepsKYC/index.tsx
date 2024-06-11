import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/process.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import KYC from "../../images/static_assests/kyc.svg";
import home from "../../images/static_assests/home.svg";
import InputText from "../../components/atoms/InputText";
import Button from "../../components/atoms/Button";
import ArrowRight from "../../images/icons/arrow_right.svg";
import maximize from "../../images/icons/maximize.svg";
import minimize from "../../images/icons/minimize.svg";
import BackArrow from "../../images/icons/arrow-left-circle.svg";
import tick_mark from "../../images/static_assests/tick_mark.svg";
import { API_URL } from "../../utils";
import {jwtDecode} from 'jwt-decode';


function LoanStepsKYC() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state || {};
  const { data } = stateData;
  const user=sessionStorage.getItem('auth_token') || ""
  const headerVal= JSON.parse(user).value
  const [currentAddress, setCurrentAddress] = useState("yes");

  const [doorNo, setDoorNo] = useState(data?.currentAddress?.doorNo || "");
  const [street, setStreet] = useState(data?.currentAddress?.street || "");
  const [city, setCity] = useState(data?.currentCity || "");
  const [state, setState] = useState(data?.currentState || "");
  const [pincode, setPincode] = useState(data?.currentPincode || "");
  const [isAddressFilled, setIsAddressFilled] = useState(false);
  const [isAddressMinimized, setIsAddressMinimized] = useState(false);
  const [doorNoError, setDoorNoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
    

  const toggleAddressDetails = () => {
    setIsAddressMinimized(!isAddressMinimized);
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = () => {
    const isValid = doorNo && street && city && state && pincode;
    setIsFormValid(isValid);
  };

  const handleAddress = async () => {
    let isValid = true;
  
    if (!doorNo) {
      setDoorNoError("Door No. is required");
      isValid = false;
    } else {
      setDoorNoError("");
    }
  
    if (!street) {
      setStreetError("Street / Landmark is required");
      isValid = false;
    } else {
      setStreetError("");
    }
  
    if (!city) {
      setCityError("City is required");
      isValid = false;
    } else {
      setCityError("");
    }
  
    if (!state) {
      setStateError("State is required");
      isValid = false;
    } else {
      setStateError("");
    }
  
    if (!pincode) {
      setPincodeError("Pincode is required");
      isValid = false;
    } else {
      setPincodeError("");
    }
  
    if (!isValid) {
      return;
    }
  
    const requestData = {
      currentAddress: doorNo,
      currentCity: city,
      currentState: state,
      currentPincode: pincode,
    };
  
    try {
      const response = await fetch(`${API_URL}/users/profile-details/create`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${headerVal}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      // console.log("Profile details updated:", result);
      setIsAddressFilled(true);
      setIsAddressMinimized(true);
    } catch (error) {
      // console.error("Failed to update profile details:", error);
    }
  };
  

  useEffect(() => {
    if (data) {
      // Set other state values from data
      setDoorNo(data?.currentAddress?.doorNo || "");
      setStreet(data?.currentAddress?.street || "");
      setCity(data?.currentCity || "");
      setState(data?.currentState || "");
      setPincode(data?.currentPincode || "");
  
      // Prefill address if available
      if (data.currentAddress) {
        setCurrentAddress("yes"); // Assuming the address is the current address
      }
    }
  }, [data]);
  console.log(data)

  useEffect(() => {
    validateForm();
  }, [doorNo, street, city, state, pincode]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };
    
    // console.log(data)

  return (
    <div className={styles.body}>
      <div className={styles.container}>
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
          <img style={{maxWidth: "90%", paddingLeft: "2rem"}} src={Progress} alt="" />
          <br />
          <br />
          <LoanStepCard
            // description="Permanent Address & Current Location"
            title="KYC"
            image={KYC}
            tiime="2 min"
          />
          <br />
          <div>
            <div
              style={{
                padding: "1rem",
                background: "#FFF7F2",
                border: "1px solid #F9D8D6",
                borderRadius:"12px",
              }}
            >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <img
      style={{ height: "2.2rem", marginRight: "0.5rem" }}
      src={home}
      alt=""
    />
    <div>
      <strong style={{ fontSize: "1.2rem" }}>Permanent Address</strong>
      {/* <p style={{ color: "#525252", fontSize: "0.9rem" }}>Your institute is already registered with us, and we have their bank details</p> */}
    </div>
  </div>
  {isAddressFilled && (
    <img
      style={{ height: "1.5rem" }}
      src={tick_mark}
      alt="Details filled"
    />
  ) }
</div>

            </div>
            <div style={{
      overflow: "hidden",
      transition: "max-height 0.3s ease",
      maxHeight: isAddressMinimized ? "0" : "1000px",
    }}>
            {!isAddressMinimized && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                border: "1px solid #F9D8D6",
                background: "#FFFCFA",
                padding: "1rem",
                boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                borderRadius:  "0px 0px 12px 12px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#D32028",
                    fontSize: "1.2rem",
                  }}
                >
                  Note
                </p>
                <p>
                  The following address details are obtained from your e-kyc,
                  please feel free to edit in case of changes
                </p>
              </div>
                  <InputText
                    square
                    placeholder="Door No."
                    value={doorNo}
                    changeHandler={(e) => {
                      setDoorNo(e.target.value);
                      validateForm();
                    }}
                  />
                  {doorNoError && <p className={styles.error}>{doorNoError}</p>}

                  <InputText
                    square
                    placeholder="Street / Landmark"
                    value={street}
                    changeHandler={(e) => {
                      setStreet(e.target.value);
                      validateForm();
                    }}
                  />
                  {streetError && <p className={styles.error}>{streetError}</p>}

                  <InputText
                    square
                    placeholder="City"
                    value={city}
                    changeHandler={(e) => {
                      setCity(e.target.value);
                      validateForm();
                    }}
                  />
                  {cityError && <p className={styles.error}>{cityError}</p>}

                  <InputText
                    square
                    placeholder="State"
                    value={state}
                    changeHandler={(e) => {
                      setState(e.target.value);
                      validateForm();
                    }}
                  />
                  {stateError && <p className={styles.error}>{stateError}</p>}

                  <InputText
                    square
                    placeholder="Pincode"
                    value={pincode}
                    changeHandler={(e) => {
                      setPincode(e.target.value);
                      validateForm();
                    }}
                  />
                  {pincodeError && <p className={styles.error}>{pincodeError}</p>}


              <Button
                onPress={handleAddress}
                text={"Save"}
                fullWidth={false}
                secondary
              />
              <br />
            </div>
          )}</div>
          </div>
          <br />
          <br />
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid #F9D8D6",
              background: "#FFFCFA",
              padding: "1rem",
              boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
              borderRadius: "12px",
            }}
          >
            <strong>Is this your current address?</strong>
            <div className={styles.inputField}>
              <div
                onChange={(event) =>
                  setCurrentAddress((event.target as HTMLInputElement).value)
                }
                defaultValue="yes"
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div>
                  <input
                    type="radio"
                    value="yes"
                    name="yes"
                    checked={currentAddress === "yes"}
                  />{" "}
                  Yes
                </div>
                <div>
                  <input
                    type="radio"
                    value="no"
                    name="student"
                    checked={currentAddress === "no"}
                  />{" "}
                  No
                </div>
              </div>
              {currentAddress === "no" && (
                <div>
                  <br />
                  <div
                    style={{
                      border: "0.5px solid rgba(181, 181, 181, 0.3)",
                    }}
                  ></div>
                  <br />
                  <p>Current Address</p>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >                  <InputText
                  square
                  placeholder="Door No."
                  value={doorNo}
                  changeHandler={(e) => {
                    setDoorNo(e.target.value);
                    validateForm();
                  }}
                />
                {doorNoError && <p className={styles.error}>{doorNoError}</p>}

                <InputText
                  square
                  placeholder="Street / Landmark"
                  value={street}
                  changeHandler={(e) => {
                    setStreet(e.target.value);
                    validateForm();
                  }}
                />
                {streetError && <p className={styles.error}>{streetError}</p>}

                <InputText
                  square
                  placeholder="City"
                  value={city}
                  changeHandler={(e) => {
                    setCity(e.target.value);
                    validateForm();
                  }}
                />
                {cityError && <p className={styles.error}>{cityError}</p>}

                <InputText
                  square
                  placeholder="State"
                  value={state}
                  changeHandler={(e) => {
                    setState(e.target.value);
                    validateForm();
                  }}
                />
                {stateError && <p className={styles.error}>{stateError}</p>}

                <InputText
                  square
                  placeholder="Pincode"
                  value={pincode}
                  changeHandler={(e) => {
                    setPincode(e.target.value);
                    validateForm();
                  }}
                />
                {pincodeError && <p className={styles.error}>{pincodeError}</p>}


                  </div>
                </div>
              )}
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <Button
              text="Save & Next"
              onPress={() => {
                navigate("/loan-steps-income-details", { state: { data } });
              }}
              fullWidth
              imageRight={ArrowRight}
              disabled={!isFormValid} // Disable the button if the form is invalid
            />

        </div>)
      </div>
    </div>
  );
}

export default LoanStepsKYC;
