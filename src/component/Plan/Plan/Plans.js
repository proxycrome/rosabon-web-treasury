import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import plus from "../../../asset/plus.svg";
import Switch from "react-switch";
import moment from "moment";
import ModalComponent from "../../ModalComponent";
import PlanModal from "./PlanModal";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getPlans, getSinglePlan } from "../../../store/actions";
import EmptyPlan from "./EmptyPlan";
import Spinner from "../../common/loading";

export const Plans = () => {
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans, loading } = useSelector((state) => state.plan);
  const { products  } = useSelector((state) => state.product)
  const userPlans = plans?.data.body ? plans?.data.body : [];
  const planStatus = plans?.statusCode;
  const product = products?.data.body ? products?.data.body : []
  const currentPlans = more ? userPlans : userPlans.slice(0, 6);

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getProducts());
  },[])

  const handlePlanModal = async (id) => {
    await dispatch(getSinglePlan(id))
    setShow(true);
  }

  return (
    <Wrapper>
      <ModalComponent
        show={show}
        size={'md'}
        handleClose={() => setShow(false)}
      >
        <PlanModal 
          handleClose={() => setShow(false)}
        />
      </ModalComponent>
      <div className="row">
        <div className="d-flex justify-content-between mb-3">
          <h4>Here are your investments at a glance</h4>
          <div 
            className="d-flex align-items-center" 
            style={{cursor:"pointer"}} 
            onClick={()=>navigate("/plan-product")}
          >
            <img src={plus} alt="plus" className="mx-2"/>
            <span style={{color: '#111E6C', marginRight: '30px'}}> Add More</span>
          </div>
        </div>
      </div>
      {
        userPlans.length > 0 ? (
          <>
            <div className="plan-content">
              {
                planStatus === "OK" && currentPlans.map((item) => (
                  <div className="plan" key={item.id} >
                    <div className="plan-top h-50 p-4" onClick={() => handlePlanModal(item.id)} >
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4>{item.planName} </h4>
                          <p className="p-0 m-0">
                            {product?.find((product)=>product.id===item.productId)?.productName}
                          </p>
                        </div>
                        <h4 className="Active" >{item.planStatus} </h4>
                      </div>
                      <div className="d-flex align-items-center justify-content-between pt-4">
                        <div>
                          <h4>Start date</h4>
                          <p className="p-0 m-0">
                            {moment(item.planSummary.startDate).format("DD/MM/YYYY")} 
                          </p>
                        </div>
                        <div>
                          <h4>End date</h4>
                          <p className="p-0 m-0">
                            {moment(item.planSummary.endDate).format("DD/MM/YYYY")} 
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex position-relative horizontal-line">
                      <div className="position-absolute horizontal-circle-left"></div>
                      <hr className="dotted" />
                      <div className="position-absolute end-0 horizontal-circle-right"></div>
                    </div>

                    <div className=" h-50 py-1 px-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4>{item.planName} </h4>
                          <p className="p-0 m-0">
                            {product.find((product)=>product.id===item.productId)?.productName}
                          </p>
                        </div>
                        <DropDown status="Active" />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="row" style={{display: more ? "none":"auto"}} >
              <div className="d-flex justify-content-center my-5">
                <button className="btn-view" onClick={()=>setMore(true)} >View all</button>
              </div>  
            </div> 
          </>
        ) : 
        <EmptyPlan />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 40px;
  .plan-top {
    cursor: pointer;
  }
  .plan-content {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 30px
  }
  @media (max-width: 996px) {
    .plan-content {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      padding: 40px;
    }
  }
  @media (max-width: 750px) {
    .plan-content {
      display: grid !important;
      grid-template-columns: repeat(1, 1fr) !important;
      padding: 50px;
    }
  }
  @media (max-width: 500px) {
    .plan-content {
      padding: 20px;
    }
  }
  .dotted {
    width: 100%;
    background: #f9fafb;
    height: 4px;
    border: 0.8px dashed #e0e0e0;
  }
  .horizontal-line {
  }
  .horizontal-circle-left {
    z-index: 5;
    background: #f9fafb;
    border-radius: 0px 30px 30px 0px;
    width: 26px;
    height: 26px;
  }
  .horizontal-circle-right {
    background: #f9fafb;
    border-radius: 0px 30px 30px 0px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    width: 26px;
    height: 26px;
  }
  .plan {
    width: 100%;
    height: 263px;
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.47);
    border-radius: 8px;
    h4 {
      font-weight: 700;
      font-size: 13px;
      line-height: 18px;
    }
    p {
      font-weight: 300;
      font-size: 13px;
      line-height: 16px;
    }
    .Active, .Pending, .Matured {
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }
    .Active {
      color: #219653;
    }
    .Pending {
      color: #F2994A;
    }
    .Matured {
      color: #2D9CDB;
    }
  }
  input {
    background: #fbf8f8;
    border-radius: 5px;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  }
  .btn-view {
    width: 328px;
    height: 54px;
    background: #F2F2F2;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px
    color: #111E6C;
  }
`;

export const DropDown = ({status}) => {
  const [menu, setMenu] = useState(false);
  const [checkRollover, setCheckRollover] = useState(false);

  const toggle = () => {
    setMenu(!menu);
  };


  return (
    <Dropdown
      isOpen={menu}
      toggle={toggle}
      className="d-inline-block"
    >
      <DropdownToggle
        tag="button"
        className="btn header-item waves-effect"
        id="page-header-user-dropdown"
      >
        <div style={{width: "100%", height: "100%"}}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>  
      </DropdownToggle>
      <DropdownMenu end className="mt-1">
        {status === "Active" ? (
          <>
            <DropdownItem tag={Link} to="/plan-topup">Topup</DropdownItem>
            <DropdownItem tag={Link} to="/transfer">Transfer</DropdownItem>
            <DropdownItem tag={Link} to="/withdrawal">Withdraw</DropdownItem>
            <DropdownItem>
              <div className="d-flex align-items-center justify-content-between" style={{width: "150px"}}>
                <div>Auto rollover</div>{" "}
                <Switch
                  className="mr-2 mt-1"
                  onColor="#111E6C"
                  onChange={() => setCheckRollover(!checkRollover)}
                  checked={checkRollover}
                  uncheckedIcon={false}
                  width={35}
                  height={18}
                />
              </div>
            </DropdownItem>
            <DropdownItem tag={Link} to="/history">History</DropdownItem>
          </>
        ) : status === "Pending" ? (
          <>
            <DropdownItem>View account details</DropdownItem>
            <DropdownItem>Pay with card</DropdownItem>
            <DropdownItem>Remove</DropdownItem>
          </>
        ) : status === "Matured" ? (
          <>
            <DropdownItem tag={Link} to="/rollover">Rollover</DropdownItem>
            <DropdownItem tag={Link} to="/transfer">Transfer</DropdownItem>
            <DropdownItem tag={Link} to="/withdrawal">Withdraw</DropdownItem>
            <DropdownItem tag={Link} to="/history">History</DropdownItem>
          </>
        ) : status === "Closed" ? (
          <DropdownItem tag={Link} to="/history">History</DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  )
}
