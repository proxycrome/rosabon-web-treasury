import React from 'react'
import styled from 'styled-components'
import { ProfileSideBarList } from '../dashboard/ProfileSideBar'
import HomeView from './HomeView'
import PlanPayment from './PlanPayment'
import { HistoryTable } from './Accesssories'

const PlanHome = () => {
  return (
    <Wrapper>
      <div className="side-bar">
        <ProfileSideBarList profile="profile" />
      </div>
      <div className="main-body">
        <HistoryTable />
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