import React from 'react'
import styled from 'styled-components'
import Confetti from '../../asset/confetti.png'
import Ellipse from '../../asset/Ellipse.png'
import { Link } from "react-router-dom";


function Congratulatios() {
  return (
    <Wrapper>
        <div className='d-flex justify-content-center align-items-center'>
            <WrappCongrate>
                <div className='container text-center'>
                    <div className='row' >
                        <div className='col congrate_body'>
                            <div>
                                <img className='congrate_confet' src={Confetti} alt='Confetti'/>
                            </div>
                            <div className='congrate_eclips' >
                                <img src={Ellipse} alt='Ellipse'/>
                            </div>
                            <h4>Congratulations! </h4>
                            <p className=''>your account was created successfully. Please take a moment to verify your <br/> email address. We sent an email with a verification link to Info@optisoft.ng if <br/> you did not receive this in your inbox, please check your spam folder.</p>
                            <button className="verify_congrates_btn"><Link to="/login">Verify E-Mail</Link></button>
                           
                        </div>
                       
                    </div>
                </div>
            </WrappCongrate>
        </div>
    </Wrapper>
    
  )
}

export default Congratulatios

const Wrapper = styled.div `
    padding-top: 7%;
`;

const WrappCongrate = styled.div `
    width: 712px;
    height: 523px;
    background: #FFFFFF;
    justify-content: center;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 40px rgba(225, 234, 254, 0.62);
    .congrate_eclips {
        position: relative;
        top: -10px;
        right: 35px;
        
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
        font-weight: 500;
        font-size: 16px;
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