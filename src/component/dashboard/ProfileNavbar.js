import React, { useState, useEffect } from "react";
import styled from "styled-components";
import storage from "redux-persist/lib/storage";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../redux/actions/personalInfo/userProfile.actions";
import { CLEAR_USERS } from "../../redux/constant/auth";

export function ProfileNavBar({ children }) {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggle = () => {
    setMenu(!menu);
  };

  const logout = (e) => {
    localStorage.removeItem("token");
    dispatch({ type: CLEAR_USERS });
  };

  return (
    <WrappeNavBar>
      <div className="">
        <div className="profile_nav">
          <div className="page-title mx-3">{children}</div>
          <ul className="">
            <li className="profile_nav_bel">
              <div className="nav-bell">
                <i className="fas fa-bell"></i>
              </div>
            </li>
            <li>
              <Dropdown
                isOpen={menu}
                toggle={toggle}
                className="d-inline-block">
                <DropdownToggle
                  tag="button"
                  outline
                  className="btn header-item waves-effect"
                  id="page-header-user-dropdown">
                  {!menu ? (
                    <i className="fa-solid fa-chevron-down"></i>
                  ) : (
                    <i className="fa-solid fa-chevron-up"></i>
                  )}
                </DropdownToggle>
                <DropdownMenu left className="mt-1">
                  <DropdownItem className="text-danger" onClick={logout}>
                    <i className="fa fa-sign-out mr-5 text-danger"></i> Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li>ekiyee bilaowei</li>
            <li>
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                style={{ width: "50px" }}
                alt="Avatar"
              />
            </li>
          </ul>
        </div>
      </div>
    </WrappeNavBar>
  );
}

const WrappeNavBar = styled.div`
  height: 101px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(98, 134, 154, 0.12);
  text-align: right;
  padding-right: 4rem;
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
    padding-top: 1.5rem;
  }
  .profile_nav_bel {
    padding-right: 50px;
  }
  .nav-bell {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    border-radius: 5px;
    padding: 10px 15px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  li {
    padding-left: 15px;
  }

  .fa-bell {
    font-size: 34px;
  }
`;
