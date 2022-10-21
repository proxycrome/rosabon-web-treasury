import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import Checked from "../../asset/checked.png";
import Spinner from '../common/loading';

const DebitCardCallback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const parameter = searchParams.get('ref');
  // console.log("param here", parameter)
  const timedOut = () => {
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      timedOut();
    }, "3000")
  },[loading])

  const Spin = () => {
    return (
      <div className="vh-100 w-100">
          <Spinner />
        </div>
    )
  }
  
  const Loaded = () => {
    return (
      <Modal
        show={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <div>
            <>
            <div>
              <Wrapper>
                <div className="d-flex justify-content-center align-items-center">
                  <WrappCongrate>
                    <div className="container">
                      <div className="row">
                        <div className="col text-center">
                          <div>
                            <img
                              className="congrate_confet"
                              src={Checked}
                              alt="Confetti"
                            />
                          </div>
                          <p className="py-5">Plan Successfully Saved</p>
                          <div className="d-flex justify-content-between">
                            <NavLink state={{ myState: false }} to="/plan-list">
                              <button
                                // onClick={handleClose}
                                type="button"
                                className="grey_btn"
                              >
                                Check my investments
                              </button>
                            </NavLink>
                            <NavLink state={{ myState: false }} to="/plan-product">
                              <button
                                // onClick={handleClose}
                                type="button"
                                className="blue_btn"
                              >
                                Invest more
                              </button>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </WrappCongrate>
                </div>
              </Wrapper>
            </div>
          </>
        </div>
      </Modal>
    )
  }

  return (
    <>
      {
        loading ? <Spin /> : <Loaded />
      }
    </>
  )
}

const Wrapper = styled.div``;

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

  .inputField {
    border: 1px solid #e0e0e0;
    height: 56px;
    border-radius: 3px;
    font-size: 20px;
    color: #000;
    flex: 1 0 56px;
    // outline: none;
    // border: none;
  }

  .enclose {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

  .grey_btn {
    font-size: 14px;
    width: 180px;
    height: 41px;
    background: #f2f2f2;
    border-radius: 10px;
    color: #111e6c;
    margin-right: 2rem;
  }

  .blue_btn {
    font-size: 14px;
    width: 180px;
    height: 41px;
    background: #111e6c;
    border-radius: 10px;
    color: #ffffff;
    margin-left: 2rem;
  }
`;

export default DebitCardCallback