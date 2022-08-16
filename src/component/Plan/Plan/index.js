import React from 'react'
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { Plans } from './Plans';

const ListPlans = () => {
  return (
    <div>
      <ProfileNavBar>
        <h2>Choose Plan</h2>
      </ProfileNavBar>
      <Plans />
    </div>
  );
}

export default ListPlans
