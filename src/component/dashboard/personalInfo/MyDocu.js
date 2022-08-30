import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../../ModalComponent";
import { BVNConfirm } from "../../Accessories/BVNConfirm";
import FileDoc from "../../../asset/file.png";
import User from "../../../asset/user.png";
import { uploadPersonalDocument } from "../../../redux/actions/updateProfile/uploadDocument.action";
import { successMessage } from "../../../redux/actions/auth/SignupAction";

const MyDocu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(true);
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };
  const data = {
    acc_name: "",
    acc_no: "",
    bankType: "",
  };
  const [formData, setformData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { acc_name, acc_no, bankType } = formData;
    let data = { acc_name, acc_no, bankType };
    console.log(data);
    dispatch(uploadPersonalDocument(data));
  };

  useEffect(() => {
    dispatch(successMessage(false));
  }, []);

  // useEffect(() => {
  //   const tokenString = localStorage.getItem("user-token");
  //   if (tokenString) {
  //     dispatch(getAuthUser(tokenString));
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div>
      <WrapperBody>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="banner position-relative">
            <img
              className="position-absolute user-image image-fluid"
              src={User}
              alt="User"
            />
            <i className="camera-font-awe position-absolute fa-solid fa-camera"></i>
          </div>
          <div className="image-holder">
            <div className="row">
              <div className="d-flex justify-content-between">
                <div className="fileText pl-5">
                  <h4 className="">Profile</h4>
                  <small className="">Update your photo and personal details</small>
                </div>
                <div>
                  {showEdit ? (
                    <button onClick={toggleEdit}>Choose file</button>
                  ) : (
                    <button className="grey-button" onClick={toggleEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-md-6 ">
              <label>ID Type</label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg"
                disabled={showEdit}>
                <option selected>National ID card</option>
                <option value="2">Driver’s License </option>
                <option value="2">International Passport</option>
                <option value="2">Voter’s Card </option>
              </select>
            </div>
            <div className="col-md-6 ">
              <label>ID Number</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="123-000-3456"
                  type="text"
                  disabled={showEdit}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
            <div className="row pb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="file-image image-fluid"
                      src={FileDoc}
                      alt="FileDoc"
                    />
                    <div>
                      <h5 className="">Upload ID (front)</h5>
                      <h5 className="">jpg, png. 2 MB</h5>
                    </div>
                  </div>
                  <div className=" style-attachment">
                    <button className="font-awe-btn grey-button" disabled={showEdit}>
                      <i className="fa-solid fa-paperclip"></i>
                    </button>
                    <button
                      className="normal-btn grey-button"
                      disabled={showEdit}>
                      Choose file
                    </button>
                  </div>
                </div>
              </div>
              <div className="row pb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="progress-bar-style d-flex align-items-center justify-content-start">
                    <img
                      className="file-image image-fluid"
                      src={FileDoc}
                      alt="FileDoc"
                    />
                    <div className="progress-bar-style">
                      <h5 className="position-relative">
                        Upload ID (back){" "}
                        <span className="">
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      </h5>
                      <div className="progress" style={{ height: "3px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-30 style-attachment">
                    <button className="font-awe-btn grey-button" disabled={showEdit}>
                      <i className="fa-solid fa-paperclip"></i>
                    </button>
                    <button
                      className="normal-btn grey-button"
                      disabled={showEdit}>
                      Choose file
                    </button>
                  </div>
                </div>
              </div>

              <div className="row pb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      className="file-image image-fluid"
                      src={FileDoc}
                      alt="FileDoc"
                    />
                    <div>
                      <h5 className="">Upload Utility Bill</h5>
                      <h5 className="">jpg, png. 2 MB</h5>
                    </div>
                  </div>
                  <div className=" style-attachment">
                    <button className="font-awe-btn grey-button" disabled={showEdit}>
                      <i className="fa-solid fa-paperclip"></i>
                    </button>
                    <button
                      className="normal-btn grey-button"
                      disabled={showEdit}>
                      Choose file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </WrapperBody>
      <WrapperFooter>
        <div className="footer-body">
          <div className="d-flex align-items-center justify-content-end footer-content">
            <div>
              <button className="blue-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </WrapperFooter>
    </div>
  );
};

export default MyDocu;

const WrapperBody = styled.div`
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }
  padding: 0 2rem 7rem 1rem;
  .style-attachment {
    .font-awe-btn {
      display: none;
    }
    .normal-btn {
      display: block;
    }
  }
  @media (max-width: 900px) {
    padding: 0 2rem 7rem 1rem;
    .style-attachment {
      .normal-btn {
        display: none;
      }
      .font-awe-btn {
        display: block;
        font-size: 20px;
      }
    }
  }

  .banner {
    height: 219px;
    background: #e0e0e0;
    border-radius: 50px 0px 0px 0px;
  }
  .user-image {
    bottom: -80px;
  }
  .fileText {
    padding-left: 130px;
  }
  .progress-bar-style {
    width: 70%;
  }
  .image-holder {
    padding-top: 20px;
  }
  .camera-font-awe {
    bottom: 5px;
    right: 15px;
    font-size: 30px;
    color: #f2f2f2;
    width: 44px;
    height: 44px;
    border-radius: 5px;
    cursor: pointer;
  }
  .grey-button {
    background: #f2f2f2;
    color: #828282;
  }

  .content-doc {
    padding-top: 45px;
  }

  span {
    position: absolute;
    right: 10px;
    color: rgba(17, 30, 108, 1);
    font-size: 20px;
  }

  button {
    background: #111e6c;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px 27px;
    color: #f2f2f2;
    &:disabled {
      cursor: not-allowed;
    }
  }
  .input-font-awe {
    position: absolute;
    top: 8px;
    right: 20px;
    font-size: 25px;
  }
  .font-awe {
    position: absolute;
    top: 8px;
    left: 30px;
    font-size: 25px;
    i {
      padding-right: 15px;
    }
    .font-num {
      padding-left: 75px;
    }
  }
  h5 {
    font-style: normal;
    font-size: 15px;
    letter-spacing: -0.04em;
    color: #333333;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color: #222222;
  }
  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 40px;
    color: #222222;
    padding-bottom: 15px;
    padding-left: 10px;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: -0.02em;
    color: #333333;
    padding-bottom: 65px;
  }
  input, select {
    width: 350px !important;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
  }
  
  select:disabled {
    background: #FFFFFF;
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
    width: 83px;
    height: 54px;
    margin-top: 35px;
    background: #111e6c;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: right;
    color: #ffffff;
  }
`;

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 40px;
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
    width: 300px;
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

// // <div>
//         //   <div className="content-detail">
//         //     <div className="row pb-4">
//         //       <div className="d-flex align-items-center justify-content-between w-100">
//         //         <div className="progress-bar-style d-flex align-items-center justify-content-start">
//         //           <img
//         //             className="file-image image-fluid"
//         //             src={FileDoc}
//         //             alt="FileDoc"
//         //           />
//         //           <div className="progress-bar-style">
//         //             <h5 className="position-relative">
//         //               Upload ID (front){" "}
//         //               <span className="">
//         //                 <i className="fa-solid fa-xmark"></i>
//         //               </span>
//         //             </h5>
//         //             <div className="progress" style={{ height: "3px" }}>
//         //               <div
//         //                 className="progress-bar"
//         //                 role="progressbar"
//         //                 style={{ width: "75%" }}
//         //                 aria-valuenow="25"
//         //                 aria-valuemin="0"
//         //                 aria-valuemax="100"></div>

//         <div>
//         <div className="content-doc">
//           <div className="row pb-4">
//             <div className="d-flex align-items-center justify-content-between w-100">
//               <div className="progress-bar-style d-flex align-items-center justify-content-start">
//                 <img
//                   className="file-image image-fluid"
//                   src={FileDoc}
//                   alt="FileDoc"
//                 />
//                 <div className="progress-bar-style">
//                   <h5 className="position-relative">
//                     Upload ID (front){" "}
//                     <span className="">
//                       <i className="fa-solid fa-xmark"></i>
//                     </span>
//                   </h5>
//                   <div className="progress" style={{ height: "3px" }}>
//                     <div
//                       className="progress-bar"
//                       role="progressbar"
//                       style={{ width: "75%" }}
//                       aria-valuenow="25"
//                       aria-valuemin="0"
//                       aria-valuemax="100"
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-30 style-attachment">
//                 <button className="font-awe-btn grey-button">
//                   <i className="fa-solid fa-paperclip"></i>
//                 </button>
//                 <button className="normal-btn grey-button">
//                   Choose file
//                 </button>
//               </div>
//             </div>
//           </div>
