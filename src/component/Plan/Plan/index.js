import React from "react";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { Plans } from "./Plans";
import styled from "styled-components";

const ListPlans = () => {
  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Choose Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <Plans />
    </div>
  );
};

export default ListPlans;

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
