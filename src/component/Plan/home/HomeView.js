import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { RightView } from "./RightView";
import { LeftView } from "./LeftView";
import { useSelector, useDispatch, connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function HomeView() {
  const [sendView, setSendView] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user_profile);
  const { users } = profile;
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;
  

  
  const handleView = (data) => {
    setSendView(data);
  }

  // useEffect(() => {
  //   if (users && !users.kyc) {
  //     navigate("/kyc");
  //   }
  // }, [login]);

  return (
    <div>
      <ProfileNavBar className="shadow-lg" view={sendView}>
        <NavTitle>
          <span>
            Welcome back{" "}
            <span className="fw-bold">
              {users && users?.role === "COMPANY"
                ? users?.company.name
                : users?.role === "INDIVIDUAL_USER"
                ? users?.individualUser.firstName
                : ""
              }
            </span>
          </span>
        </NavTitle>
      </ProfileNavBar>
      <Toaster/>
      <Wrapper>
        <div className="right-content">
          <RightView />
        </div>
        <div className="left-content">
          <LeftView view={(data) => handleView(data)}/>
        </div>
      </Wrapper>
    </div>
  );
}
export default HomeView;

const Wrapper = styled.div`
  display: flex;

  width: 100%;

  @media (min-width: 950px) {
    flex-direction: row;
    .right-content {
      width: 60%;
    }
    .left-content {
      width: 40%;
    }
  }

  @media (max-width: 949px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .right-content {
      width: 100% !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .left-content {
      width: 100% !important;
    }
  }
`;
const NavTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2,
  span {
    text-align: left;
  }
  @media (max-width: 500px) {
    h2,
    span {
      display: none;
    }
  }
`;
