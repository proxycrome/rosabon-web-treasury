import React, { useState } from "react";
import styled from "styled-components";
import PersonalProfile from "./PersonalProfile";
import { ProfileSideBar } from "../component/dashboard/ProfileSideBar";

const Profile = () => {
  return (
    <WrapperBody>
        <div className="container-fluid">
            <div className="row w-100">
                <div className="d-none d-lg-block col-lg-3 w-30"><ProfileSideBar /></div>
                <div className="col-lg-9 w-70"><PersonalProfile/></div>
            </div>
        </div>
    </WrapperBody>
  )
}

export default Profile

const WrapperBody = styled.div`
  
`;