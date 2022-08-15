import React, { useState } from "react";
import styled from "styled-components";
import { ProfileSideBarList } from "../dashboard/ProfileSideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";

const PlanHome = ({ product, list, topup, payment, details }) => {
  const [tabs, setTabs] = useState("profile");

  const user = { name: false };
  const success = useSelector((state) => state.auth.success);

  return user == false ? (
    <Wrapper>
      <div className="side-bar">
        <ProfileSideBarList profile="profile" />
      </div>
      <div className="main-body">
        <Outlet />
      </div>
    </Wrapper>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PlanHome;

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
`;

// {
//   "company": {
//     "companyAddress": {
//       "city": "string",
//       "country": "string",
//       "houseNoAddress": "string",
//       "id": 0,
//       "postCode": "string",
//       "state": "string"
//     },
//     "companyType": "string",
//     "contactFirstName": "string",
//     "contactLastName": "string",
//     "contactMiddleName": "string",
//     "dateOfInco": "dd-MM-yyyy",
//     "name": "string",
//     "natureOfBusiness": "string",
//     "rcNumber": "string"
//   },
//   "individualUser": {
//     "bvn": "string",
//     "contactAddress": {
//       "city": "string",
//       "country": "string",
//       "houseNoAddress": "string",
//       "id": 0,
//       "postCode": "string",
//       "state": "string"
//     },
//     "coutryOfResidence": {
//       "id": 0,
//       "name": "string"
//     },
//     "dateOfBirth": "dd-MM-yyyy",
//     "firstName": "string",
//     "gender": "FEMALE",
//     "lastName": "string",
//     "middleName": "string"
//   },
//   "isAssited": true,
//   "isKyc": true,
//   "isNewsLetters": true,
//   "phone": "string",
//   "role": "string",
//   "source": "ANOTHER_USER",
//   "sourceOthers": "string",
//   "status": "ACTIVE",
//   "usage": "ADMIN"
// }
