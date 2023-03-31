import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IdentifyYourself from "./pages/IdentifyYourself";
import LandingPage from "./pages/LandingPage";
import LoanSteps from "./pages/LoanSteps";
import Menu from "./pages/Menu";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/identify-yourself" element={<IdentifyYourself />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/loan-steps" element={<LoanSteps />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
