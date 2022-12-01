import React, { useState, useEffect, useRef } from "react";
import {
  CLOSE_MODAL,
  CLEAR_MESSAGES,
} from "../../../store/profile/actionTypes";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../../ModalComponent";
import { OTPVerify } from "../../Accessories/BVNConfirm";
import FileDoc from "../../../asset/file.png";
import User from "../../../asset/user.png";
import Check from "../../../asset/checked.png";
import Spinner from "../../common/loading";
import {
  getUserDocs,
  sendOtp,
  uploadPersonalDocument,
  getAllIdTypes
} from "../../../store/actions";

const MyDocu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [showEdit, setShowEdit] = useState(true);
  const [base64File, setBase64File] = useState({
    frontEncodedString: "",
    // backEncodedString: '',
    utilityEncodedString: "",
    photoEncodedString: "",
  });
  const photoFileInputRef = useRef();
  const frontFileInputRef = useRef();
  // const backFileInputRef = useRef();
  const utilityFileInputRef = useRef();

  const {
    users,
    showEmailOtpModal,
    otp,
    otpError,
    idTypes,
    validateEmailOtp,
    documents,
    loading,
  } = useSelector((state) => state.user_profile);

  const { docMsg, loading:updateLoading } = useSelector((state) => state.updateProfile);

  const toggleEdit = (e) => {
    setShowEdit(!showEdit);
  };
  const data = {
    idNumber: "",
    idTypeId: "",
  };
  const [formData, setformData] = useState(data);

  useEffect(()=> {
    dispatch(getAllIdTypes())
  },[])

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
            [name]: reader.result.split("base64,")[1],
          });
        };
        console.log(reader);
        reader.onerror = (error) => {
          console.log("error", error);
        };
      }
    };

    if (
      files[0]?.size <= 2000000 &&
      (files[0]?.type === "image/jpeg" || files[0]?.type === "application/pdf")
    ) {
      encodedFileBase64(files[0]);
    }
    e.target.value = null;
  };

  console.log(base64File);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { frontEncodedString, photoEncodedString, utilityEncodedString } =
      base64File;

    const { idTypeId, idNumber } = formData;

    // if (!frontEncodedString && !idType) {
    //   toast.error("Please Select and Upload your ID");
    //   return;
    // } else if (!frontEncodedString) {
    //   toast.error("Please Upload ID");
    //   return;
    // } else if (!idType) {
    //   toast.error("Please Select ID Type");
    //   return;
    // }

    let data = {
      idDocumentImage: {
        encodedUpload: frontEncodedString,
        name: "ID Image",
      },
      idNumber,
      idTypeId: parseInt(idTypeId),
      passportPhotographImage: {
        encodedUpload: photoEncodedString,
        name: "Photo Image",
      },
      utilityBillImage: {
        encodedUpload: utilityEncodedString,
        name: "Utility Image",
      },
    };

    const reset = {
      setShowEdit,
      setformData,
      setBase64File,
      getUserDocs,
    };

    console.log(data);
    dispatch(uploadPersonalDocument(data, reset));
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
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: CLEAR_MESSAGES });
  };

  useEffect(() => {
    if (validateEmailOtp) {
      handleOTPModalClose();
      toggleEdit();
    }
  }, [validateEmailOtp]);

  // useEffect(() => {
  //   if (docMsg) {
  //     setShowEdit(true);
  //     setformData({
  //       ...formData,
  //       idNumber: "",
  //       idTypeId: "",
  //     });
  //     setBase64File({
  //       ...base64File,
  //       frontEncodedString: "",
  //       utilityEncodedString: "",
  //       photoEncodedString: "",
  //     });
  //   }
  // }, [docMsg]);

  useEffect(() => {
    if (!documents) {
      dispatch(getUserDocs());
    }
  }, [documents]);

  console.log(documents);

  return (
    <div>
      <Toaster />
      <form autoComplete="off" onSubmit={handleSubmit}>
        {loading ? (
          <div className="vh-100 w-100">
            <Spinner />
          </div>
        ) : (
          <WrapperBody>
            <div className="banner position-relative">
              {documents?.passportPhotographImage?.imageUrl && showEdit ? (
                <div className="position-absolute user-image">
                  <div className="">
                    <img
                      className="image-frame"
                      style={{
                        borderRadius: "50%",
                        border: "6px solid #FFFFFF",
                      }}
                      src={documents?.passportPhotographImage?.imageUrl}
                      alt="User"
                      width="125"
                      height="125"
                    />
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
              ) : (
                <div className="position-absolute user-image">
                  <div className="">
                    <img
                      className="image-frame"
                      style={{
                        borderRadius: "50%",
                        border: "2px solid #FFFFFF",
                      }}
                      src={
                        base64File.photoEncodedString
                          ? `data:image/jpeg;base64,${base64File.photoEncodedString}`
                          : documents?.passportPhotographImage?.imageUrl
                          ? documents?.passportPhotographImage?.imageUrl
                          : User
                      }
                      alt="User"
                      width="125"
                      height="125"
                    />
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
              )}

              <input
                type="file"
                className="file"
                accept="image/jpeg"
                ref={photoFileInputRef}
                onChange={(e) => handleFileChange(e, "photoEncodedString")}
                disabled={showEdit}
              />
              <i
                className={
                  documents?.passportPhotographImage?.imageUrl
                    ? "white-camera-font-awe position-absolute fa-solid fa-camera"
                    : "camera-font-awe position-absolute fa-solid fa-camera"
                }
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
                  size={"md"}
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
                  name="idTypeId"
                  value={formData.idTypeId || documents?.idType?.id}
                  onChange={handleChange}
                  disabled={showEdit}
                >
                  <option value="">Select ID Type...</option>
                  {
                    idTypes?.map((item)=> (
                      <option value={item.id}>{item.name} </option>
                    ))
                  }
                </select>
              </div>
              <div className="col-md-12 col-lg-6">
                <label>ID Number</label>
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder={documents?.idNumber || "Enter ID Number"}
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
                {documents?.idDocumentImage?.imageUrl && showEdit ? (
                  <div className="row pb-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="file-image image-fluid"
                          src={FileDoc}
                          alt="FileDoc"
                        />
                        <div className="d-flex" style={{ columnGap: "10px" }}>
                          <h5 className="image-fluid mr-3">ID Card </h5>
                          <img
                            // className="position-absolute"
                            src={Check}
                            alt="check"
                            width="15"
                            height="15"
                          />
                        </div>
                      </div>
                      <div className=" style-attachment">
                        <a
                          href={documents?.idDocumentImage?.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button
                            type="button"
                            className="normal-btn grey-button"
                          >
                            View
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
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
                              handleFileChange(e, "frontEncodedString")
                            }
                            accept="application/pdf, image/jpeg"
                          />
                          <button
                            type="button"
                            className="normal-btn grey-button"
                            disabled={showEdit}
                            onClick={(e) =>
                              handleFileSelect(e, frontFileInputRef)
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
                              ID Card{" "}
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  setBase64File({
                                    ...base64File,
                                    frontEncodedString: "",
                                  })
                                }
                              >
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
                              handleFileChange(e, "frontEncodedString")
                            }
                          />
                          <button
                            type="button"
                            className="normal-btn grey-button"
                            disabled={showEdit}
                            onClick={(e) =>
                              handleFileSelect(e, frontFileInputRef)
                            }
                          >
                            Choose file
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {documents?.utilityBillImage?.imageUrl && showEdit ? (
                  <div className="row pb-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="file-image image-fluid"
                          src={FileDoc}
                          alt="FileDoc"
                        />
                        <div className="d-flex" style={{ columnGap: "10px" }}>
                          <h5 className="image-fluid mr-3">Utility Bill</h5>
                          <img
                            // className="position-absolute"
                            src={Check}
                            alt="check"
                            width="15"
                            height="15"
                          />
                        </div>
                      </div>
                      <div className=" style-attachment">
                        <a
                          href={documents?.utilityBillImage?.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button
                            type="button"
                            className="normal-btn grey-button"
                          >
                            View
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
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
                              handleFileChange(e, "utilityEncodedString")
                            }
                            accept="image/jpeg, application/pdf"
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
                              Utility Bill{" "}
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  setBase64File({
                                    ...base64File,
                                    utilityEncodedString: "",
                                  })
                                }
                              >
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
                              handleFileChange(e, "utilityEncodedString")
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
                )}
              </div>
            </div>
          </WrapperBody>
        )}

        <WrapperFooter>
          <div className="footer-body">
            <div className="d-flex align-items-center justify-content-end footer-content">
              <div>
                <button
                  className={showEdit ? "grey-button" : "blue-btn"}
                  disabled={showEdit}
                >
                  { updateLoading ? "Saving..." : "Save" }
                </button>
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
    bottom: -90px;
    left: 53px;
    font-size: 20px;
    color: #252525;
    width: 44px;
    height: 44px;
    border-radius: 5px;
    cursor: pointer;
  }

  .white-camera-font-awe {
    bottom: -90px;
    left: 50px;
    font-size: 24px;
    color: #ffffff;
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
      &:disabled {
        cursor: not-allowed;
      }
    }
  }
  button {
    width: 300px;
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 15px;
    &:disabled {
      cursor: not-allowed;
    }
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }

  .grey-button {
    background: #f2f2f2;
    color: #828282;
  }
`;
