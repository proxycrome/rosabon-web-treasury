import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import PersonalProfile from "./PersonalProfile";
import CompanyProfile from "./CompanyProfile";
import { ProfileSideBarList } from "../component/dashboard/ProfileSideBar";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  // const { login } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user_profile);
  const {state} = useLocation();
  const {isAssisted} = state || {};

  


  return (
    <WrapperBody>
      <div className="side-bar shadow-sm style-log">
        <ProfileSideBarList profile="profile" />
      </div>

      {users?.role === "INDIVIDUAL_USER" ? (
        <div className="main-body">
          <PersonalProfile isAssisted={isAssisted} />
        </div>
      ) : users?.role === "COMPANY" ? (
        <div className="main-body">
          <CompanyProfile isAssisted={isAssisted} />
        </div>
      ) : null}
    </WrapperBody>
  );
};

export default Profile;

const WrapperBody = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;

  @media (min-width: 1201px) {
    width: 100vw;
    height: 100%;
    .side-bar {
      width: 20%;
    }
    .main-body {
      width: 80%;
    }
  }
  @media (min-width: 0px) and (max-width: 1200px) {
    width: 100%;
    height: 100%;
    position: relative;
    .main-body {
      width: 100%;
    }
  }
`;
