import React from "react";
import Login from "./Login";
import LoginLeftView from "./loginLeftView";
import Signup from "./signup";

const Authentication = ({ signup }) => {

  return (
    <div>
      <div className="">
        <div className="d-flex flex-row">
          <div className="w-50 position-relative d-block">
            <LoginLeftView signup={signup} />
          </div>
          {signup ? (
            <div className="w-50">
              <Signup />
            </div>
          ) : (
            <div className="col-lg-6">
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
