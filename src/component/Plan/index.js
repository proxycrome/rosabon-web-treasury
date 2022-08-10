import React from 'react'
import styled from 'styled-components'
import { ProfileSideBarList } from '../dashboard/ProfileSideBar'
import HomeView from './home/HomeView'
import PlanPayment from './Plan/PlanPayment'
import { HistoryTable } from './Accesssories'
import PlanProduct from './createPlan'
import ListPlans from './Plan'
import TopupPlan from './Plan/TopupPlan'
import { PlanForm } from './createPlan/PlanForm'


const PlanHome = () => {
  return (
    <Wrapper>
      <div className="side-bar">
        <ProfileSideBarList profile="profile" />
      </div>
      <div className="main-body">
        {/* <PlanPayment /> */}
        {/* <PlanProduct /> */}
        {/* <HomeView /> */}
        {/* <ListPlans /> */}
        {/* <TopupPlan /> */}
        <PlanForm />

      </div>
    </Wrapper>
  );
}

export default PlanHome

const Wrapper = styled.div `
  display: flex;
  flex-direction: row;
  
   @media (min-width: 1200px) {
      width: 100%;
      .side-bar {
        width: 20%;
      }
      .main-body {
        width: 80%;
      }
   }
   @media (max-width: 1200px) {
    .main-body {
        width: 100%;
      }
   }
  
`