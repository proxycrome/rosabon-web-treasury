import React from 'react'
import { ProfileNavBar } from '../../dashboard/ProfileNavbar';
import CreatePlan from './CreatePlan';

const PlanProduct = () => {
  return (
    <div>
      <div>
        <ProfileNavBar><h2>Choose Plan</h2></ProfileNavBar>
        <CreatePlan />
      </div>
    </div>
  );
}

export default PlanProduct
