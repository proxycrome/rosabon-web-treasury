import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../../redux/actions/personalInfo/userProfile.actions";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import halfEllipse from "../../../asset/halfEllipse.png";
import YelloBackgroud from "../../../asset/yello-backgroud.png";
import Telephone from "../../../asset/telephone.png";
import HistoryImag from "../../../asset/history.png";
import TransferImg from "../../../asset/transfer.png";
import { AvailableBalance, TransferCard } from "../Accesssories";
import { SuccessConfirm } from "../../Accessories/BVNConfirm";
import ModalComponent from "../../ModalComponent";
import { Input } from "reactstrap";

const Feedback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [IsWithDraw, setIsWithDraw] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tabs, setTabs] = useState("");
  const user_details = useSelector((state) => state.user_profile.users);

  const [show, setShow] = useState(false);

  const handleClick = (value) => {
    console.log(value);
    if (value == "transter") {
      setIsWithDraw(true);
      setIsTransfer(false);
    }
    if (value == "withdraw") {
      setIsWithDraw(false);
      setIsTransfer(true);
    }
  };

  // useEffect(() => {
  //   const tokenString = JSON.parse(localStorage.getItem("token"));
  //   if (tokenString) {
  //     dispatch(getAuthUsers(tokenString));
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div>
      <WrapperBody>
        <ProfileNavBar>
          <h2>Feedback</h2>
        </ProfileNavBar>
        <Wrapper>
          <h4>Select a feedback category to begin</h4>

          <div class="mb-4">
            <div class=" ">
              <div class="input-group mb-4">
                <select
                  class="form-select form-select-lg mb-3 select-field"
                  aria-label=".form-select-lg"
                  //   onClick={handleOnclick}
                  name="companyType">
                  <option value=""></option>
                  <option value="others">Complaints</option>
                  <option value="others">Enquiries</option>
                </select>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <label>Title of Message </label>
            <div className="input-group">
              <Input type="text" className="form-control" />
            </div>
            {/* {errors.name && <h3>{errors.name}</h3>} */}
          </div>
          <div class="pb-4">
            <div class=" ">
              <label>Description </label>
              <div class="input-group mb-4">
                <textarea
                  rows="5"
                  cols="60"
                  placeholder="Enter your message"
                  class="form-control select-field"
                  name="description"></textarea>
              </div>
            </div>
          </div>
        </Wrapper>
      </WrapperBody>
    </div>
  );
};

export default Feedback;

const WrapperBody = styled.div``;

const Wrapper = styled.div`
  width: 80%;
  padding-right: 40%;
  padding-left: 50px;
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
    padding-top: 50px;
    padding-bottom: 20px;
  }
`;
