import React from "react";
import { ProfileSideBar } from "../component/dashboard/ProfileSideBar";
import ProfileUpdate from "../component/dashboard/ProfileUpdate";
import CompanyUpdate from "../component/dashboard/CompanyUpdate";

function ProfileView({ company }) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.3fr 1fr",
          height: "100vh",
          overflow: "hidden",
        }}>
        <ProfileSideBar />
        <div className="" style={{ overflowY: "auto" }}>
          {company ? <CompanyUpdate /> : <ProfileUpdate />}
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
