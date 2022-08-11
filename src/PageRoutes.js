import React from "react";
import { Routes, Route } from "react-router-dom";
// import ProfileUpdate from "./component/dashboard/ProfileUpdate";
import ForgotPassword from "./component/Auth/ForgotPassword";
import Congratulatios from "./component/Auth/Congratulatios";
import ResetPassword from "./component/Auth/ResetPassword";
import Authentication from "./component/Auth";
import Profile from "./pages";
import KYC from "./pages/KYC/KYC";
import PlanHome from "./component/Plan";

function PageRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Authentication />} />
      <Route path="/signup" element={<Authentication signup="signup" />} />
      <Route path="/company" element={<KYC company="company" />} />
      <Route path="/person" element={<KYC />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/congrates" element={<Congratulatios />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/personal-profile"
        element={<Profile user_profile="user_profile" />}
      />
      <Route path="/company-profile" element={<Profile />} />
      <Route
        path="/plan-details-form"
        element={<PlanHome details="details" />}
      />
      <Route path="/plan-product" element={<PlanHome product="product" />} />
      <Route path="/" element={<PlanHome />} />
      <Route path="/plan-list" element={<PlanHome list="list" />} />
      <Route path="/plan-topup" element={<PlanHome topup="topup" />} />
      <Route path="/plan-payment" element={<PlanHome payment="payment" />} />
    </Routes>
  );
}

export default PageRoutes;
