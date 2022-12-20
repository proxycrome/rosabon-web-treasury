import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { ProfileNavBar } from '../../../dashboard/ProfileNavbar';
import moment from "moment";
import ModalComponent from "../../../ModalComponent";
import PlanModal from "../PlanModal";
import { useDispatch, useSelector } from "react-redux";
import { 
  getProducts, 
  getSinglePlan,
  getClosedPlans,
  getPlans,
} from "../../../../store/actions";
import EmptyPlan from "../EmptyPlan";

const Archives = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { plans, closed_plans } = useSelector((state) => state.plan);
  const { products  } = useSelector((state) => state.product);
  const closedPlans = closed_plans?.data.body
  ? closed_plans?.data.body?.filter((item) => item.planStatus === "CLOSED")
  : [];
  const closedPlanStatus = closed_plans?.statusCode;
  const product = products?.data.body ? products?.data.body : []
  const archivedPlans = closedPlans;

  console.log(archivedPlans);

  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    // dispatch(getPlans());
    dispatch(getClosedPlans());
    dispatch(getProducts());
  },[dispatch])

  const handlePlanModal = async (id) => {
    await dispatch(getSinglePlan(id))
    setShow(true);
  }

  return (
    <>
      <ProfileNavBar>
          <NavTitle>
            <span className="fw-bold">Plan</span>
          </NavTitle>
        </ProfileNavBar>
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
        {
          archivedPlans.length > 0 ? (
            <>
              <div className="plan-content">
                {
                  closedPlanStatus === "OK" && archivedPlans.map((item) => (
                    <div className="plan" key={item.id} >
                      <div className="plan-top h-50 p-4" onClick={() => handlePlanModal(item.id)} >
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h4>{item.planName} </h4>
                            <p className="p-0 m-0">
                              {product?.find((product)=>product.id===item.productId)?.productName}
                            </p>
                          </div>
                          <h4 className={capitalise(item.planStatus)} >{capitalise(item.planStatus)} </h4>
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
                          <DropDown id={item.id} status="Closed" />
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
          ) : 
          <EmptyPlan plan="archive"/>
        }
        {/* <div className="row">
          <div className="d-flex justify-content-center my-5">
            <button className="btn-view">View all</button>
          </div>
        </div> */}
      </Wrapper>
    </>
  );
};

export default Archives;

const Wrapper = styled.div`
  padding: 40px;
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
    .Closed {
      color: #828282;
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

export const DropDown = ({ status, id }) => {
  const [menu, setMenu] = useState(false);

  const toggle = () => {
    setMenu(!menu);
  };

  return (
    <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
      <DropdownToggle
        tag="button"
        outline
        className="btn header-item waves-effect"
        id="page-header-user-dropdown"
      >
        <div style={{ width: '100%', height: '100%' }}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="mt-1">
        {status === 'Closed' ? (
          <DropdownItem tag={Link} to={`/history/${id}`}>
            History
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

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
