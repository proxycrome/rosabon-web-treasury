import React from "react";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import CardPayment from "./cardPayment";
import styled from "styled-components";

const TopupPlan = () => {
  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Pay with Card</span>
        </NavTitle>
      </ProfileNavBar>
      <CardPayment />
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
