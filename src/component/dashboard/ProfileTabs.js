import React from "react";
import styled from "styled-components";

export function ProfileTabs({ personal, handleChange }) {
  return (
    <WrappeSideBar>
      {personal ? (
        <>
          <div>
            <h3>Profile</h3>
            <div>
              <ul>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("profile");
                  }}>
                  <li>Personal information</li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("documents");
                  }}>
                  <li>My documents</li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("bank");
                  }}>
                  <li>My Bank Details</li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("edit");
                  }}>
                  <li>Change Password</li>
                </a>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <h3>Profile</h3>
            <div>
              <ul>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("company");
                  }}>
                  <li>Company information</li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("details");
                  }}>
                  <li>More Details</li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("documents");
                  }}>
                  <li>Company Documents</li>
                </a>
                <a
                  className="link_style"
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleChange("password");
                  }}>
                  <li>Change Password</li>
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
  li:hover {
    background: rgba(28, 68, 141, 0.09);
    border-radius: 5px;
  }
`;
