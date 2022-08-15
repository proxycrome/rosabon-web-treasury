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
import HomeView from "./component/Plan/home/HomeView";
import ListPlans from "./component/Plan/Plan";
import TopupPlan from "./component/Plan/Plan/TopupPlan";
import PlanPayment from "./component/Plan/Plan/PlanPayment";
import PlanProduct from "./component/Plan/createPlan";
import PersonalKYC from "./component/dashboard/PersonalKYC";
import CompanyKYC from "./component/dashboard/CompanyKYC";
import UserSignup from "./component/Auth/userSignup";
import CompanySignup from "./component/Auth/CompanySignup";

function PageRoutes() {
  return (
    <Routes>
      <Route path="*" element={<p>Error 404</p>} />
      <Route path="/" element={<PlanHome />}>
        <Route path="" element={<HomeView />} />
        <Route path="plan-product" element={<PlanProduct />} />
        <Route path="plan-list" element={<ListPlans />} />
        <Route path="plan-topup" element={<TopupPlan />} />
        <Route path="plan-payment" element={<PlanPayment />} />
      </Route>
      <Route path="/kyc" element={<KYC />}>
        <Route path="company" element={<CompanyKYC />} />
        <Route path="person" element={<PersonalKYC />} />
      </Route>
      <Route path="/login" element={<Authentication />} />
      <Route path="/signup" element={<Authentication signup="signup" />} />
      <Route path="/register-user" element={<UserSignup signup="signup" />} />
      <Route path="/register-company" element={<CompanySignup signup="signup" />} />
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
    </Routes>
  );
}

export default PageRoutes;
