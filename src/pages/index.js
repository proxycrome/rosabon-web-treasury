import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux'
import PersonalProfile from "./PersonalProfile";
import CompanyProfile from "./CompanyProfile";
import { ProfileSideBarList } from "../component/dashboard/ProfileSideBar";

const Profile = () => {
  const { login } = useSelector((state) => state.auth)

  return (
    <WrapperBody>
      <div className="side-bar shadow-sm style-log">
        <ProfileSideBarList  profile="profile" />
      </div>

      {login.role.name === 'INDIVIDUAL_USER' ? (
        <div style={{ overflowY: "auto" }} className="main-body">
          <PersonalProfile />
        </div>
      ) : login.role.name === 'COMPANY' ? (
        <div style={{ overflowY: "auto" }} className="main-body">
          <CompanyProfile />
        </div>
      ) : null}
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
