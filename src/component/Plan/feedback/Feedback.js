import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../../redux/actions/personalInfo/userProfile.actions";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import Checked from "../../../asset/checked.png";
import ModalComponent from "../../ModalComponent";
import { Input } from "reactstrap";
import { postFeedback } from "../../../redux/actions/feedback/feedbackAction";

const initialForm = {
  categoryId: "",
  content: "",
  title: ""
}

const Feedback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [feedbackForm, setFeedbackForm] = useState(initialForm)
  const [IsWithDraw, setIsWithDraw] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tabs, setTabs] = useState("");
  const user_details = useSelector((state) => state.user_profile.users);
  const { loading } = useSelector((state) => state.feedback);

  const [show, setShow] = useState(false);

  const handleClick = (value) => {
    console.log(value);
    if (value === "transter") {
      setIsWithDraw(true);
      setIsTransfer(false);
    }
    if (value === "withdraw") {
      setIsWithDraw(false);
      setIsTransfer(true);
    }
  };

  const handleChange = (e) => {
    if(e.target.name === "categoryId") {
      setFeedbackForm({
        ...feedbackForm,
        [e.target.name]: parseInt(e.target.value)
      })
    } else {
      setFeedbackForm({
        ...feedbackForm,
        [e.target.name]: e.target.value
      })
    }
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postFeedback(feedbackForm, setShow));
    setFeedbackForm(initialForm);
  }

  // useEffect(() => {
  //   const tokenString = JSON.parse(localStorage.getItem("token"));
  //   if (tokenString) {
  //     dispatch(getAuthUsers(tokenString));
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <form onSubmit={handleSubmit}>
      <WrapperBody>
        <ProfileNavBar>
          <NavTitle>
            <span className="fw-bold">Feedback</span>
          </NavTitle>
        </ProfileNavBar>
        <Wrapper>
          <h4>Select a feedback category to begin</h4>

          <div className="mb-4">
            <div className=" ">
              <div className="input-group mb-4">
                <select
                  className="form-select form-select-lg mb-3 select-field"
                  aria-label=".form-select-lg"
                  //   onClick={handleOnclick}
                  name="categoryId"
                  onChange={handleChange}
                  value={feedbackForm.categoryId}
                >
                  <option value=""></option>
                  <option value={2}>Complaints</option>
                  <option value={1}>Enquiries</option>
                </select>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <label>Title of Message </label>
            <div className="input-group">
              <Input 
                type="text" 
                className="form-control" 
                name="title"
                onChange={handleChange}
                value={feedbackForm.title}
              />
            </div>
            {/* {errors.name && <h3>{errors.name}</h3>} */}
          </div>
          <div className="pb-4">
            <div className=" ">
              <label>Description </label>
              <div className="input-group mb-4">
                <textarea
                  rows="5"
                  cols="60"
                  placeholder="Enter your message"
                  className="form-control select-field"
                  name="content"
                  onChange={handleChange}
                  value={feedbackForm.content}
                ></textarea>
              </div>
            </div>
          </div>
        </Wrapper>
        <WrapperFooter>
          <div className="footer-body">
            <div className="d-flex align-items-center justify-content-between footer-content">
              <div></div>
              <div>
                <button
                  style={{
                    backgroundColor: "#111E6C",
                    color: "#FFFFFF",
                    width: "300px",
                  }}
                  // onClick={() => {
                  //   setShow(true);
                  // }}
                  type='submit'
                  >
                  {loading ? 'LOADING...' : 'Submit'}
                </button>
                <ModalComponent show={show} size={"md"}>
                  <div className="">
                    <div className="container">
                      <div className="row">
                        <div className="col text-center">
                          <div>
                            <img
                              className="congrate_confet"
                              src={Checked}
                              alt="Checked"
                            />
                          </div>
                          <p className="pt-5">
                            Your feedback has been received
                          </p>
                          <div className="pt-5 ">
                            <button
                              type="button"
                              onClick={() => {
                                setShow(false);
                              }}
                              style={{
                                background: "#111e6c",
                                color: "#f2f2f2",
                                borderRadius: "10px",
                                padding: "8px 80px",
                              }}
                              className="verify_congrates_btn">
                              Ok
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalComponent>
              </div>
            </div>
          </div>
        </WrapperFooter>
      </WrapperBody>
    </form>
  );
};

export default Feedback;

const WrapperBody = styled.div`
  /* height: 100vh; */
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

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 80px;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
  @media (max-width: 800px) {
    .footer-content {
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    button {
      margin: 10px 0;
    }
  }
  button {
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 15px;
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
  .verify_congrates_btn {
    background: #111e6c;
    color: #f2f2f2;
    border-radius: 10px;
    padding: 8px 80px;
  }
`;
