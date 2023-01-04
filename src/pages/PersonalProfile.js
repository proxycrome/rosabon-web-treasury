import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyDocu from "../component/dashboard/personalInfo/MyDocu";
import PersonalInfo from "../component/dashboard/personalInfo/PersonalInfo";
import BankDetails from "../component/dashboard/personalInfo/BankDetails";
import { ProfileTabs } from "../component/dashboard/ProfileTabs";
import { ProfileNavBar } from "../component/dashboard/ProfileNavbar";
import ChangePassword from "../component/dashboard/personalInfo/ChangePassword";
import { Toaster } from "react-hot-toast";

const PersonalProfile = ({ isAssisted }) => {
  const [tabs, setTabs] = useState("profile");

  useEffect(() => {
    if (isAssisted) {
      setTabs("password");
    }
  }, [isAssisted]);


  return (
    <>
      <ProfileNavBar />
      <div>
        <Toaster />
      </div>
      <WrapperBody>
        <div className="container-fluid">
          <div className="row"></div>
          <div className="row pt-5">
            <div className="col-md-3 shadow-sm style-log">
              <ProfileTabs
                personal="personal"
                handleChange={(tabName) => setTabs(tabName)}
                isAssisted={isAssisted}
              />
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
    </>
  );
};

export default PersonalProfile;

const WrapperBody = styled.div`
  .horiz-line {
    border-right: 0.7px solid #e0e0e0;
  }
`;
