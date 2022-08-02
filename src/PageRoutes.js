import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileUpdate from "./component/dashboard/ProfileUpdate";
import ForgotPassword from "./component/Auth/ForgotPassword";
import Congratulatios from "./component/Auth/Congratulatios";
import ResetPassword from "./component/Auth/ResetPassword";
import Authentication from "./component/Auth";
import Profile from "./pages";
import ProfileView from "./pages/ProfileView";

function PageRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Authentication />} />
      <Route path="/signup" element={<Authentication signup="signup" />} />
      <Route path="/company" element={<ProfileView company="company" />} />
      <Route path="/person" element={<ProfileView />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/congrates" element={<Congratulatios />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/personal-profile"
        element={<Profile user_profile="user_profile" />}
      />
      <Route path="/company-profile" element={<Profile />} />
    </Routes>
  );
}

export default PageRoutes;
