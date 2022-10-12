import React from "react";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import styled from "styled-components";
import { Input } from "reactstrap";
import { useSelector } from "react-redux";

const AdminMessage = () => {
  const { single_ticket } = useSelector((state) => state.feedback)
  const ticket = single_ticket ? single_ticket : {}
  return (
    <div>
      <WrapperBody>
        <ProfileNavBar>
          <NavTitle>
            <span className="fw-bold">Feedback</span>
          </NavTitle>
        </ProfileNavBar>
        <Wrapper>
          <h4 className="title">Title </h4>
          <p className="p-0 m-0">{ticket?.title} </p>
          <h4 className="pt-4">Message</h4>
          {/* <p className="p-0 m-0">
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.{" "}
          </p> */}
          <p className="p-0 m-0">{ticket?.message} {" "}</p>
          <div className="message pt-4">
            <h4>Admin</h4>
            <p className="p-0 m-0">
              The passage experienced a surge in popularity during the 1960s
              when Letraset used it on their dry-transfer sheets, and again
              during the 90s as desktop publishers bundled the text with their
              software.{" "}
            </p>
          </div>
          <div className="">
            <div className="d-flex align-items-center justify-content-between">
              <div className="input-group">
                <Input type="text" className="form-control" />
              </div>
              <div className="ml-2">
                <button className="grey_btn">Submit</button>
              </div>
            </div>
          </div>
        </Wrapper>
      </WrapperBody>
    </div>
  );
};

export default AdminMessage;

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
  padding-right: 40%;
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
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 150%;
    letter-spacing: -0.15px;
    color: #242424;
    /* padding-top: 50px; */
    /* padding-bottom: 20px; */
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
  .message {
    padding-left: 50px;
    padding-bottom: 100px;
  }

  .grey_btn {
    font-size: 14px;
    width: 120px;
    height: 41px;
    background: #f2f2f2;
    border-radius: 10px;
    color: #111e6c;
    margin-right: 2rem;
  }
`;
