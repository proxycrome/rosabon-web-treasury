import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import plus from "../../../asset/plus.svg";
import Switch from "react-switch";
import moment from "moment";
import ModalComponent from "../../ModalComponent";
import PlanModal from "./PlanModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getPlans,
  getSinglePlan,
  getProductCategories,
  deletePlan,
  planAction,
  updatePlan,
  viewBankDetail,
} from "../../../store/actions";
import EmptyPlan from "./EmptyPlan";
import { UserBankDetails } from "../Accesssories";
import { Toaster } from "react-hot-toast";
import { Notice } from "../../Accessories/BVNConfirm";
import ClipLoader from "react-spinners/ClipLoader";

export const Plans = () => {
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const [debitPopup, setDebitPopup] = useState(false);
  const [bankDetail, setBankDetail] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filter, setFilter] = useState({
    category: 0,
    startDate: "",
    endDate: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plans, loading, singlePlan } = useSelector((state) => state.plan);
  const { products, categories } = useSelector((state) => state.product);
  const [ width, setWidth] = useState(window.innerWidth);
  const userPlans = plans?.data.body
    ? plans?.data.body?.filter((item) => item.planStatus !== "CLOSED")
    : [];
  const prodCategories = categories?.data.body
    ? categories?.data?.body?.filter((item) => item.status === "ACTIVE")
    : [];
  const planStatus = plans?.statusCode;
  const product = products?.data.body ? products?.data.body : [];

  let filterPlans = userPlans;
  // filter list of plans
  if (filter.category === 0 || filter.category === 9999999) {
    filterPlans = userPlans;
  }
  if (filter.category > 0 && filter.category < 9999999) {
    filterPlans = filterPlans.filter(
      (item) => item.productCategory?.id === filter.category
    );
  }
  if (filter.startDate !== "") {
    filterPlans = filterPlans.filter(
      (item) => moment(filter.startDate) >= moment(item.planSummary.startDate)
    );
  }
  if (filter.endDate !== "") {
    filterPlans = filterPlans.filter(
      (item) => moment(filter.endDate) <= moment(item.planSummary.endDate)
    );
  }

  const currentPlans = more ? filterPlans : filterPlans.slice(0, 6);

  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getProducts());
    dispatch(getProductCategories());
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setFilter({
        ...filter,
        category: Number(e.target.value),
      });
    } else {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePlanModal = async (id) => {
    await dispatch(getSinglePlan(id, setShow, "planModal"));
  };

  const handleBankModal = async (id) => {
    await dispatch(getSinglePlan(id));
    await dispatch(viewBankDetail(id));
    setBankDetail(true);
  };

  const removePlan = async (id) => {
    setDeleteModal(true);
  };

  const setWindowDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowDimensions)
    return () => {
      window.removeEventListener('resize', setWindowDimensions)
    }
  }, [])

  return (
    <Wrapper>
      <Toaster />
      <ModalComponent
        show={show}
        size={width >= 576 ? "md" : "sm"}
        handleClose={() => setShow(false)}
      >
        <PlanModal handleClose={() => setShow(false)} />
      </ModalComponent>
      <ModalComponent
        show={deleteModal}
        size={"md"}
        handleClose={() => setDeleteModal(false)}
      >
        <p className="text-center">Plan will auto delete after 48 hours.</p>
      </ModalComponent>
      <ModalComponent
        show={bankDetail}
        size={"md"}
        handleClose={() => setBankDetail(false)}
      >
        <UserBankDetails type="account-details" />
      </ModalComponent>
      <ModalComponent
        show={debitPopup}
        size={"md"}
        handleClose={() => setDebitPopup(false)}
      >
        <Notice handleClose={() => setDebitPopup(false)} payType="pay-card" />
      </ModalComponent>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <label>Choose Investment Category</label>
          <div className="input-group mb-4">
            <Input
              className="form-control"
              type="select"
              name="category"
              onChange={handleChange}
            >
              <option value={0} hidden>
                Choose Investment Category
              </option>
              <option value={9999999}>All</option>
              {prodCategories.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Input>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <label>Start Date</label>
              <div className="input-group mb-4">
                <Input
                  className="form-control"
                  name="startDate"
                  placeholder="Start Date"
                  onChange={handleChange}
                  type="date"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <label>End Date</label>
              <div className="input-group mb-5">
                <Input
                  type="date"
                  name="endDate"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="End Date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-between mb-3">
          <h4>Here are your investments at a glance</h4>
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/plan-product")}
          >
            <img src={plus} alt="plus" className="mx-2" />
            <span style={{ color: "#111E6C", marginRight: "30px" }}>
              {" "}
              Add More
            </span>
          </div>
        </div>
      </div>
      {filterPlans.length > 0 ? (
        <>
          <div className="plan-content">
            {planStatus === "OK" &&
              currentPlans.map((item) => (
                <div className="plan" key={item.id}>
                  <div
                    className="plan-top h-50 p-4"
                    onClick={() => handlePlanModal(item.id)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h4>{item.planName} </h4>
                        <p className="p-0 m-0">
                          {
                            product?.find(
                              (product) => product.id === item.productId
                            )?.productName
                          }
                        </p>
                      </div>
                      <div className={`${item?.toppingUp && "status-contain"}`}>
                        <h4 className={capitalise(item.planStatus)}>
                          {capitalise(item.planStatus)}{" "}
                        </h4>
                        {item?.toppingUp && (
                          <small className="topping-up">Topping Up</small>
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-4">
                      <div>
                        <h4>Start date</h4>
                        <p className="p-0 m-0">
                          {moment(item.planSummary.startDate).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </div>
                      <div>
                        <h4>End date</h4>
                        <p className="p-0 m-0">
                          {moment(item.planSummary.endDate).format(
                            "DD/MM/YYYY"
                          )}
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
                          {
                            product.find(
                              (product) => product.id === item.productId
                            )?.productName
                          }
                        </p>
                      </div>
                      <DropDown
                        id={item.id}
                        plan={item}
                        status={capitalise(item.planStatus)}
                        handleBankModal={handleBankModal}
                        removePlan={removePlan}
                        currentPlans={currentPlans}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="row"
            style={{
              display: more || filterPlans.length < 7 ? "none" : "auto",
            }}
          >
            <div className="d-flex justify-content-center my-5">
              <button className="btn-view" onClick={() => setMore(true)}>
                View all
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyPlan />
      )}
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
    height: auto;
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
      text-transform: capitalize;
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
  .status-contain {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-top: 10px;
  }
  .topping-up {
    color: #2D9CDB;
    font-size: 12px;
  }
`;

export const DropDown = ({
  id,
  status,
  handleBankModal,
  removePlan,
  plan,
  currentPlans,
}) => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const { plans, singlePlan, loading } = useSelector((state) => state.plan);
  const { products } = useSelector((state) => state.product);
  // const plan = singlePlan?.data.body ? singlePlan?.data.body : {}

  const userPlan = plans?.data.body
    ? plans?.data.body?.find((item) => item.id === id)
    : {};
  const product = products?.data.body
    ? products?.data.body?.find((item) => item.id === userPlan?.product?.id)
    : {};

  const [checkRollover, setCheckRollover] = useState(plan?.autoRollOver);

  const autoRollover = () => {
    setCheckRollover(!checkRollover);
    // dispatch(getSinglePlan(id));
  };

  
  useEffect(() => {
    const selectedPlan = currentPlans?.find((item) => item.id === id);
    if (menu) {
      dispatch(updatePlan(null, selectedPlan?.id, dispatch));
    }
  }, [checkRollover]);


  const toggle = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <Dropdown
      isOpen={menu}
      toggle={toggle}
      className="d-inline-block"
    >
      <DropdownToggle
        tag="a"
        caret={false}
        className="btn header-item waves-effect"
        id="page-header-user-dropdown"
        data-toggle
      >
        <div style={{ width: "100%", height: "100%" }}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </DropdownToggle>
      <DropdownMenu end>
        {status === "Active" ? (
          <>
            <DropdownItem
              tag={Link}
              to={`/plan-topup/${id}`}
              disabled={
                !(
                  product?.properties?.allowsTopUp &&
                  userPlan?.interestReceiptOption === "MATURITY"
                )
              }
            >
              Topup
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/transfer/${id}`}
              disabled={!product?.properties?.allowsTransfer}
            >
              Transfer
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/withdrawal/${id}`}
              disabled={
                !(
                  userPlan?.allowsLiquidation &&
                  product?.properties?.allowsLiquidation
                )
              }
            >
              Withdraw
            </DropdownItem>
            <DropdownItem toggle={false}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ width: "150px" }}
              >
                <div>Auto rollover</div>{" "}
                {loading ? (
                  <ClipLoader color="#111E6C" loading={loading} size={35} />
                ) : (
                  <Switch
                    className="mr-2 mt-1"
                    onColor="#111E6C"
                    onChange={autoRollover}
                    checked={checkRollover}
                    uncheckedIcon={false}
                    width={35}
                    height={18}
                  />
                )}
              </div>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/history/${id}`}>
              History
            </DropdownItem>
          </>
        ) : status === "Pending" ? (
          <>
            <DropdownItem onClick={() => handleBankModal(id)}>
              View account details
            </DropdownItem>
            <DropdownItem tag={Link} to={`/pay-with-card/${id}`}>
              Pay with card
            </DropdownItem>
            <DropdownItem onClick={() => removePlan(id)}>Remove</DropdownItem>
          </>
        ) : status === "Matured" ? (
          <>
            <DropdownItem
              tag={Link}
              to={`/rollover/${id}`}
              disabled={!product?.properties?.acceptsRollover}
            >
              Rollover
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/transfer/${id}`}
              disabled={!product?.properties?.allowsTransfer}
            >
              Transfer
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/withdrawal/${id}`}
              // disabled={
              //   !(
              //     userPlan?.allowsLiquidation &&
              //     product?.properties?.allowsLiquidation
              //   )
              // }
            >
              Withdraw
            </DropdownItem>
            <DropdownItem tag={Link} to={`/history/${id}`}>
              History
            </DropdownItem>
          </>
        ) : status === "Closed" ? (
          <DropdownItem tag={Link} to={`/history/${id}`}>
            History
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};
