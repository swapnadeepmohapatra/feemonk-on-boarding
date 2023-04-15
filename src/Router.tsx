import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IdentifyYourself from "./pages/IdentifyYourself";
import LandingPage from "./pages/LandingPage";
import LoanSteps from "./pages/LoanSteps";
import Menu from "./pages/Menu";
import LoanStepsKYC from "./pages/LoanStepsKYC";
import LoanStepsIncomeDetails from "./pages/LoanStepsIncomeDetails";
import LoanStepsCourseDetails from "./pages/LoanStepsCourseDetails";
import LoanStepsBasicDetails from "./pages/LoanStepsBasicDetails";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/identify-yourself" element={<IdentifyYourself />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/loan-steps" element={<LoanSteps />} />
        <Route path="/loan-steps-start" element={<LoanStepsKYC />} />
        <Route
          path="/loan-steps-basic-details"
          element={<LoanStepsBasicDetails />}
        />
        <Route
          path="/loan-steps-income-details"
          element={<LoanStepsIncomeDetails />}
        />
        <Route
          path="/loan-steps-course-details"
          element={<LoanStepsCourseDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
