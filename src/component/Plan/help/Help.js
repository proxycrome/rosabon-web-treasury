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
            <div className="input-group w-50 position-relative search-group">
              <Input
                placeholder="Search Using Keywords"
                type="text"
                className="form-control"
              />
              <i class="fa-solid fa-magnifying-glass position-absolute search"></i>
              <i class="fa-solid fa-xmark position-absolute clear"></i>
            </div>
          </div>
          <hr className="my-5" />
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <div class="accordion-button collapsed" style={{backgroundColor: '#FFFFFF'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  About Rosabon
                </div>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <h5>What is Rosabon?</h5>
                  <p className="p-0 m-0">
                    The passage experienced a surge in popularity during the 1960s when
                    Letraset used it on their dry-transfer sheets, and again during the
                    90s as desktop publishers bundled the text with their software.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" style={{backgroundColor: '#FFFFFF'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  About Rosabon
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <h5>What is Rosabon?</h5>
                  <p className="p-0 m-0">
                    The passage experienced a surge in popularity during the 1960s when
                    Letraset used it on their dry-transfer sheets, and again during the
                    90s as desktop publishers bundled the text with their software.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" style={{backgroundColor: '#FFFFFF'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  About Rosabon
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <h5>What is Rosabon?</h5>
                  <p className="p-0 m-0">
                    The passage experienced a surge in popularity during the 1960s when
                    Letraset used it on their dry-transfer sheets, and again during the
                    90s as desktop publishers bundled the text with their software.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
    width: 440px;
    height: 50px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #bdbdbd;
  }

  .search-group {
    width: auto;
    height: auto;
    .search {
      color: #828282;
      top: 30%;
      left: 10px;
    }
    .clear {
      color: #828282;
      top: 30%;
      right: 10px;
    }
  }
`;
