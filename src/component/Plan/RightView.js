import React from 'react'
import styled from 'styled-components'
import halfEllipse from "../../asset/halfEllipse.png";
import ChoosePlanHolder from "../../asset/chooseplaneHolder.png";
import { ProfileNavBar } from '../dashboard/ProfileNavbar';


export const RightView = () => {
    return (
        <RightWrapper>
            <div className='naira-card position-relative'>
                <div className='naira-card-content'>
                    <img
                        className="position-absolute eclips-image image-fluid"
                        src={halfEllipse}
                        alt="halfEllipse"
                    />
                    <div className='d-flex align-center justify-content-between '>
                        <p className='p-0 m-0'>Total Networth</p>
                        <div className='sqr-box'>
                            <p className='p-0 m-0'>₦</p>
                        </div>
                    </div>
                    <h3 className='pt-1 pb-3'>₦ 1,500, 346.00</h3>
                    <div className='down-button pt-4'>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex  align-items-center justify-content-between active-box'>
                                <div className='sqr-box'>
                                    <p className='p-0 m-0'>05</p>
                                </div>
                                <p className='p-0 m-0'>Active Plans</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between active-box'>
                                <p className='p-0 m-0'>+</p>
                                <p className='p-0 m-0'>Add Plan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-body'>
                <div className=''>
                    <h4>Categories</h4>
                    <div>
                        <div className='d-flex align-items-center justify-content-between savins-drop' >
                            <h5>Fix Savings </h5>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                        <p className='para-header'>Choose from a fixed savings plan</p>
                    </div>
                    <div className='choose-plan'>
                        <div className='row'>
                            <div className='d-none d-sm-block col-sm-3'>
                            <img
                                className=""
                                src={ChoosePlanHolder}
                                alt="ChoosePlanHolder"
                            />
                            </div>
                            <div className='col-sm-9'>
                                <h5>Product 1</h5>
                                <div>
                                    <p className='p-0 m-0 pb-2'>Lorem Ipsum is simply dummy text of the </p>
                                    <p className='p-0 m-0 pb-2'> printing and typesetting industry.</p>
                                    <p className='p-0 m-0 pb-2'>Lorem Ipsum is simply dummy text of the </p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='d-none d-sm-block col-sm-3'></div>
                            <div className='col-sm-9'>
                            <button>Create Plan</button>
                            </div>

                        </div>
                    </div>
                    {/* <div className='choose-plan'>
                        <div  className='d-flex align-items-center justify-content-around'>
                            <img
                                className=""
                                src={ChoosePlanHolder}
                                alt="ChoosePlanHolder"
                            />
                            <div>
                                <h5>Product 1</h5>
                                <div>
                                    <p className='p-0 m-0 pb-2'>Lorem Ipsum is simply dummy text of the </p>
                                    <p className='p-0 m-0 pb-2'> printing and typesetting industry.</p>
                                    <p className='p-0 m-0 pb-2'>Lorem Ipsum is simply dummy text of the </p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around'>
                            <div></div>
                            <button>Create Plan</button>
                        </div>
                    </div> */}
                    {/* <div className='choose-plan'>
                        <div  className='d-flex align-items-center justify-content-around'>
                            <img
                                className=""
                                src={ChoosePlanHolder}
                                alt="ChoosePlanHolder"
                            />
                            <div>
                                <h5>Product 1</h5>
                                <div>
                                    <p className='p-0 m-0 pb-2'>Lorem Ipsum is simply dummy text of the </p>
                                    <p className='p-0 m-0 pb-2'> printing and typesetting industry.</p>
                                    <p className='p-0 m-0 pb-2'>Lorem Ipsum is simply dummy text of the </p>
                                </div>
                                
                            </div>
                        </div>
                        <button>Create Plan</button>
                    </div> */}
                    <div>
                        <div className='d-flex align-items-center justify-content-between savins-drop' >
                            <h5>Target Savings</h5>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                        <p className='para-header'>Choose from a fixed savings plan</p>
                    </div>
                    <div>
                        <div className='d-flex align-items-center justify-content-between savins-drop' >
                            <h5>Target Income</h5>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                        <p className='para-header'>Choose from a fixed savings plan</p>
                    </div>
                </div>
            </div>
        </RightWrapper>
    )
    
}

const RightWrapper = styled.div `
    @media (max-width: 900px) {
        /* padding-left: 30px; */
    }
    @media (max-width: 900px) {
        width: 80% !important;
        .naira-card {
            /* width: 100% !important; */
            
        }
    }
    .naira-card-content {
        
    }
    .home-body {
        padding-top: 30px;
    }
    .naira-card {
        height: 212px;
        background: #FFFFFF;
        box-shadow: 0px 6px 18px rgba(196, 204, 221, 0.25);
        border-radius: 20px;
        padding: 20px;
        margin-right: 4rem;
    }
    .eclips-image {
        top: 0;
        right: 0;
    }
    .sqr-box {
        margin-right: 20px;
        width: 35px;
        height: 35px;
        background: #FFFFFF;
        box-shadow: 0px 4px 10px rgba(148, 148, 148, 0.25);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
    .active-box {
        padding: 0.3em 0.8em;
        background: #F2F2F2;
        border-radius: 10px;
        
        p {
            font-weight: 500;
            font-size: 13px;
            line-height: 150%;
            text-align: center;
            letter-spacing: -1px;
            color: #333333;

        }
    }
    .add-plan {
        padding: 5px 50px;
        background: #111E6C;
        border-radius: 10px;
        color: #FFFFFF;
    }
    .savins-drop {
        padding-top: 40px;
        padding-right: 4rem;
    }
    .down-button {
        button {
            font-weight: 500;
            font-size: 11px;
            text-align: center;
            color: #FFFFFF;
            background: #111E6C;
            border-radius: 10px;
            outline: none;
            border: none;
            padding: 0px 30px;
        }
    }
    .choose-plan {
        width: 90%;
        height: 213px;
        background: #FFFFFF;
        box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
        border-radius: 8px;
        padding: 30px 10px;
        margin-top: 30px;
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 148.4%;
            display: flex;
            align-items: flex-end;
            letter-spacing: -0.01em;
            color: #4F4F4F;
        }
        button {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            text-align: right;
            letter-spacing: -0.03em;
            color: #111E6C;
            background: #F2F2F2;
            border-radius: 10px;
            outline: none;
            border: none;
            padding: 10px 30px;
            /* margin-left: 140px; */
            margin-top: 10px;
        }
    }
   

`