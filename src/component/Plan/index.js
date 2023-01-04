import React, { useEffect } from "react";
import styled from "styled-components";
import { ProfileSideBarList } from "../dashboard/ProfileSideBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlanHome = ({ product, list, topup, payment, details, children }) => {
  // const [tabs, setTabs] = useState("profile");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn } = auth;
  const { users } = useSelector((state) => state.user_profile);

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString || !isLoggedIn) {
      navigate("/login");
    }
  }, [users, isLoggedIn, navigate]);

  return (
    <Wrapper>
      <div className="side-bar shadow-sm style-log">
        <ProfileSideBarList profile="profile" />
      </div>
      <div className="main-body">{children}</div>
    </Wrapper>
  );
};

export default PlanHome;

const Wrapper = styled.div`
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
    positon: relative;
    .main-body {
      width: 100%;
    }
  }
`;
