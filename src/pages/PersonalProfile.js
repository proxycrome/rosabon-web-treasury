import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyDocu from "../component/dashboard/personalInfo/MyDocu";
import PersonalInfo from "../component/dashboard/personalInfo/PersonalInfo";
import BankDetails from "../component/dashboard/personalInfo/BankDetails";
import { ProfileTabs } from "../component/dashboard/ProfileTabs";
import { ProfileNavBar } from "../component/dashboard/ProfileNavbar";
import ChangePassword from "../component/dashboard/personalInfo/ChangePassword";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PersonalProfile = () => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("profile");
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;



  // useEffect(() => {
  //   const tokenString = JSON.parse(localStorage.getItem("token"));
  //   if (!tokenString) {
  //     navigate("/login");
  //   }
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn]);

  return (
    <WrapperBody>
      <div className="container-fluid">
        <div className="row">
          <ProfileNavBar />
        </div>
        <div className="row pt-5">
          <div className="col-md-3">
            <ProfileTabs personal="personal" handleChange={(e) => setTabs(e)} />
          </div>
          {/* <div className="horiz-line col-md-1"></div> */}
          <div className="col-md-9">
            {tabs === "profile" ? (
              <PersonalInfo />
            ) : tabs === "bank" ? (
              <BankDetails />
            ) : tabs === "documents" ? (
              <MyDocu />
            ) : tabs === "password" ? (
              <ChangePassword />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </WrapperBody>
  );
};

export default PersonalProfile;

const WrapperBody = styled.div`
  .horiz-line {
    border-right: 0.7px solid #e0e0e0;
  }
`;
