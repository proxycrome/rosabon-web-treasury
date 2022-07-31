import React, { useState } from "react";
import styled from "styled-components";
import MyDocu from "../component/dashboard/personalInfo/MyDocu";
import PersonalInfo from "../component/dashboard/personalInfo/PersonalInfo";
import BankDetails from "../component/dashboard/personalInfo/BankDetails";
import { ProfileTabs } from "../component/dashboard/ProfileTabs";

const PersonalProfile = () => {
  const [tabs, setTabs] = useState("profile");

  return (
    <WrapperBody>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <ProfileTabs handleChange={(e) => setTabs(e)} />
          </div>
          <div className="horiz-line col-md-1"></div>
          <div className="col-md-9">
            {tabs === "profile" ? (
              <PersonalInfo />
            ) : tabs === "bank" ? (
              <BankDetails />
            ) : tabs === "documents" ? (
              <MyDocu />
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
