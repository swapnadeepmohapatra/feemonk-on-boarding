import React, { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route,useNavigate, Navigate  } from "react-router-dom";
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
import IncomeDetails from "./pages/IncomeDetails";
import LoanDetails from "./pages/LoanDetails";
import RepaymentDetails from "./pages/RepaymentDetails";
import FeePayment from "./pages/FeePayment";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import BankSelect from "./pages/Bank/BankSelect";
import BankPdfUpload from "./pages/Bank/BankPdfUpload";
import AccountAggregator from "./pages/Bank/AccountAggregator";
import Mandate from "./pages/Mandates";
import PFCollection from "./pages/PFCollection";
import { jwtDecode } from "jwt-decode";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Sanctions from "./pages/Sanctions";
import RepaymentsCard from "./pages/Menu/components/RepaymentsCard";
const Router: React.FC = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const sessionData = sessionStorage.getItem("auth_token") || "";
  
      if (sessionData) {
        const parsedToken = JSON.parse(sessionData);
        const decodedToken = jwtDecode(parsedToken.value) as any; 
  
        const expirationTime = decodedToken.exp * 1000; 
        const currentTime = Date.now();
  
        const expiryDate = new Date(expirationTime).toLocaleString();
  
        console.log("Token expiry (human-readable):", expiryDate);
        console.log("Token expiry (UNIX timestamp):", decodedToken.exp);
        console.log("Current time:", currentTime);
  
        if (decodedToken.exp && decodedToken.exp * 1000 < currentTime) {
          sessionStorage.removeItem("auth_token"); 
          setIsTokenExpired(true);
          console.log("Token expired. Redirecting...");
        }
      }
    };
  
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); 
  
    return () => clearInterval(interval); 
  }, []); 
  console.log("istokenexpired",isTokenExpired)
  return (
    <BrowserRouter>
     <Modal open={isTokenExpired}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'fixed', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              width: '400px', 
            }}
          >
            <p
              style={{
              
                padding: '1em',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              Your session ended because there was no activity. Try signing in again.
            </p>
            <div style={{ padding: '1em' }}>
              {/* <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                <span style={{ fontSize: '18px' }}> Re-Login to access Dashboard</span>
                <br />
                <small>
                  <i> Your session ended because there was no activity. Try signing in again.</i>
                </small>
              </p> */}

              <Button
                style={{
                  display: 'block',
                  margin: 'auto', 
                  border: '2px solid #D0D0D0',
                }}
                onClick={() => window.location.href = '/'} 
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Routes>
        {/* <Route path="*" element={isTokenExpired ? <Navigate to="/" replace /> : <Navigate to="/home" replace />} /> */}
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
        <Route path="/income-details" element={<IncomeDetails />} />
        <Route path="/loan-details" element={<LoanDetails />} />
        <Route path="/repayment-details" element={<RepaymentDetails />} />

        <Route path="/feepayment" element={<FeePayment />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/support" element={<Support />} />
        <Route path="/bank-select" element={<BankSelect />} />
        <Route path="/pdf-upload-bank" element={<BankPdfUpload />} />
        <Route path="/account-aggregator" element={<AccountAggregator />} />
        <Route path="/mandate" element={<Mandate />} />
        <Route path="/PFCollection" element={<PFCollection />} />
        <Route path="/Sanctions" element={<Sanctions />} />
        <Route path="/emis" element={<RepaymentsCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
