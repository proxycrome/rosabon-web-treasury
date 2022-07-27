import React from 'react'
import styled from 'styled-components'
import RFSLogoFullColour from '../../asset/RFSLogoFullColour.png'
import {Link} from 'react-router-dom'

function ForgotPassword() {
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
                                <h4 className='pt-5'>Forgot Password </h4>
                                <p className=''>Please, enter your email address. You will receive a link <br/> to create a new password via email.</p>
                                <div className="mb-4 text-left ">
                                    <label className='pb-2'>Email Address</label>
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Email Address" />
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>
                                        <button className="verify_congrates_btn"><Link to="/reset-password">Send</Link></button>
                                        {/* <button type="button" className="btn verify_congrates_btn">
                                        Verify E-Mail 
                                        </button> */}
                                        <p className='text-center'>Do you remember your password?<span className=''><Link to="/login"> Try Signing in </Link> </span></p>
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

export default ForgotPassword

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