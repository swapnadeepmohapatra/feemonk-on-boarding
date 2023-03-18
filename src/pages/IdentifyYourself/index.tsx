import React from "react";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import ParentsIcons from "../../images/static_assests/parents_icon.svg";
import StudentIcons from "../../images/static_assests/student_icon.svg";
import CoAppIcons from "../../images/static_assests/co_app_icon.svg";
import IdentityCard from "../../components/molecules/IdentifyCard";

function IdentifyYourself() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.main}>
          <img
            src="main_logo.png"
            alt=""
            style={{
              width: "10rem",
              marginBottom: "2rem",
            }}
          />
          <h1>Identify Yourself!</h1>
          <br />
          <IdentityCard
            text={
              "I am a parent & I am here to apply for my child's education loan"
            }
            image={ParentsIcons}
          />
          <IdentityCard
            text={
              "I am the student & I am looking for loan to support my education"
            }
            image={StudentIcons}
          />
          <IdentityCard
            text={"I am a Co-applicant & I am here to support my friend"}
            image={CoAppIcons}
          />
          <br />
          <Button
            text={"Aright, let’s start"}
            onPress={() => {}}
            imageRight={ArrowRight}
          />
        </div>
      </div>
    </div>
  );
}

export default IdentifyYourself;
