import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IdentifyYourself from "./pages/IdentifyYourself";
import LandingPage from "./pages/LandingPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/identify-yourself" element={<IdentifyYourself />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
