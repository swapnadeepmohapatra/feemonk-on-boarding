import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/Button";
import styles from "./index.module.css";
import ArrowRight from "../../images/icons/arrow_right.svg";
import { notifyUrlChange } from "../../utils/notifyUrlChange";

function LandingPage() {
  const navigate = useNavigate();

  // Function to handle navigation
  function navigateTo(route: string) {
    navigate(route);
    notifyUrlChange(window.location.href);
  }

  const [annimationClassName, setAnnimationClassName] = useState({
    circle: styles.circle,
    monkImg: styles.monkNone,
    mainLogo: styles.monkNone,
    textContainer: styles.monkNone,
  });

  useEffect(() => {
    setTimeout(() => {
      setAnnimationClassName({
        ...annimationClassName,
        circle: styles.circle,
        monkImg: styles.monkImg,
      });
    }, 1000);
    setTimeout(() => {
      setAnnimationClassName({
        ...annimationClassName,
        circle: styles.circleDisp,
        monkImg: styles.monkImgDisp,
      });
    }, 3000);
    setTimeout(() => {
      setAnnimationClassName({
        ...annimationClassName,
        circle: styles.monkNone,
        monkImg: styles.monkNone,
        mainLogo: styles.mainLogo,
        textContainer: styles.textContainer,
      });
    }, 4000);
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={annimationClassName.circle}></div>
        <img
          className={annimationClassName.monkImg}
          src="/monk_illustration.png"
          alt="popup"
        />
        <img
          className={annimationClassName.mainLogo}
          src="/main_logo.png"
          alt="feemonk"
        />
        {/* <div className={`${styles.popup}`}>
         
        </div> */}
        <div className={annimationClassName.textContainer}>
          <p
            style={{
              fontSize: 22,
              textAlign: "center",
              marginBottom: "5rem",
            }}
          >
            Simplified education loans &<p> fee payments</p>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "4rem",
              marginTop: "6rem",
            }}
          >
            <Button
              text={"Get started"}
              onPress={() => {
                navigateTo("/home");
              }}
              imageRight={ArrowRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
