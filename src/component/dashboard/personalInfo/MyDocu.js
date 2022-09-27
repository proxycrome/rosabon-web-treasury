import React, { useState, useEffect, useRef } from 'react';
import * as types from '../../../redux/constant/auth';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ModalComponent from '../../ModalComponent';
import { OTPVerify } from '../../Accessories/BVNConfirm';
import FileDoc from '../../../asset/file.png';
import User from '../../../asset/user.png';
import Check from '../../../asset/checked.png';
import { uploadPersonalDocument } from '../../../redux/actions/updateProfile/uploadDocument.action';
import { sendOtp } from '../../../redux/actions/personalInfo/userProfile.actions';

const MyDocu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [showEdit, setShowEdit] = useState(true);
  const [base64File, setBase64File] = useState({
    frontEncodedString: '',
    // backEncodedString: '',
    utilityEncodedString: '',
    photoEncodedString: '',
  });
  const photoFileInputRef = useRef();
  const frontFileInputRef = useRef();
  // const backFileInputRef = useRef();
  const utilityFileInputRef = useRef();

  const { users, showEmailOtpModal, otp, otpError, validateEmailOtp } = useSelector(
    (state) => state.user_profile
  );

  const toggleEdit = (e) => {
    setShowEdit(!showEdit);
  };
  const data = {
    idNumber: '',
    idType: '',
  };
  const [formData, setformData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const createOtp = (otp) => {
    setToken(otp);
  };

  const handleFileChange = (e, name) => {
    const { files } = e.target;

    console.log(files[0]);

    const encodedFileBase64 = (file) => {
      let reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          setBase64File({
            ...base64File,
            [name]: reader.result.split('base64,')[1],
          });
        };
        reader.onerror = (error) => {
          console.log('error', error);
        };
      }
    };

    if (
      files[0]?.size <= 2000000 &&
      (files[0]?.type === 'image/jpeg' || files[0]?.type === 'application/pdf')
    ) {
      encodedFileBase64(files[0]);
    }
  };

  console.log(base64File);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      frontEncodedString,
      photoEncodedString,
      utilityEncodedString,
    } = base64File;

    const {
      idType,
      idNumber,
    } = formData;


    if(!frontEncodedString && !idType){
      toast.error("Please Select and Upload your ID")
      return;
    }else if(!frontEncodedString){
      toast.error("Please Upload ID")
      return;
    }else if(!idType) {
      toast.error("Please Select ID Type")
      return;
    }

    let data = {
      idDocumentImage: {
        encodedUpload: frontEncodedString,
      },
      idNumber,
      idType,
      passportPhotographImage: {
        encodedUpload: photoEncodedString,
      },
      utilityBillImage: {
        encodedUpload: utilityEncodedString,
      }

    };
    console.log(data);
    dispatch(uploadPersonalDocument(data));
  };

  const handleFileSelect = (e, reference) => {
    e.preventDefault();
    reference.current.click();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(sendOtp());
  };

  const handleOTPModalClose = () => {
    dispatch({ type: types.CLOSE_MODAL });
    dispatch({ type: types.CLEAR_MESSAGES });
  };

  useEffect(() => {
    if (validateEmailOtp) {
      handleOTPModalClose();
      toggleEdit();
    }
  }, [validateEmailOtp]);

  return (
    <div>
      <Toaster />
      <form autoComplete="off" onSubmit={handleSubmit}>
        <WrapperBody>
          <div className="banner position-relative">
            <div className="position-absolute user-image">
              <div className="">
                <img className="image-fluid" src={User} alt="User" />
                {base64File.photoEncodedString ? (
                  <img
                    className="image-fluid position-absolute"
                    src={Check}
                    alt="check"
                    width="15"
                  />
                ) : null}
              </div>
            </div>

            <input
              type="file"
              className="file"
              accept="image/jpeg"
              ref={photoFileInputRef}
              onChange={(e) => handleFileChange(e, 'photoEncodedString')}
            />
            <i
              className="camera-font-awe position-absolute fa-solid fa-camera"
              onClick={(e) => handleFileSelect(e, photoFileInputRef)}
            ></i>
          </div>
          <div className="image-holder">
            <div className="row">
              <div className="d-flex justify-content-between">
                <div className="fileText pl-5">
                  <h4 className="">Profile</h4>
                  <small className="">
                    Update your photo and personal details
                  </small>
                </div>
                <div>
                  {showEdit ? (
                    <button type="button" onClick={handleSendOtp}>
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="grey-button"
                      onClick={toggleEdit}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <ModalComponent
                show={showEmailOtpModal}
                size={'md'}
                handleClose={handleOTPModalClose}
              >
                <OTPVerify
                  show={showEmailOtpModal}
                  handleClose={handleOTPModalClose}
                  emailOtp={true}
                  updateOtp={(otp) => createOtp(otp)}
                  otpData={otp?.data}
                />
              </ModalComponent>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-md-12 col-lg-6">
              <label>ID Type</label>
              <select
                className="form-select form-select-md mb-3"
                aria-label=".form-select-md"
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                disabled={showEdit}
              >
                <option value="">Select ID Type...</option>
                <option value="NATIONAL_ID_CARD">National ID card</option>
                <option value=" DRIVERS_LICENSE">Driver's License </option>
                <option value="INTERNATIONAL_PASSPORT">International Passport</option>
                <option value="VOTERS_CARD">Voter's Card </option>
              </select>
            </div>
            <div className="col-md-12 col-lg-6">
              <label>ID Number</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="Enter ID Number"
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  disabled={showEdit}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="row pb-4">
                {!base64File.frontEncodedString ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        className="file-image image-fluid"
                        src={FileDoc}
                        alt="FileDoc"
                      />
                      <div>
                        <h5 className="">Upload ID Card</h5>
                        <h5 className="">jpg, pdf, 2MB</h5>
                      </div>
                    </div>
                    <div className=" style-attachment">
                      <input
                        type="file"
                        className="file"
                        ref={frontFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, 'frontEncodedString')
                        }
                      />
                      <button
                        type="button"
                        className="normal-btn grey-button"
                        disabled={showEdit}
                        onClick={(e) => handleFileSelect(e, frontFileInputRef)}
                      >
                        Choose file
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="progress-bar-style d-flex align-items-center justify-content-start">
                      <img
                        className="file-image image-fluid"
                        src={FileDoc}
                        alt="FileDoc"
                      />
                      <div className="progress-bar-style">
                        <h5 className="position-relative">
                          ID Card {' '}
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setBase64File({
                                ...base64File,
                                frontEncodedString: '',
                              })
                            }
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        </h5>
                        <div className="progress" style={{ height: '3px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '75%' }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className=" style-attachment">
                      <input
                        type="file"
                        className="file"
                        ref={frontFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, 'frontEncodedString')
                        }
                      />
                      <button
                        type="button"
                        className="normal-btn grey-button"
                        disabled={showEdit}
                        onClick={(e) => handleFileSelect(e, frontFileInputRef)}
                      >
                        Choose file
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="row pb-4">
                {!base64File.backEncodedString ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        className="file-image image-fluid"
                        src={FileDoc}
                        alt="FileDoc"
                      />
                      <div>
                        <h5 className="">Upload ID (Back)</h5>
                        <h5 className="">jpg, pdf. 2 MB</h5>
                      </div>
                    </div>
                    <div className="w-30 style-attachment">
                      <input
                        type="file"
                        className="file"
                        ref={backFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, 'backEncodedString')
                        }
                      />
                      <button
                        type="button"
                        className="normal-btn grey-button"
                        disabled={showEdit}
                        onClick={(e) => handleFileSelect(e, backFileInputRef)}
                      >
                        Choose file
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="progress-bar-style d-flex align-items-center justify-content-start">
                      <img
                        className="file-image image-fluid"
                        src={FileDoc}
                        alt="FileDoc"
                      />
                      <div className="progress-bar-style">
                        <h5 className="position-relative">
                          Upload ID (back){' '}
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setBase64File({
                                ...base64File,
                                backEncodedString: '',
                              })
                            }
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        </h5>
                        <div className="progress" style={{ height: '3px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '75%' }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-30 style-attachment">
                      <input
                        type="file"
                        className="file"
                        ref={backFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, 'backEncodedString')
                        }
                      />
                      <button
                        type="button"
                        className="normal-btn grey-button"
                        disabled={showEdit}
                        onClick={(e) => handleFileSelect(e, backFileInputRef)}
                      >
                        Choose file
                      </button>
                    </div>
                  </div>
                )}
              </div> */}

              <div className="row pb-4">
                {!base64File.utilityEncodedString ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        className="file-image image-fluid"
                        src={FileDoc}
                        alt="FileDoc"
                      />
                      <div>
                        <h5 className="">Upload Utility Bill</h5>
                        <h5 className="">jpg, pdf, 2 MB</h5>
                      </div>
                    </div>
                    <div className=" style-attachment">
                      <input
                        type="file"
                        className="file"
                        ref={utilityFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, 'utilityEncodedString')
                        }
                      />
                      <button
                        type="button"
                        className="normal-btn grey-button"
                        disabled={showEdit}
                        onClick={(e) =>
                          handleFileSelect(e, utilityFileInputRef)
                        }
                      >
                        Choose file
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="progress-bar-style d-flex align-items-center justify-content-start">
                      <img
                        className="file-image image-fluid"
                        src={FileDoc}
                        alt="FileDoc"
                      />
                      <div className="progress-bar-style">
                        <h5 className="position-relative">
                          Utility Bill{' '}
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setBase64File({
                                ...base64File,
                                utilityEncodedString: '',
                              })
                            }
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        </h5>
                        <div className="progress" style={{ height: '3px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '75%' }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className=" style-attachment">
                      <input
                        type="file"
                        className="file"
                        ref={utilityFileInputRef}
                        onChange={(e) =>
                          handleFileChange(e, 'utilityEncodedString')
                        }
                      />
                      <button
                        type="button"
                        className="normal-btn grey-button"
                        disabled={showEdit}
                        onClick={(e) =>
                          handleFileSelect(e, utilityFileInputRef)
                        }
                      >
                        Choose file
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </WrapperBody>
        <WrapperFooter>
          <div className="footer-body">
            <div className="d-flex align-items-center justify-content-end footer-content">
              <div>
                <button className="blue-btn">Save</button>
              </div>
            </div>
          </div>
        </WrapperFooter>
      </form>
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

  .file {
    display: none;
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
    bottom: -95px;
    left: 47px;
    font-size: 20px;
    color: #252525;
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
  input,
  select {
    width: 350px !important;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
  }

  select {
    &:disabled {
      background: rgba(28, 68, 141, 0.09);
      cursor: not-allowed;
    }
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
