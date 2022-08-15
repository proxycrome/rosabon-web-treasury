import React, { useState, useEffect } from "react";
import styled from "styled-components";
import storage from "redux-persist/lib/storage";
import { useNavigate } from "react-router-dom";
import { Collapse } from "reactstrap";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../redux/actions/personalInfo/userProfile.actions";

export function ProfileNavBar({ children }) {
  const [open, setOpen] = useState(false);
    const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    storage.removeItem("persist:root");
    navigate("/login")
    //  setIsLoggedin(false);
  };

  return (
    <WrappeNavBar>
      <div className="">
        <div className="profile_nav">
          <div className="page-title mx-3">{children}</div>
          <ul className="">
            <li className="profile_nav_bel">
              <i className="fas fa-bell"></i>
            </li>
            <li onClick={() => setOpen(!open)}>
              {open ? (
                <i class="fa-solid fa-chevron-up"></i>
              ) : (
                <i class="fa-solid fa-chevron-down"></i>
              )}
            </li>
            <Collapse isOpen={open}>
              <ul>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </Collapse>
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
