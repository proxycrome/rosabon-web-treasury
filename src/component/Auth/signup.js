import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { registerCompany, registerUser } from "../../redux/actions/auth/SignupAction";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = useSelector((state) => state.auth.signup_btn);
  const success = useSelector((state) => state.auth.success);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

  const data = {
    email: "",
    isAssited: "",
    isNewsLetters: "",
    password: "",
    phone: "",
    source: "",
    sourceOthers: "",
    contactFirstName: "",
    contactLastName: "",
    contactMiddleName: "",
    name: "",
    firstName: "",
    lastName: "",
    middleName: "",
    refferedBy: "",
  };

  const [formData, setformData] = useState(data);


  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      isNewsLetters,
      password,
      source,
      sourceOthers,
      phone,
      firstName,
      lastName,
      middleName,
      refferedBy,
    } = formData;
    let individualUser = {
      firstName,
      lastName,
      middleName,
    };
    let data = {
      individualUser,
      email,
      isAssited: true,
      isNewsLetters: isNewsLetters ? true : false,
      password,
      phone,
      role: "INDIVIDUAL_USER",
      source,
      sourceOthers,
      refferedBy,
      usage: "TREASURY",
    };
    console.log(data)
    dispatch(registerUser(data));
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      isNewsLetters,
      password,
      source,
      contactFirstName,
      contactLastName,
      sourceOthers,
      phone,
      name,
      refferedBy,
    } = formData;
    let company = {
      contactFirstName,
      contactLastName,
      name,
    };

    let data = {
      company,
      email,
      isAssited: true,
      isNewsLetters: isNewsLetters ? true : false,
      password,
      phone,
      role: "COMPANY",
      source,
      sourceOthers,
      usage: "TREASURY",
      refferedBy,
    };
    // console.log(data)
    dispatch(registerCompany(data))
    
  };
 

  useEffect(() => {
     if(success) {
      navigate('/congrates', {state: 'success_signup'})
    }
  }, [success]);

  return (
    <div>
      <div className="">
        {count ? (
          <div className="">
            <RightWrapper>
              <h4>Sign up</h4>
              <div className="container">
                <form autoComplete="off" onSubmit={handleUserSubmit}>
                  <LoginInput>
                    <div class="row">
                      <div class="col-md-6 ">
                        <label>First Name</label>
                        <div class="input-group mb-4">
                          <input
                            class="form-control"
                            placeholder="First Name"
                            type="text"
                            onChange={handleChange}
                            name="firstName"
                            value={formData.firstName}
                          />
                        </div>
                      </div>
                      <div class="col-md-6 ps-2 mb-4">
                        <label>Last Name</label>
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Last Name"
                            onChange={handleChange}
                            name="lastName"
                            value={formData.lastName}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label>Email Address</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          onChange={handleChange}
                          name="email"
                          value={formData.email}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label>Mobile Number</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number"
                          onChange={handleChange}
                          name="phone"
                          value={formData.phone}
                        />
                      </div>
                    </div>
                    <div className="mb-4 input_password">
                      <label>Password</label>
                      <div className="input-group">
                        <input
                          type={passwordShown1 ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          onChange={handleChange}
                          name="password"
                          value={formData.password}
                        />
                        <i
                          onClick={togglePassword1}
                          class={
                            passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
                          }
                        ></i>
                      </div>
                    </div>
                    <div className="mb-4 input_password">
                      <label>Confirm Password</label>
                      <div className="input-group">
                        <input
                          type={passwordShown2 ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm Password"
                        />
                        <i
                          onClick={togglePassword2}
                          class={
                            passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                          }
                        ></i>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div class="">
                        <label>How did you hear about us</label>
                        <select
                          class="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg"
                          onChange={handleChange}
                          name="source"
                        >
                          <option value="" selected>
                            Please choose an option
                          </option>
                          <option value="ROSABON_SALES">
                            Rosabon sales executive
                          </option>
                          <option value="ANOTHER_USER">Another user</option>
                          <option value="OTHER">Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="input-group">
                        {formData.source == "OTHER" ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Source Name"
                            onChange={handleChange}
                            name="sourceOthers"
                            value={formData.sourceOthers}
                          />
                        ) : formData.source == "ANOTHER_USER" ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Input referral code"
                            onChange={handleChange}
                            name="refferedBy"
                            value={formData.refferedBy}
                          />
                        ) : formData.source == "ROSABON_SALES" ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Input referral code"
                            onChange={handleChange}
                            name="refferedBy"
                            value={formData.refferedBy}
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Input referral code"
                            onChange={handleChange}
                            name="refferedBy"
                            value={formData.refferedBy}
                          />
                        )}
                      </div>
                    </div>
                    <div className="">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckChecked"
                          onChange={handleChange}
                          name="true"
                          value={formData.isNewsLetters}
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckChecked"
                        >
                          Yes, i want to recieve newsletters of Promos and
                          Offers
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckChecked"
                        >
                          I agree to the Terms and Privacy Policy
                        </label>
                      </div>
                    </div>
                  </LoginInput>
                  <LoginButton>
                    <div className="">
                      <button type="submit">Sign up</button>
                      <p className="text-center">
                        Already have an account?{" "}
                        <span className="">
                          <Link to="/login">Sign in </Link>
                        </span>
                      </p>
                    </div>
                  </LoginButton>
                </form>
              </div>
            </RightWrapper>
          </div>
        ) : (
          <div className="">
            <RightWrapper>
              <h4>Sign up</h4>
              <div className="container">
                <form autoComplete="off" onSubmit={handleCompanySubmit}>
                  <LoginInput>
                    <div className="mb-4">
                      <label>Company Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company Name"
                          onChange={handleChange}
                          name="name"
                          value={formData.name}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 ">
                        <label>Contact Person First name</label>
                        <div class="input-group mb-4">
                          <input
                            class="form-control"
                            placeholder="First Name"
                            type="text"
                            onChange={handleChange}
                            name="contactFirstName"
                            value={formData.contactFirstName}
                          />
                        </div>
                      </div>
                      <div class="col-md-6 ps-2 mb-4">
                        <label>Contact Person Last name</label>
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Last Name"
                            onChange={handleChange}
                            name="contactLastName"
                            value={formData.contactLastName}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label>Contact Person Email Address</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          onChange={handleChange}
                          name="email"
                          value={formData.email}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label>Contact Person Number</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number"
                          onChange={handleChange}
                          name="phone"
                          value={formData.phone}
                        />
                      </div>
                    </div>
                    <div className="mb-4 input_password">
                      <label>Password</label>
                      <div className="input-group">
                        <input
                          type={passwordShown1 ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          onChange={handleChange}
                          name="password"
                          value={formData.password}
                        />
                        <i
                          onClick={togglePassword1}
                          class={
                            passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
                          }
                        ></i>
                      </div>
                    </div>
                    <div className="mb-4 input_password">
                      <label>Confirm Password</label>
                      <div className="input-group">
                        <input
                          type={passwordShown2 ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm Password"
                        />
                        <i
                          onClick={togglePassword2}
                          class={
                            passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                          }
                        ></i>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div class="">
                        <label>How did you hear about us</label>
                        <select
                          class="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg"
                          onChange={handleChange}
                          name="source"
                        >
                          <option value="" selected>
                            Please choose an option
                          </option>
                          <option value="ROSABON_SALES">
                            Rosabon sales executive
                          </option>
                          <option value="ANOTHER_USER">Another user</option>
                          <option value="OTHER">Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="input-group">
                        {formData.source == "OTHER" ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Source Name"
                            onChange={handleChange}
                            name="sourceOthers"
                            value={formData.sourceOthers}
                          />
                        ) : formData.source == "ANOTHER_USER" ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Input referral code"
                            onChange={handleChange}
                            name="refferedBy"
                            value={formData.refferedBy}
                          />
                        ) : formData.source == "ROSABON_SALES" ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Input referral code"
                            onChange={handleChange}
                            name="refferedBy"
                            value={formData.refferedBy}
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Input referral code"
                            onChange={handleChange}
                            name="refferedBy"
                            value={formData.refferedBy}
                          />
                        )}
                      </div>
                    </div>
                    <div className="">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckChecked"
                          onChange={handleChange}
                          name="isNewsLetters"
                          value={formData.isNewsLetters}
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckChecked"
                        >
                          Yes, i want to recieve newsletters of Promos and
                          Offers
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckChecked"
                        >
                          I agree to the Terms and Privacy Policy
                        </label>
                      </div>
                    </div>
                  </LoginInput>
                  <LoginButton>
                    <div className="">
                      <button type="submit">Sign up</button>
                      <p className="text-center">
                        Already have an account?{" "}
                        <span className="">
                          <Link to="/">Sign in </Link>
                        </span>
                      </p>
                    </div>
                  </LoginButton>
                </form>
              </div>
            </RightWrapper>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;


const RightWrapper = styled.section`
  background: #ffffff;
  padding: 8rem 4rem 4rem 4rem;
  @media (max-width: 900px) {
    padding: 4rem 3rem;
  }
  Link {
    text-decoration: none;
  }
  .login-btn {
  }
  .top_login_btn {
    padding-bottom: 50px;
    button {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.04em;
      outline: none;
      border: none;
      background: #ffffff;
    }
    .blue_login_btn {
      background: #111e6c;
      border-radius: 10px;
      padding: 10px 10px;
      outline: none;
      border: none;
      color: #f2f2f2;
      margin-left: 10px;
    }
  }
  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 40px;
    color: #222222;
    padding-bottom: 60px;
  }
  .login_input {
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
    padding-bottom: 15px;
    padding-left: 10px;
  }
`;

const LoginInput = styled.div`
  label,
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
  }
  label {
    padding-bottom: 7px;
    padding-left: 8px;
  }
  span {
    padding-left: 200px;
  }
  .input_password {
    position: relative;
    i {
      position: absolute;
      right: 15px;
      top: 12px;
      cursor: pointer;
    }
  }
`;
const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background: #111e6c;
    border-radius: 10px;
    padding: 10px 120px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    margin-top: 80px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #333333;
    margin-top: 15px;
  }
  span {
    color: rgba(28, 68, 141, 1);
  }
`;
