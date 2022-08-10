import React from 'react'
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import CreatePlan from './CreatePlan';

const PlanProduct = () => {
  return (
    <div>
      <div>
        <ProfileNavBar />
        <CreatePlan />
      </div>
    </div>
  );
}

export default PlanProduct
