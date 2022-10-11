import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
// import { getWalletBalance } from "../../../redux/actions/wallet/walletAction";
import { getWalletBalance } from "../../../store/actions";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import halfEllipse from "../../../asset/halfEllipse.png";
import Telephone from "../../../asset/telephone.png";
import HistoryImag from "../../../asset/history.png";
import TransferImg from "../../../asset/transfer.png";
import { AvailableBalance, TransferCard } from "../Accesssories";
import { SuccessConfirm } from "../../Accessories/BVNConfirm";
import ModalComponent from "../../ModalComponent";
import Checked from "../../../asset/checked.png";
import Spinner from "../../common/loading";

const UserWallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [IsWithDraw, setIsWithDraw] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const user_details = useSelector((state) => state.user_profile.users);

  const [show, setShow] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [modalValue, setModalvalue] = useState("");
  const [closeFooter, setClosefooter] = useState(false);

  const handleClick = (value) => {
    if (value === "transfer") {
      setIsWithDraw(true);
      setIsTransfer(false);
      setSidebar(true);
      setClosefooter(true);
      setModalvalue(value);
    }
    if (value === "withdraw") {
      setIsWithDraw(false);
      setIsTransfer(true);
      setSidebar(true);
      setClosefooter(true);
      setModalvalue(value);
    }
  };

  const togleSidebar = () => {
    setSidebar(false);
    setClosefooter(false);
  };

  useEffect(() => {
    dispatch(getWalletBalance());
  }, [dispatch]);

  const { walletBalance, loading } = useSelector((state) => state.wallet);

  return (
    <div>
      <WrapperBody>
        <ProfileNavBar>
          <NavTitle>
            <span className="fw-bold">Wallet</span>
          </NavTitle>
        </ProfileNavBar>
        {loading ? (
          <div className="vh-100 w-100">
            <Spinner />
          </div>
        ) : (
          <Wrapper>
            <LeftView>
              <div className="naira-card position-relative">
                <div className="naira-card-content">
                  <img
                    className="position-absolute eclips-image image-fluid"
                    src={halfEllipse}
                    alt="halfEllipse"
                  />
                  {/* <img
                  className="position-absolute set-yellow-background image-fluid"
                  src={YelloBackgroud}
                  alt="YelloBackgroud"
                /> */}
                  <div className="d-flex align-center justify-content-between ">
                    <p className="p-0 m-0">Nuban Account Number</p>
                    <div className="sqr-box">
                      <p className="p-0 m-0">₦</p>
                    </div>
                  </div>
                  <h3 className="pt-1 pb-3">2200 - 1234 - 5678</h3>
                  <div className="down-button pt-4">
                    <p className="p-0 m-0">Balance</p>
                    <h5>
                      ₦{" "}
                      {walletBalance?.amount
                        ? walletBalance?.amount.toFixed(2)
                        : 0}
                    </h5>
                  </div>
                </div>
                <div className="grey-background"></div>
                <div className="yellow-background"></div>
              </div>
              {/* </div> */}
              <div className="py-5">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-center">
                    <div
                      onClick={() => {
                        handleClick("withdraw");
                      }}
                      className="d-flex box-image justify-content-center align-items-center"
                    >
                      <img
                        // onClick={() => handleClick("withdraw")}
                        className=" image-fluid"
                        src={Telephone}
                        alt="Telephone"
                      />
                    </div>
                    <p className="pt-3">Withdraw</p>
                  </div>

                  <div>
                    <div
                      value="transfer"
                      onClick={() => {
                        handleClick("transfer");
                        setClosefooter(true);
                      }}
                      className="d-flex box-image justify-content-center align-items-center"
                    >
                      <img
                        value="transfer"
                        // onClick={() => handleClick("transter")}
                        className=" image-fluid"
                        src={TransferImg}
                        alt="TransferImg"
                      />
                    </div>
                    <p className="pt-3">Transfer</p>
                  </div>
                  <div>
                    <NavLink to="/wallet-history">
                      <div className="d-flex box-image justify-content-center align-items-center">
                        <img
                          className=" image-fluid"
                          src={HistoryImag}
                          alt="HistoryImag"
                        />
                      </div>
                    </NavLink>
                    <p className="pt-3">History</p>
                  </div>
                </div>
              </div>
              <div>
                <NavLink className="style-wallet-link" to="/referral-table">
                  <h3>My Referrals</h3>
                </NavLink>
                <NavLink
                  className="style-wallet-link"
                  to="/referral-table/bonus"
                >
                  <h3>My Referral Bonus</h3>
                </NavLink>
                <NavLink className="style-wallet-link" to="/deposit-table">
                  <h3>My Deposits</h3>
                </NavLink>
                <NavLink className="style-wallet-link" to="/special-earnings">
                  <h3>Rosabon Special Earnings</h3>
                </NavLink>
              </div>
            </LeftView>
            <RightView>
              {sidebar ? (
                <>
                  {isTransfer ? (
                    <>
                      <div className="bank-details">
                        <div className="bank-detail-content">
                          {" "}
                          <AvailableBalance
                            role={user_details?.role}
                          />
                        </div>
                      </div>
                    </>
                  ) : IsWithDraw ? (
                    <>
                      <div className="bank-details">
                        <div className="bank-detail-content">
                          <TransferCard />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </RightView>
          </Wrapper>
        )}
        {closeFooter && modalValue ? (
          <WrapperFooter>
            <div className="footer-body">
              <div className="d-flex align-items-center justify-content-between footer-content">
                <div>
                  <button
                    style={{ color: "#111E6C", width: "300px" }}
                    onClick={togleSidebar}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      backgroundColor: "#111E6C",
                      color: "#FFFFFF",
                      width: "300px",
                    }}
                    onClick={() => {
                      setShow(true);
                      setSidebar(false);
                      // setClosefooter(false)
                    }}
                  >
                    Submit
                  </button>
                  <ModalComponent
                    show={show}
                    size={"md"}
                    handleClose={() => {
                      setShow(false);
                      setClosefooter(false);
                    }}
                  >
                    <div className="">
                      <div className="container">
                        <div className="row">
                          <div className="col text-center">
                            <div>
                              <img
                                className="congrate_confet"
                                src={Checked}
                                alt="Checked"
                              />
                            </div>
                            {modalValue == "transter" ? (
                              <>
                                <p className="pt-5">
                                  Your Transfer was successful
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="pt-5">
                                  Withdrawal Requested Successfully
                                </p>
                              </>
                            )}

                            <div className="pt-5 ">
                              <button
                                type="button"
                                onClick={() => {
                                  setShow(false);
                                  setClosefooter(false);
                                }}
                                style={{
                                  background: "#111e6c",
                                  color: "#f2f2f2",
                                  borderRadius: "10px",
                                  padding: "8px 80px",
                                }}
                                className="verify_congrates_btn"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ModalComponent>
                </div>
              </div>
            </div>
          </WrapperFooter>
        ) : (
          <></>
        )}
      </WrapperBody>
    </div>
  );
};

export default UserWallet;

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

const WrapperBody = styled.div``;

const LeftView = styled.div`
  .style-wallet-link {
    text-decoration: none;
  }
  padding: 40px 60px 60px 60px;
  width: 60%;
  .box-image {
    padding: 20px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(148, 148, 148, 0.25);
    border-radius: 10px;
    cursor: pointer;
  }

  .grey-background {
    position: absolute;
    bottom: 14px;
    right: 1.5%;
    width: 97.3%;
    height: 186px;
    background: #f2f2f2;
    box-shadow: 0px 4px 18px rgba(196, 204, 221, 0.25);
    border-radius: 20px;
    z-index: -2;
  }

  .naira-card-content {
    width: 100% !important;
    height: 192px;
    position: absolute;
    top: 0;
    background: #ffffff;
    box-shadow: 0px 6px 18px rgba(196, 204, 221, 0.25);
    border-radius: 20px;
    padding: 20px;
  }

  .yellow-background {
    position: absolute;
    right: 6.5%;
    bottom: 0;
    width: 88.7%;
    height: 170px;
    background: #f3a712;
    box-shadow: 0px 4px 18px rgba(196, 204, 221, 0.25);
    border-radius: 20px;
    z-index: -5;
  }

  .set-yellow-background {
    top: 20% !important;
    right: -5% !important;
    z-index: -5;
  }
  @media (max-width: 570px) {
    padding: 20px !important;
    .image-holder {
      display: none;
    }
    .choose-plan {
      width: 90% !important;
    }
  }
  .choose-plan {
    width: 448px;
    height: 213px;
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 30px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 148.4%;
      display: flex;
      align-items: flex-end;
      letter-spacing: -0.01em;
      color: #4f4f4f;
    }
  }
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: -0.03em;
    color: #242424;
    padding-top: 60px;
    padding-bottom: 20px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
    padding: 20px 0;
  }
  input {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
    padding-bottom: 15px;
    padding-left: 10px;
  }

  .home-body {
    padding-top: 100px;
    width: 100%;
  }
  .blue-add-btn {
    background: #111e6c !important;
    border-radius: 10px !important;

    p {
      color: #ffffff !important;
    }
  }

  .naira-card {
    width: 513px;
    height: 221px;
  }

  .eclips-image {
    top: 0;
    right: 0;
  }
  .sqr-box {
    margin-right: 20px;
    width: 35px;
    height: 35px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(148, 148, 148, 0.25);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .dashboard {
    padding: 12px 15px !important;
    background: #111e6c;
    border-radius: 8px;
    color: #ffffff;
    span {
      padding-right: 3px;
      font-size: 11px;
    }
  }
  @media (max-width: 920px) {
    width: 90% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    .naira-card {
      width: 100% !important;
      margin: 0 auto;
    }
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
  .verify_congrates_btn {
    background: #111e6c;
    color: #f2f2f2;
    border-radius: 10px;
    padding: 8px 80px;
  }
`;

const RightView = styled.div`
  width: 40%;
  margin-top: 20px;
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    padding: 40px;
    margin-top: -17px;
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

const WrappCongrate = styled.div`
  border-radius: 20px;
  padding: 2rem;
  text-align: left;
  input {
    border: 1px solid #e0e0e0;
    padding: 1rem 2rem;
    border-radius: 3px;
    margin-right: 10px;
    outline: "none";
    border: "none";
  }

  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 150%;
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
