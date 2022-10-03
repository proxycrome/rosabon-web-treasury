import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { LoginLeftView } from './loginLeftView'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { loginUser } from '../../store/actions'
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  InputGroup,
  InputGroupText,
} from 'reactstrap'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const { login, isLoggedIn, isLoading } = auth

  const user_profile = useSelector((state) => state.user_profile)
  const { users } = user_profile
  const data = {
    email: '',
    password: '',
  }
  const [passwordShown, setPasswordShown] = useState(false)
  const [emailError, setError] = useState(false)
  const [formData, setformData] = useState(data)

  const togglePassword1 = () => {
    setPasswordShown(!passwordShown)
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleChange = (e) => {
    setError(false)
    const { name, value } = e.target
    setformData({
      ...formData,
      [name]: value,
    })
  }

  const handleUserSubmit = (e) => {
    e.preventDefault()
    setError(false)
    const { email, password } = formData
    if (!isValidEmail(email)) {
      return setError(true)
    }
    let data = {
      email,
      password,
      platformType: 'WEB',
    }
    dispatch(loginUser(data, navigate))
  }
  // useEffect(() => {
  //   if (users && users.kyc && users.role === "COMPANY") {
  //     navigate("/company-profile");
  //   } else if (users && users.kyc && users.role === "INDIVIDUAL_USER") {
  //     navigate("/personal-profile");
  //   } else if (isLoggedIn || users) {
  //     if (
  //       (login && login.role && login.role.name === "COMPANY") ||
  //       (users && users.role === "COMPANY")
  //     ) {
  //       navigate("/kyc/company");
  //     } else if (
  //       (login && login.role && login.role.name === "INDIVIDUAL_USER") ||
  //       (users && users.role === "INDIVIDUAL_USER")
  //     ) {
  //       navigate("/kyc/person");
  //     }
  //   }
  // }, [isLoggedIn, users]);

  return (
    <WrapperContainer>
      <div>
        <LoginLeftView />
      </div>
      <div className="">
        <RightWrapper>
          <Toaster/>
          <h4>Login</h4>
          <div className="container">
            <Form autoComplete="off" onSubmit={handleUserSubmit}>
              <FormGroup className="w-100">
                <Label htmlFor="email" className="card-title fw-bold fs-5 mb-2">
                  Email Address
                </Label>
                <Input
                  type="email"
                  name="email"
                  className="w-100"
                  bsSize="lg"
                  onChange={handleChange}
                  invalid={emailError}
                />
                <FormFeedback>Valid Email is Required</FormFeedback>
              </FormGroup>
              <FormGroup className="w-100">
                <Label htmlFor="email" className="card-title fw-bold fs-5 mb-2">
                  Password
                </Label>
                <InputGroup>
                  <Input
                    type={passwordShown ? 'text' : 'password'}
                    bsSize="lg"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                  <InputGroupText>
                    <i
                      onClick={togglePassword1}
                      style={{ cursor: 'pointer' }}
                      className={
                        passwordShown ? 'far fa-eye' : 'far fa-eye-slash'
                      }
                    ></i>
                  </InputGroupText>
                </InputGroup>
                <FormFeedback>Password</FormFeedback>
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <FormGroup check>
                  <Input type="checkbox" />
                  <Label check>Stay signed in</Label>
                </FormGroup>
                <span className="card-title">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </span>
              </div>
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="btn btn-primary px-5 mb-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'LOADING...' : 'Login'}
                </button>
                <p>
                  Don’t have an account?{' '}
                  <span className="">
                    <Link to="/register-user">Sign up</Link>
                  </span>
                </p>
              </div>
            </Form>
          </div>
          <div className="container"></div>
        </RightWrapper>
      </div>
    </WrapperContainer>
  )
}

export default Login

const WrapperContainer = styled.div`
  height: 100vh;
  display: grid;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`

const RightWrapper = styled.section`
  background: #ffffff;
  padding: 6rem 4rem 4rem 4rem;
  @media (max-width: 900px) {
    padding: 4rem 3rem;
  }
  @media (max-width: 500px) {
    padding: 4rem 1rem;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    // width: 239.5px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
    font-weight: 500;
    font-size: 17px;
    line-height: 16px
    letter-spacing: -0.04em;
    color: #333333;
  }

  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 40px;
    color: #222222;
    padding-bottom: 60px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #e20d0d;
    padding-top: 12px;
  }
  .login_input {
  }

  label {
    font-style: normal;
    font-weight: 500;
    font-size: 17px !important;
    line-height: 21px;
    
    color: #828282;
  }
`
