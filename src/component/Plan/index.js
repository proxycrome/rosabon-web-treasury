import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ProfileSideBarList } from "../dashboard/ProfileSideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PlanHome = ({ product, list, topup, payment, details }) => {
  const [tabs, setTabs] = useState("profile");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;

  const user = { name: false };
  const success = useSelector((state) => state.auth.success);

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("token"));
    console.log(isLoggedIn)
    if (!tokenString) {
      navigate("/login");
    }
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Wrapper>
      <div className="side-bar">
        <ProfileSideBarList profile="profile" />
      </div>
      <div className="main-body">
        <Outlet />
      </div>
    </Wrapper>
  );

  // return user == false ? (
  //   <Wrapper>
  //     <div className="side-bar">
  //       <ProfileSideBarList profile="profile" />
  //     </div>
  //     <div className="main-body">
  //       <Outlet />
  //     </div>
  //   </Wrapper>
  // ) : (
  //   <Navigate to={"/login"} />
  // );
};

export default PlanHome;

const Wrapper = styled.div`
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
