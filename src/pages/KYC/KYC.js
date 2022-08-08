import React from "react";
import styled from "styled-components";
import { ProfileSideBar } from "../../component/dashboard/ProfileSideBar";
import PersonalKYC from "../../component/dashboard/PersonalKYC";
import CompanyKYC from "../../component/dashboard/CompanyKYC";

function KYC({ company }) {
  return (
    <Wrapper>
      <div
        className="main-content">
        <ProfileSideBar />
        <div className="" style={{ overflowY: "auto" }}>
          {company ? <CompanyKYC /> : <PersonalKYC />}
        </div>
      </div>
    </Wrapper>
  );
}

export default KYC;

const Wrapper = styled.div `
  .main-content{
    @media(min-width: 901px){
      display: grid;
      grid-template-columns: 0.3fr 1fr;
      height: 100vh;
      overflow: hidden;
    }
  }

`

