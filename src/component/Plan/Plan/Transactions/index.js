import React from "react";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import TransactionDetails from "./TransactionDetails";
import styled from 'styled-components';

const Transactions = () => {
  return (
    <>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Transaction Details</span>
        </NavTitle>
      </ProfileNavBar>

      <TransactionDetails />
    </>
  );
};

export default Transactions;

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
