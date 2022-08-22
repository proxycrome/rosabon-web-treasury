import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { RightView } from "./RightView";
import { LeftView } from "./LeftView";
import { useSelector, useDispatch, connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../../redux/actions/personalInfo/userProfile.actions";

function HomeView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user_profile);
  const { users } = profile;

  const user =
    users && users.role == "COMPANY"
      ? users.company.name
      : users.role == "INDIVIDUAL_USER"
      ? users.individualUser.firstName
      : "";

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("token"));
    if (tokenString) {
      dispatch(getAuthUsers(tokenString));
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (users && !users.kyc && users.role === "INDIVIDUAL_USER") {
      navigate("/kyc/person");
    }
    if (users && !users.kyc && users.role === "COMPANY") {
      navigate("/kyc/company");
    }
  }, [users]);

  return (
    <div>
      <ProfileNavBar className="shadow-lg">
        <NavTitle>
          <span>
            Welcome back{" "}
            <span className="fw-bold">
              {user}
            </span>
          </span>
        </NavTitle>
      </ProfileNavBar>
      <Wrapper>
        <div className="right-content">
          <RightView />
        </div>
        <div className="left-content">
          <LeftView />
        </div>
      </Wrapper>
    </div>
  );
}
export default HomeView;

const Wrapper = styled.div`
  display: flex;

  width: 100%;

  @media (min-width: 900px) {
    flex-direction: row;
    .right-content {
      width: 60%;
    }
    .left-content {
      width: 40%;
    }
  }

  @media (max-width: 899px) {
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
