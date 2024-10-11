import React, { useState } from "react";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import ParentsIcons from "../../images/static_assests/parents_icon.svg";
import StudentIcons from "../../images/static_assests/student_icon.svg";
import IdentityCard from "../../components/molecules/IdentifyCard";
import { useNavigate, useLocation } from "react-router-dom";

type CardType = "parent" | "student" | null;

function IdentifyYourself() {
  const location = useLocation();
  const stateData = location.state.data || {};
  console.log(stateData);

  const data = stateData;
  const [selectedCard, setSelectedCard] = useState<CardType>(null); 
  const navigate = useNavigate();

  const handleCardClick = (cardType: CardType) => {
    setSelectedCard(cardType); 
  };

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
            text="I am a parent & I am here to apply for my child's education loan"
            image={ParentsIcons}
            isSelected={selectedCard === "parent"} 
            onClick={() => handleCardClick("parent")} 
          />
          <IdentityCard
            text="I am the student & I am looking for loan to support my education"
            image={StudentIcons}
            isSelected={selectedCard === "student"} 
            onClick={() => handleCardClick("student")} 
          />
          <br />
          <Button
            text="Proceed"
            onPress={() => {
              navigate("/loan-steps-course-details", { state: { data } });
            }}
            imageRight={ArrowRight}
            fullWidth
            disabled={!selectedCard} 
          />
        </div>
      </div>
    </div>
  );
}

export default IdentifyYourself;
