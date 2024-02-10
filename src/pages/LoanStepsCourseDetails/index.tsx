import React, { useState } from "react";
import styles from "./index.module.css";
import Progress from "../../images/static_assests/progress_90.svg";
// import Course1 from "../../images/static_assests/course1.svg";
import ParentTab from "../../images/static_assests/parent_tab.svg";
import CoAppTab from "../../images/static_assests/co_applicant_tab.svg";
import StudentTab from "../../images/static_assests/student_tab.svg";
import Button from "../../components/atoms/Button";
import CourseDetails from "../../images/static_assests/course_details.svg";
import LoanStepCard from "../LoanSteps/components/Card";
import InputText from "../../components/atoms/InputText";
import Label from "../../components/atoms/Label";
import { useNavigate } from "react-router-dom";

function LoanStepsCourseDetails() {
  // const [active, setActive] = useState<"PARENT" | "STUDENT" | "COAPP">(
  //   "PARENT"
  // );

  const navigate = useNavigate();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <img src={Progress} alt="" />
          <br />
          <LoanStepCard
            // description="Permanent Address & Current Location"
            title="Course details"
            image={CourseDetails}
          />
          <br />
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <img
              style={{
                width: "100%",
                border: active === "PARENT" ? "2px solid #D32028" : "",
                borderRadius: active === "PARENT" ? "1rem" : "",
              }}
              src={ParentTab}
              alt="ParentTab"
              onClick={() => {
                setActive("PARENT");
              }}
            />
            <img
              style={{
                width: "100%",
                border: active === "STUDENT" ? "2px solid #D32028" : "",
                borderRadius: active === "STUDENT" ? "1rem" : "",
              }}
              src={StudentTab}
              alt="StudentTab"
              onClick={() => {
                setActive("STUDENT");
              }}
            />
            <img
              style={{
                width: "100%",
                border: active === "COAPP" ? "2px solid #D32028" : "",
                borderRadius: active === "COAPP" ? "1rem" : "",
              }}
              src={CoAppTab}
              alt="CoAppTab"
              onClick={() => {
                setActive("COAPP");
              }}
            />
          </div> */}
          <br />
          {/* {active === "PARENT" && (
            <>
              <div
                style={{
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: "12px 12px 0px 0px",
                }}
              >
                <p>
                  <strong
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    My child details
                  </strong>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  gap: "1rem",
                  border: "1px solid #F9D8D6",
                  background: "#FFFCFA",
                  padding: "1rem",
                  boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                  borderRadius: "0px 0px 12px 12px",
                }}
              >
                <Label text="Full name" />
                <InputText square placeholder="Full name" />
                <Label text="Date of Birth" />
                <InputText square placeholder="Date of Birth" />
                <Label text="Class/Standard" />
                <InputText square placeholder="Class" />
                <Label text="School name" />
                <InputText square placeholder="Enter School name" />
                <Label text="Total annual fee" />
                <InputText square placeholder="Total annual fee" />
                <Button onPress={() => {}} text={"Save"} fullWidth secondary />
              </div>
              <br />
              <br />
              <div
                style={{
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: "12px 12px 0px 0px",
                }}
              >
                <p>
                  <strong
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    My child details
                  </strong>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  gap: "1rem",
                  border: "1px solid #F9D8D6",
                  background: "#FFFCFA",
                  padding: "1rem",
                  boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                  borderRadius: "0px 0px 12px 12px",
                }}
              >
                <Label text="Account number" />
                <InputText square placeholder="Enter Account number" />
                <Label text="IFSC code" />
                <InputText square placeholder="Enter IFSC code" />
                <Label text="Bank name" />
                <InputText square placeholder="Enter Bank name" />
                <Button onPress={() => {}} text={"Save"} fullWidth secondary />
              </div>
            </>
          )}

          {active === "STUDENT" && (
            <>
              <div
                style={{
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: "12px 12px 0px 0px",
                }}
              >
                <p>
                  <strong
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    Program details
                  </strong>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  gap: "1rem",
                  border: "1px solid #F9D8D6",
                  background: "#FFFCFA",
                  padding: "1rem",
                  boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                  borderRadius: "0px 0px 12px 12px",
                }}
              >
                <Label text="Program name" />
                <InputText square placeholder="Program name" />
                <Label text="Total program fee" />
                <InputText square placeholder="Total program fee" />
                <Label text="School / College name" />
                <InputText square placeholder="Enter School / College name" />
                <Button onPress={() => {}} text={"Save"} fullWidth secondary />
              </div>
              <br />
              <br />
              <div
                style={{
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: "12px 12px 0px 0px",
                }}
              >
                <p>
                  <strong
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    Institute payment details
                  </strong>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  gap: "1rem",
                  border: "1px solid #F9D8D6",
                  background: "#FFFCFA",
                  padding: "1rem",
                  boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                  borderRadius: "0px 0px 12px 12px",
                }}
              >
                <Label text="Account number" />
                <InputText square placeholder="Enter Account number" />
                <Label text="IFSC code" />
                <InputText square placeholder="Enter IFSC code" />
                <Label text="Bank name" />
                <InputText square placeholder="Enter Bank name" />
                <Button onPress={() => {}} text={"Save"} fullWidth secondary />
              </div>
            </>
          )}

          {active === "COAPP" && (
            <>
              <div
                style={{
                  padding: "1rem",
                  background: "#FFF7F2",
                  border: "1px solid #F9D8D6",
                  borderRadius: "12px 12px 0px 0px",
                }}
              >
                <p>
                  <strong
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    Beneficiary details
                  </strong>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  gap: "1rem",
                  border: "1px solid #F9D8D6",
                  background: "#FFFCFA",
                  padding: "1rem",
                  boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                  borderRadius: "0px 0px 12px 12px",
                }}
              ></div>
              <br />
            </>
          )} */}
          <>
            <div
              style={{
                padding: "1rem",
                background: "#FFF7F2",
                border: "1px solid #F9D8D6",
                borderRadius: "12px 12px 0px 0px",
              }}
            >
              <p>
                <strong
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  Program details
                </strong>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                gap: "1rem",
                border: "1px solid #F9D8D6",
                background: "#FFFCFA",
                padding: "1rem",
                boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                borderRadius: "0px 0px 12px 12px",
              }}
            >
              <Label text="Student name" />
              <InputText square placeholder="Student name" />
              <Label text="School / College name" />
              <InputText square placeholder="Enter School / College name" />
              <Label text="Total program fee" />
              <InputText square placeholder="Total program fee" />
              {/* <Button onPress={() => {}} text={"Save"} fullWidth secondary /> */}
            </div>
            <br />
            <br />
            <div
              style={{
                padding: "1rem",
                background: "#FFF7F2",
                border: "1px solid #F9D8D6",
                borderRadius: "12px 12px 0px 0px",
              }}
            >
              <p>
                <strong
                  style={{
                    fontSize: "1.2rem",
                  }}
                >
                  Institute payment details
                </strong>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                gap: "1rem",
                border: "1px solid #F9D8D6",
                background: "#FFFCFA",
                padding: "1rem",
                boxShadow: "0px 3px 3px rgba(211, 32, 40, 0.1)",
                borderRadius: "0px 0px 12px 12px",
              }}
            >
              <Label text="Account number" />
              <InputText square placeholder="Enter Account number" />
              <Label text="IFSC code" />
              <InputText square placeholder="Enter IFSC code" />
              {/* <Label text="Bank name" />
                <InputText square placeholder="Enter Bank name" /> */}
              {/* <Button onPress={() => {}} text={"Save"} fullWidth secondary /> */}
            </div>
          </>
          <br />
          <Button
            onPress={() => {
              navigate("/parking-page");
            }}
            text={"Get loan offer"}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

export default LoanStepsCourseDetails;
