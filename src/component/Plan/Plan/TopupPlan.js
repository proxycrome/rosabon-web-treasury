import React from "react";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import PlanPayment from "./PlanPayment";
import styled from "styled-components";

const TopupPlan = () => {
  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <PlanPayment />
    </div>
  );
};

export default TopupPlan;

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
