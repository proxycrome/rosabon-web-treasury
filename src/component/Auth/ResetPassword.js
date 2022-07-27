import React from 'react'
import styled from 'styled-components'
import RFSLogoFullColour from '../../asset/RFSLogoFullColour.png'
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <WrapperContainer>
        <div className='view_content'></div>
        <Wrapper>
            <div className='d-flex justify-content-center align-items-center'>
                <WrappCongrate>
                    <div className='container'>
                        <div className='row' >
                            <div className='col congrate_body'>
                                <div  className='text-center'>
                                    <img src={RFSLogoFullColour} alt='RFSLogo'/>
                                </div>
                                <h4 className='pt-5'>Reset Password</h4>
                                <p className=''>PYour password should include at least 8 characters and should include a <br/> combination of  Upper-case, Lowercase and special characters (@$#%)</p>
                                <div className="mb-4 text-left input_password">
                                    <label className='pb-2'>New Password</label>
                                    <div className="input-group">
                                        <input type="password" className="form-control" placeholder="New Password" />
                                        <i class="far fa-eye-slash"></i>
                                    </div>
                                </div>
                                <div className="mb-4 text-left input_password">
                                    <label className='pb-2'>Confirm Password</label>
                                    <div className="input-group">
                                        <input type="password" className="form-control" placeholder="Confirm Password" />
                                        <i class="far fa-eye-slash"></i>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>
                                        <button className="verify_congrates_btn"><Link to="/login">Reset Password</Link></button>
                                        {/* <button type="button" className="btn verify_congrates_btn">
                                        Reset Password
                                        </button> */}
                                    </div>
                                </div>
                                
                            </div>
                        
                        </div>
                    </div>
                </WrappCongrate>
            </div>
        </Wrapper>
    </WrapperContainer>
  )
}

export default ResetPassword

const WrapperContainer = styled.div `
    .view_content {
        background: #111E6C;
        height: 65px;
    }
`

const Wrapper = styled.div `
    padding-top: 5%;
`;

const WrappCongrate = styled.div `
    .congrate_body {
        padding: 0 5rem;
    }
    label {
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 21px;
        letter-spacing: -0.04em;
        color: #828282;
    }
    .input_password {
        position: relative;
        i {
            position: absolute;
            right: 20px;
            top: 20px;
        }
    }
    width: 712px;
    height: 523px;
    background: #FFFFFF;
    justify-content: center;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 40px rgba(225, 234, 254, 0.62);
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
        color: #4F4F4F;
        padding-top: 9px;
        padding-bottom: 20px;

    }
    .verify_congrates_btn {
        background: #111E6C; 
        color: #F2F2F2;
        border-radius: 10px;
        padding: 8px 80px;
    }
`;