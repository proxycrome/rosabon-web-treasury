import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Notice, SuccessConfirm } from "../../../Accessories/BVNConfirm";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import ModalComponent from "../../../ModalComponent";
import { getSinglePlan, getPlans } from "../../../../store/actions";
import { Toaster } from "react-hot-toast";
import { getCurrIcon } from "../../Accesssories";

const Transfer = () => {
  const [modalState, setModalState] = useState("Close");
  const [amount, setAmount] = useState("");
  const [receive, setReceive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlePlan, plans } = useSelector((state) => state.plan);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};
  const userPlans = plans?.data.body ? plans?.data.body : [];
  const planStatus = singlePlan?.data.statusCode;

  console.log(userPlans);

  const capitalise = (str) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (receive) {
      setModalState("modal-one");
    }
  };


  useEffect(() => {
    dispatch(getSinglePlan(parseInt(id)));
    dispatch(getPlans());
  }, []);

  const back = () => {
    navigate("/plan-list");
  };

  return (
    <>
      {planStatus === "OK" && (
        <>
          <ProfileNavBar>
            <NavTitle>
              <span className="fw-bold">Plan</span>
            </NavTitle>
          </ProfileNavBar>
          <Toaster />
          <form autoComplete="off" autoCorrect="off" onSubmit={handleSubmit}>
            <Wrapper>
              <LeftView>
                <h4 className="pb-3">Transfer</h4>
                <div className="plan-content">
                  <div className="plan">
                    <div className="plan-top h-50 p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4>{plan.planName}</h4>
                          <p className="p-0 m-0">{plan?.product.productName}</p>
                        </div>
                        <h4 className={capitalise(plan.planStatus)}> 
                          {capitalise(plan.planStatus)}
                        </h4>
                      </div>
                      <div className="d-flex align-items-center justify-content-between pt-4">
                        <div>
                          <h4>Start date</h4>
                          <p className="p-0 m-0">
                            {moment(plan.planSummary.startDate).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </div>
                        <div>
                          <h4>End date</h4>
                          <p className="p-0 m-0">
                            {moment(plan.planSummary.endDate).format(
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

                    <div className="plan-top h-50 py-1 px-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4>Balance</h4>
                          <p className="p-0 m-0 d-flex gap-1">
                            {getCurrIcon(plan?.currency?.name)}
                            {plan?.planSummary?.principal.toLocaleString()}{" "}
                          </p>
                        </div>
                        {/* <i className="fa-solid fa-ellipsis"></i> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="plan-payment">
                  <div className="row my-4 pt-4">
                    <div className="col ">
                      <label>Select an active plan to transfer into</label>
                      <div className="input-group">
                        <select
                          className="form-select form-select-md"
                          aria-label=".form-select-md"
                          name="planName"
                          defaultValue={receive}
                          onChange={(e) => setReceive(e.target.value)}
                          required
                        >
                          <option hidden value={""} disabled>
                            Select an active plan to transfer into
                          </option>
                          {userPlans
                            .filter(
                              (item) =>
                                item.id !== plan.id &&
                                item.planStatus === "ACTIVE"
                            )
                            .map(
                              (item) =>
                                item?.product?.properties?.allowsTopUp &&
                                item?.interestReceiptOption === "MATURITY" && (
                                  <option
                                    key={item.id}
                                    value={JSON.stringify(item)}
                                  >
                                    {item.planName}
                                  </option>
                                )
                            )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col ">
                      <label>Amount to Send</label>
                      <div className="input-group">
                        <div className=" input-group-prepend curr-icon">
                          {getCurrIcon(plan?.currency?.name)}
                        </div>
                        <input
                          className="form-control pl-5 curr-input"
                          placeholder={`${plan.planSummary.principal?.toFixed(
                            2
                          )}`}
                          type="number"
                          value={amount}
                          min={0}
                          onChange={(e) => setAmount(e.target.value)}
                          max={plan.planSummary.principal}
                          required
                        />
                      </div>
                      <label className="d-flex gap-1">
                        Balance is{" "}
                        <span className="d-flex">
                          {getCurrIcon(plan?.currency?.name)}
                          {(
                            plan?.planSummary?.principal -
                            (amount ? parseFloat(amount) : 0)
                          ).toFixed(2)}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </LeftView>
              <RightView>
                <div className="bank-details">
                  {/* <div className="bank-detail-content"> */}
                  {/* <UserBankDetails /> */}
                  {/* </div> */}
                </div>
              </RightView>
            </Wrapper>
            <WrapperFooter>
              <div className="footer-body">
                <div className="d-flex align-items-center justify-content-between footer-content">
                  <div>
                    <button
                      type="button"
                      style={{ color: "#111E6C", width: "300px" }}
                      onClick={back}
                    >
                      Back
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#111E6C",
                        color: "#FFFFFF",
                        width: "300px",
                      }}
                    >
                      Submit
                    </button>
                    <ModalComponent
                      show={modalState === "modal-one"}
                      size={"md"}
                      handleClose={() => setModalState("close")}
                    >
                      <Notice
                        handleClose={() => setModalState("close")}
                        handleShowModalTwo={setModalState}
                        transferForm={{ receive, amount }}
                        plan={plan}
                        transferNotice="transfer"
                      />
                    </ModalComponent>

                    <ModalComponent
                      show={modalState === "modal-two"}
                      size={"md"}
                      handleClose={() => setModalState("close")}
                    >
                      <SuccessConfirm
                        transferNotice="transfer"
                        handleClose={() => setModalState("close")}
                      />
                    </ModalComponent>
                  </div>
                </div>
              </div>
            </WrapperFooter>
          </form>
        </>
      )}
    </>
  );
};

export default Transfer;

const LeftView = styled.div`
  width: 50%;
  padding: 40px;
  .plan-content,
  .plan-payment {
    width: 373px !important;
  }
  @media (max-width: 850px) {
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  .Active,
  .Pending,
  .Matured {
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
    color: #f2994a;
  }
  .Matured {
    color: #2d9cdb;
  }

  .curr-icon {
    position: absolute;
    margin-top: 6px;
    margin-left: 12px;
    z-index: 10;
  }
  .curr-input {
    padding-left: 24px;
  }
`;

const RightView = styled.div`
  width: 50%;
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    height: 70vh;
    padding: 40px;
    background: rgba(28, 68, 141, 0.03);
    display: flex;
    justify-content: center;
  }
  .bank-detail-content {
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 20px;
    width: 373px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 150%;
      letter-spacing: -0.15px;
      color: #242424;
    }
    .bold-text {
      font-weight: 600;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 850px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  /* padding: 40px; */
  display: flex;
  flex-direction: row;
  .verve-card {
    padding-right: 20px;
  }
  .dotted {
    width: 100%;
    background: #f9fafb;
    height: 4px;
    border: 0.8px dashed #e0e0e0;
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
  }

  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  }
`;

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 80px;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
  @media (max-width: 800px) {
    .footer-content {
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    button {
      margin: 10px 0;
    }
  }
  button {
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 15px;
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
`;

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
