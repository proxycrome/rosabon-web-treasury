import React from 'react'
import { ProfileNavBar } from '../../../dashboard/ProfileNavbar';
import TransactionDetails from './TransactionDetails';

const Transactions = () => {
  return (
    <>
      <ProfileNavBar>
        <h2>Transaction Details</h2>
      </ProfileNavBar>
      <TransactionDetails />
    </>
  )
}

export default Transactions;
