import React from 'react'
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import PlanPayment from './PlanPayment';


const TopupPlan = () => {
  return (
    <div>
          <ProfileNavBar>
            <h2>Plan</h2>
          </ProfileNavBar>
          <PlanPayment />
    </div>
  )
}

export default TopupPlan
