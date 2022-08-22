import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import storage from 'redux-persist/lib/storage'
import { useSelector, useDispatch, connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from '../../redux/actions/personalInfo/userProfile.actions'
import { CLEAR_USERS } from '../../redux/constant/auth'

export function ProfileNavBar({ children }) {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggle = () => {
    setMenu(!menu)
  }

  const logout = (e) => {
    localStorage.removeItem('token')

    navigate('/login', { replace: true })
    dispatch({ type: CLEAR_USERS })
  }

  return (
    <WrappeNavBar>
      <div className="shadow pe-4">
        <div className="profile_nav py-2">
          <div className="page-title mx-3">{children}</div>
          <ul>
            <li className="profile_nav_bel">
              <span className="nav-bell">
                <i className="fas fa-bell"></i>
              </span>
            </li>
            <li>
              <Dropdown
                isOpen={menu}
                toggle={toggle}
                className="d-inline-block user-dropdown"
              >
                <DropdownToggle
                  tag="button"
                  outline
                  className="btn header-item waves-effect border-0"
                  id="page-header-user-dropdown"
                >
                  <span className="d-none d-xl-inline-block ml-1 text-transform me-2">
                    ekiyee bilaowei
                  </span>
                  <img
                    className="rounded-circle header-profile-user mr-3"
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    width="50"
                    alt="Avatar"
                  />
                  <i className="fa-solid fa-chevron-down mx-2"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <i className="ri-user-line align-middle mr-1"></i> Profile
                  </DropdownItem>
                  <DropdownItem className="d-block">Settings</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem className="text-danger" onClick={logout}>

                   {/* <div className="d-flex align-items-center justify-content-between">
                    <i className="fa fa-sign-out mr-5 text-danger"></i>
                    <span style={{marginLeft: "20px"}}>Logout</span>
                   </div> */}

                    <i className="ri-shut-down-line align-middle mr-1 text-danger"></i>{' '}
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </WrappeNavBar>
  )
}

const WrappeNavBar = styled.div`
  // height: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(98, 134, 154, 0.12);
  text-align: right;
  margin-bottom: 20px;

  @media (max-width: 650px) {
    .page-title h2 {
      font-size: 20px !important;
    }
  }

  .profile_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-bell {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    border-radius: 5px;
    padding: 8px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .fa-bell {
    font-size: 16px;
  }
`
