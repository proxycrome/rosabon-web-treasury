import React from "react";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import CreatePlan from "./CreatePlan";
import styled from "styled-components";
import { Toaster } from 'react-hot-toast';

const PlanProduct = () => {
  return (
    <div>
      <div>
        <ProfileNavBar>
          <NavTitle>
            <span className="fw-bold">Choose Plan</span>
          </NavTitle>
          <div>
            <Toaster/>
          </div>
        </ProfileNavBar>
        <CreatePlan />
      </div>
    </div>
  );
};

export default PlanProduct;

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
