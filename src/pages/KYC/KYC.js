import React from 'react'
import styled from 'styled-components'
import { ProfileSideBar } from '../../component/dashboard/ProfileSideBar'
import { Outlet } from 'react-router-dom'

function KYC() {
  return (
    <Wrapper>
      <div className="main-content">
        <ProfileSideBar />
        <div className="" style={{ overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </Wrapper>
  )
}

export default KYC

const Wrapper = styled.div`
  .main-content {
    @media (min-width: 901px) {
      display: grid;
      grid-template-columns: 0.3fr 1fr;
      height: 100vh;
      overflow: hidden;
    }
  }
`
