import React, { useState } from "react";
import styled from "styled-components";
import PersonalProfile from "./PersonalProfile";
import CompanyProfile from "./CompanyProfile";
import { ProfileSideBarList } from "../component/dashboard/ProfileSideBar";

const Profile = ({ user_profile }) => {
  return (
    <WrapperBody>
      <div className="">
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
          }}
          className="content">
          <div className="">
            <ProfileSideBarList />
          </div>

          {user_profile ? (
            <>
              <div style={{ overflowY: "auto" }} className="">
                <PersonalProfile />
              </div>
            </>
          ) : (
            <>
              <div style={{ overflowY: "auto" }} className="">
                <CompanyProfile />
              </div>
            </>
          )}
        </div>
      </div>
    </WrapperBody>
  );
};

export default Profile;

const WrapperBody = styled.div`
  .content {
    display: grid;
    @media (min-width: 900px) {
      grid-template-columns: 0.2fr 1fr;
    }
  }
`;
