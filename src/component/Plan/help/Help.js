import React from "react";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import styled from "styled-components";
import { Input } from "reactstrap";

const Help = () => {
  return (
    <div>
      <WrapperBody>
        <ProfileNavBar className="shadow-lg">
          <NavTitle>
            <span className="fw-bold">FAQ</span>
          </NavTitle>
        </ProfileNavBar>
        <Wrapper>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="w-50">Frequently Asked Questions</h3>
            <div className="input-group w-50">
              <i class="fa-solid fa-magnifying-glass  position-absolute"></i>
              <Input
                placeholder="Search Using Keywords"
                type="text"
                className="form-control position-relative"
              />
              <i class="fa-solid fa-xmark position-absolute"></i>
            </div>
          </div>
          <hr className="my-5" />
          <div className="d-flex justify-content-between align-items-center py-3">
            <h4 className="w-50">About Rosabon</h4>
            <i className="fa-solid fa-chevron-down mx-2"></i>
          </div>
          <h5>What is Rosabon?</h5>

          <p className="p-0 m-0">
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.{" "}
          </p>
          <hr className="my-3" />
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="w-50">About Rosabon</h4>
            <i className="fa-solid fa-chevron-down mx-2"></i>
          </div>
          <hr className="my-3" />
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="w-50">About Rosabon</h4>
            <i className="fa-solid fa-chevron-down mx-2"></i>
          </div>
          <hr className="my-3" />
        </Wrapper>
      </WrapperBody>
    </div>
  );
};

export default Help;

const WrapperBody = styled.div`
  height: 100vh;
`;

const NavTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2,
  span {
    text-align: left;
  }
  @media (max-width: 500px) {
    h2,
    span {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  width: 80%;
  padding-right: 10%;
  padding-left: 50px;
  padding-top: 50px;
  @media (max-width: 900px) {
    padding-right: 20%;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding-right: 50px;
    padding-left: 50px;
  }
  .select-field {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #222222;
  }
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 161.9%;
    letter-spacing: -0.01em;
    color: #242424;
  }
  h5 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: #4f4f4f;
  }
  input {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #bdbdbd;
  }
`;
