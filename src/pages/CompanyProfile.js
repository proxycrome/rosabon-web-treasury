import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChangePassword from "../component/dashboard/companyInfo/ChangePassword";
import CompanyDetails from "../component/dashboard/companyInfo/CompanyDetails";
import CompanyDoc from "../component/dashboard/companyInfo/CompanyDoc";
import MoreDetails from "../component/dashboard/companyInfo/MoreDetails";
import { ProfileTabs } from "../component/dashboard/ProfileTabs";
import { ProfileNavBar } from "../component/dashboard/ProfileNavbar";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const CompanyProfile = ({ isAssisted }) => {
  // const navigate = useNavigate();
  const [tabs, setTabs] = useState("company");

  useEffect(() => {
    if (isAssisted) {
      setTabs("password");
    }
  }, [isAssisted]);

  return (
    <WrapperBody>
      <ProfileNavBar />

      <div>
        <Toaster />
      </div>
      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col-md-3 shadow-sm style-log">
            <ProfileTabs
              handleChange={(tabName) => setTabs(tabName)}
              isAssisted={isAssisted}
            />
          </div>
          {/* <div className="horiz-line col-md-1"></div> */}
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
  width: 100%;

  .horiz-line {
    border-right: 0.7px solid #e0e0e0;
  }
`;
