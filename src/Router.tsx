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
import LoanOffer from "./pages/LoanOffer";
import ViewOffer from "./pages/ViewOffer";
import EVerify from "./pages/EVerify";
import SanctionLetter from "./pages/SanctionLetter";
import ParkingPage from "./pages/ParkingPage";
import CibilLow from "./pages/CibilLow";
import CoAppDetails from "./pages/CoAppDetails";
import IncomeDetails from "./pages/IncomeDetails"


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
        <Route path="/loan-steps-loan-offer" element={<LoanOffer />} />
        <Route path="/view-offer" element={<ViewOffer />} />
        <Route path="/e-verify" element={<EVerify />} />
        <Route path="/sanction-letter" element={<SanctionLetter />} />
        <Route path="/parking-page" element={<ParkingPage />} />
        <Route path="/cibil-low" element={<CibilLow />} />
        <Route path="/coapp-details" element={<CoAppDetails />} />
        <Route path="/income-details" element={<IncomeDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
