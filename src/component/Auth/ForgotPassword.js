import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import RFSLogoFullColour from "../../asset/RFSLogoFullColour.png";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions/auth/SignupAction";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.auth.success);

  const data = {
    email: "",
  };
  const [formData, setformData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;
    // console.log(email)
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (success) {
      navigate("/reset-password");
    }
  }, [success]);

  return (
    <WrapperContainer>
      <div className="view_content"></div>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container-fluid">
              <div className="row">
                <div className="col congrate_body">
                  <div className="text-center">
                    <img src={RFSLogoFullColour} alt="RFSLogo" />
                  </div>
                  <h4 className="pt-5">Forgot Password </h4>
                  <p className="">
                    Please, enter your email address. You will receive a link{" "}
                    <br /> to create a new password via email.
                  </p>
                  <div>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <div className="mb-4 text-left ">
                        <label className="pb-2">Email Address</label>
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
                      <div className="text-center">
                        <div>
                            <button className="verify_congrates_btn">
                              Send
                            </button>
                          <p className="text-center">
                            Do you remember your password?
                            <span className="">
                              <Link to="/login"> Try Signing in </Link>{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </WrapperContainer>
  );
}

export default ForgotPassword;

const WrapperContainer = styled.div`
  .view_content {
    background: #111e6c;
    height: 65px;
  }
`;

const Wrapper = styled.div`
  padding: 50px;
  /* padding-top: 5%; */
`;

const WrappCongrate = styled.div`
  .congrate_body {
    padding: 0 6rem;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
  }
  width: 712px;
  height: 523px;
  background: #ffffff;
  justify-content: center;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 40px rgba(225, 234, 254, 0.62);
  @media (max-width: 810px) {
    .congrate_body {
      padding: 3rem;
    }
    h4 {
    font-size: 20px;
    p {
      font-size: 12px;
    }
  }
 
  }
  input {
    width: 479px;
    height: 54px;
  }
  .congrate_eclips {
    position: relative;
    top: -10px;
    right: 35px;
  }
  img {
    width: 73px;
    height: 30px;
  }
  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    text-transform: capitalize;
    color: #242424;
    padding-top: 9px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    color: #4f4f4f;
    padding-top: 9px;
    padding-bottom: 20px;
  }
  .verify_congrates_btn {
    background: #111e6c;
    color: #f2f2f2;
    border-radius: 10px;
    padding: 8px 80px;
  }
`;
