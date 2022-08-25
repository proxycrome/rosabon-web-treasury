import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ProfileSideBarList } from '../dashboard/ProfileSideBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const PlanHome = ({ product, list, topup, payment, details }) => {
  const [tabs, setTabs] = useState('profile')
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const { login, isLoggedIn } = auth

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("token"));
    if (!tokenString) {
      navigate("/login");
    }
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <Wrapper>
      <div className="side-bar shadow-sm style-log">
        <ProfileSideBarList profile="profile" />
      </div>
      <div className="main-body">
        <Outlet />
      </div>
    </Wrapper>
  )
}

export default PlanHome

const Wrapper = styled.div`
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
