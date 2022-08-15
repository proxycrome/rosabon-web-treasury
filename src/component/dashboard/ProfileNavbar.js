import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as mdb from "mdb-ui-kit";
import { Link } from "react-router-dom";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../redux/actions/personalInfo/userProfile.actions";

export function ProfileNavBar({ children }) {

   const logout = () => {
     localStorage.removeItem("token");
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
            <li>
              <i className="fas fa-angle-down"></i>
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
