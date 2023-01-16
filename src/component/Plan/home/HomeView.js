import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { RightView } from "./RightView";
import { LeftView } from "./LeftView";
import { useSelector, useDispatch } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Spinner from "../../common/loading";
import { getCatWithProducts, getPlans } from "../../../store/actions";

function HomeView() {
  const [sendView, setSendView] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user_profile);
  const { catWithProducts } = useSelector((state) => state.product);
  const { plans } = useSelector((state) => state.plan);
  const { users } = profile;

  useEffect(() => {
    dispatch(getCatWithProducts());
    dispatch(getPlans());
  }, [dispatch]);

  const handleView = (data) => {
    setSendView(data);
  };

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
                : ""}
            </span>
          </span>
        </NavTitle>
      </ProfileNavBar>
      <Toaster />
      {plans && catWithProducts ? (
        <Wrapper>
          <div className="right-content">
            <RightView />
          </div>
          <div className="left-content">
            <LeftView view={(data) => handleView(data)} />
          </div>
        </Wrapper>
      ) : (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      )}
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
