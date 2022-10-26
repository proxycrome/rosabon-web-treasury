import React, { useState } from "react";
import styled from "styled-components";

export function ProfileTabs({ personal, handleChange }) {
  const [activeBtn, setActiveBtn] = useState("profile");

  return (
    <WrappeSideBar>
      {personal ? (
        <>
          <div>
            <h3>Profile</h3>
            <div className="mt-5">
              <ul>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("profile");
                    setActiveBtn("profile");
                  }}
                >
                  <li className={activeBtn === "profile" ? "style-active" : ""}>
                    Personal information
                  </li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("documents");
                    setActiveBtn("documents");
                  }}
                >
                  <li
                    className={activeBtn === "documents" ? "style-active" : ""}
                  >
                    My Documents
                  </li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("bank");
                    setActiveBtn("bank");
                  }}
                >
                  <li className={activeBtn === "bank" ? "style-active" : ""}>
                    My Bank Details
                  </li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("password");
                    setActiveBtn("password");
                  }}
                >
                  <li className={activeBtn === "password" ? "style-active" : ""}>
                    Change Password
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <h3>Profile</h3>
            <div className="mt-5">
              <ul>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("company");
                    setActiveBtn("company");
                  }}
                >
                  <li className={activeBtn === "company" ? "style-active" : ""}>
                    Company information
                  </li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("details");
                    setActiveBtn("details");
                  }}
                >
                  <li className={activeBtn === "details" ? "style-active" : ""}>
                    More Details
                  </li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("documents");
                    setActiveBtn("documents");
                  }}
                >
                  <li
                    className={activeBtn === "documents" ? "style-active" : ""}
                  >
                    Company Documents
                  </li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("password");
                    setActiveBtn("password");
                  }}
                >
                  <li className={activeBtn === "password" ? "style-active" : ""}>
                    Change Password
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </>
      )}
    </WrappeSideBar>
  );
}

const WrappeSideBar = styled.div`
  @media (max-width: 700px) {
    li {
      font-size: 12px !important;
    }
  }
  @media (max-width: 767px) {
    padding-bottom: 50px;
    ul {
      display: flex;
      align-items: center;
      justify-content: start;
    }
    li {
      margin-left: 15px;
    }
    h3 {
      display: none;
    }
  }
  .link_style {
    text-decoration: none;
  }
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: -0.04em;
    color: #222222;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.04em;
    color: #242424;
    cursor: pointer;
    padding: 15px 5px;
  }
  /* li:hover {
    background: rgba(28, 68, 141, 0.09);
    border-radius: 5px;
  } */
  .style-active {
    background: rgba(28, 68, 141, 0.09);
    border-radius: 5px;
  }
`;
