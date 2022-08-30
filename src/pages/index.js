import React, { useState } from "react";
import styled from "styled-components";
import PersonalProfile from "./PersonalProfile";
import CompanyProfile from "./CompanyProfile";
import { ProfileSideBarList } from "../component/dashboard/ProfileSideBar";

const Profile = ({ user_profile }) => {
  return (
    <WrapperBody>
      <div className="side-bar shadow-sm style-log">
        <ProfileSideBarList  profile="profile" />
      </div>

      {user_profile ? (
        <div style={{ overflowY: "auto" }} className="main-body">
          <PersonalProfile />
        </div>
      ) : (
        <div style={{ overflowY: "auto" }} className="main-body">
          <CompanyProfile />
        </div>
      )}
    </WrapperBody>
  );
};

export default Profile;

const WrapperBody = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 1200px) {
    width: 100%;
    .side-bar {
      width: 20%;
    }
    .main-body {
      width: 80%;
    }
  }
  @media (max-width: 1200px) {
    .main-body {
      width: 100%;
    }
  }
`;
