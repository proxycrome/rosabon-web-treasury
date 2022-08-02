import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChangePassword from "../component/dashboard/companyInfo/ChangePassword";
import CompanyDetails from "../component/dashboard/companyInfo/CompanyDetails";
import CompanyDoc from "../component/dashboard/companyInfo/CompanyDoc";
import MoreDetails from "../component/dashboard/companyInfo/MoreDetails";
import { ProfileTabs } from "../component/dashboard/ProfileTabs";
import { ProfileNavBar } from "../component/dashboard/ProfileNavbar";
import { Link, useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("company");

  useEffect(() => {
    const tokenString = localStorage.getItem("company-token");
    if (!tokenString) {
      navigate("/login");
    }
  }, []);

  return (
    <WrapperBody>
      <div className="container-fluid">
        <ProfileNavBar />
        <div className="row">
          <div className="col-md-2">
            <ProfileTabs handleChange={(e) => setTabs(e)} />
          </div>
          <div className="horiz-line col-md-1"></div>
          <div className="col-md-9">
            {tabs === "company" ? (
              <CompanyDetails />
            ) : tabs === "password" ? (
              <ChangePassword />
            ) : tabs === "documents" ? (
              <CompanyDoc />
            ) : tabs === "details" ? (
              <MoreDetails />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </WrapperBody>
  );
};

export default CompanyProfile;

const WrapperBody = styled.div`
  .horiz-line {
    border-right: 0.7px solid #e0e0e0;
  }
`;
