import React from "react";
import styled from "styled-components";
import { ProfileSideBarList } from "../dashboard/ProfileSideBar";
import HomeView from "./home/HomeView";
import PlanPayment from "./Plan/PlanPayment";
import { HistoryTable } from "./Accesssories";
import PlanProduct from "./createPlan";
import ListPlans from "./Plan";
import TopupPlan from "./Plan/TopupPlan";
import { PlanForm } from "./createPlan/PlanForm";

const PlanHome = ({ product, list, topup, payment, details }) => {
  return (
    <Wrapper>
      <div className="side-bar">
        <ProfileSideBarList profile="profile" />
      </div>
      <div className="main-body">
        {product ? (
          <PlanProduct />
        ) : list ? (
          <ListPlans />
        ) : topup ? (
          <TopupPlan />
        ) : payment ? (
          <PlanPayment />
        ) : details ? (
          <PlanForm />
        ) : (
          <HomeView />
        )}
      </div>
    </Wrapper>
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