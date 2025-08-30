// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

// layouts
import SiteLayout from './components/layouts/SiteLayout';
import AuthLayout from './components/layouts/AuthLayout';

// pages
import HomePage from './pages/HomePage';
import About from './pages/About';
import Scholarships from './pages/Scholarships';
import HowToApply from './pages/HowToApply';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RequireRole from "./components/RequireRole";
import ApplicantPortal from "./pages/portals/ApplicantPortal";
import AdminPortal from "./pages/portals/AdminPortal";
import PartnerPortal from "./pages/portals/PartnerPortal";
import Eligibility from './pages/Eligibility';
import FaqPage from './pages/FaqPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public site layout (header + footer you already have) */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/:section" element={<About />} />
            <Route path="/directory" element={<Scholarships />} />
            <Route path="/resources" element={<HowToApply />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resources/eligibility" element={<Eligibility />} />
            <Route path="/resources/faqs" element={<FaqPage />} />
                        
          </Route>

          {/* Auth layout (different header/footer) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Portals can stay on the public layout, or move to their own later */}
            <Route
              path="/portal/applicant"
              element={
                <RequireRole allow={["applicant"]}>
                  <ApplicantPortal />
                </RequireRole>
              }
            />
            <Route
              path="/portal/admin"
              element={
                <RequireRole allow={["admin"]}>
                  <AdminPortal />
                </RequireRole>
              }
            />
            <Route
              path="/portal/partner"
              element={
                <RequireRole allow={["partner"]}>
                  <PartnerPortal />
                </RequireRole>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
