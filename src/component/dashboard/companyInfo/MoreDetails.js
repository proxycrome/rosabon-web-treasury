import React from "react";
import styled from "styled-components";
import User from "../../../asset/user.png";

const MoreDetails = () => {
  return (
    <div>
      <WrapperBody>
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-between">
              <h4>
                Director 1{" "}
                <span className="pl-5">
                  <i class="fa-solid fa-angle-down"></i>
                </span>
              </h4>
              <div>
                <button className="cancel-button">Cancel</button>
                <button>Edit</button>
              </div>
            </div>
          </div>
          <div className="details-content">
            <div className="image-holder">
              <div className="row">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center justify-content-center">
                    <img className="image-fluid" src={User} alt="User" />
                    <div>
                      <h5 className="">Upload ID (front)</h5>
                      <p className="">jpg, png. 2 MB</p>
                    </div>
                  </div>
                  <button>Choose file</button>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 ">
                <label>First Name</label>
                <div class="input-group mb-4">
                  <input
                    class="form-control"
                    placeholder="First Name"
                    aria-label="First Name..."
                    type="text"
                  />
                </div>
              </div>
              <div class="col-md-4 ">
                <label>Middle Name</label>
                <div class="input-group mb-4">
                  <input
                    class="form-control"
                    placeholder="Middle Name"
                    aria-label="First Name..."
                    type="text"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <label>Last Name</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    aria-label="Last Name..."
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col ">
                <label>Company Address</label>
                <div class="input-group mb-4">
                  <input class="form-control" placeholder="" type="text" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 ">
                <label>Email Address</label>
                <div class="input-group mb-4">
                  <input class="form-control" placeholder="" type="text" />
                </div>
              </div>
              <div class="col-md-4 ">
                <label>Phone Number</label>
                <div class="input-group mb-4">
                  <input class="form-control" placeholder="" type="text" />
                </div>
              </div>
            </div>
            <div class="row">
              <div className="col-lg-8">
                <div className="row">
                  <div class="col-8 ">
                    <label>Bank verification number (BVN)</label>
                    <div class="input-group mb-4">
                      <input
                        class="form-control"
                        placeholder="Bank verification number (BVN)"
                        aria-label="First Name..."
                        type="text"
                      />
                    </div>
                  </div>

                  <div class="col-4 ">
                    <button
                      //   type="button"
                      //   onClick={() => setShow(true)}
                      className="profile_vify_btn">
                      Verify
                    </button>
                  </div>
                  <div>
                    <div
                      style={{
                        position: "absolute",
                        top: "100px",
                        right: "300px",
                      }}>
                      {/* <ModalComponent
                            show={show}
                            size={"md"}
                            handleClose={() => setShow(false)}>
                            <BVNConfirm show={show} handleClose={() => setShow(false)}/>
                            </ModalComponent> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 ">
                <label>ID Type</label>
                <div class="input-group mb-4">
                  <input
                    class="position-relative form-control"
                    placeholder="First Name"
                    aria-label="First Name..."
                    type="text"
                  />
                  <span className=" input-font-awe">
                    <i class="fa-solid fa-angle-down"></i>
                  </span>
                </div>
              </div>
              <div class="col-md-6 ">
                <label>ID Number</label>
                <div class="input-group mb-4">
                  <input
                    class="form-control"
                    placeholder="Middle Name"
                    aria-label="First Name..."
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperBody>
    </div>
  );
};

export default MoreDetails;

const WrapperBody = styled.div`
  padding: 0 4rem 7rem 1rem;
  .details-content {
    padding-top: 70px;
  }
  @media (max-width: 560px) {
    padding: 0 1rem 7rem 1rem;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color: #222222;
    padding-bottom: 45px;
  }
  .details-content {
    padding-top: 45px;
  }

  .image-holder {
    padding-bottom: 50px;
    /* padding-top: 50px; */
  }
  .input-font-awe {
    position: absolute;
    top: 8px;
    right: 20px;
    font-size: 25px;
  }
  button {
    background: #111e6c;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px 27px;
    color: #f2f2f2;
  }

  h5 {
    font-style: normal;
    font-size: 15px;
    letter-spacing: -0.04em;
    color: #333333;
  }
  input {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
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
  .profile_vify_btn {
    margin-top: 35px;
    background: #111e6c;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: #ffffff;
  }
`;
