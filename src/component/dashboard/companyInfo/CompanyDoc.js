import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import ModalComponent from "../../ModalComponent";
import { OTPVerify } from "../../Accessories/BVNConfirm";
import FileDoc from "../../../asset/file.png";
import User from "../../../asset/user.png";
import Check from "../../../asset/checked.png";
import {
  CLEAR_OTP,
  CLOSE_MODAL,
  CLEAR_MESSAGES,
} from "../../../store/profile/actionTypes";
import {
  getAuthUsers,
  sendCompanyOtp,
  getCompanyDocs,
  uploadCompanyDocument,
  getAllIdTypes,
} from "../../../store/actions";
import Spinner from "../../common/loading";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CompanyDoc = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [ , setToken] = useState("");
  const [showEdit, setShowEdit] = useState(true);
  const [base64File, setBase64File] = useState({
    frontEncodedString: "",
    certOfIncoEncodedString: "",
    utilityEncodedString: "",
    photoEncodedString: "",
    cacEncodedString: "",
    moaEncodedString: "",
  });
  const photoFileInputRef = useRef();
  const frontFileInputRef = useRef();
  const certOfIncoFileInputRef = useRef();
  const utilityFileInputRef = useRef();
  const cacFileInputRef = useRef();
  const moaFileInputRef = useRef();

  const {
    users,
    companyDocs,
    showEmailOtpModal,
    idTypes,
    otp,
    validateEmailOtp,
    loading,
  } = useSelector((state) => state.user_profile);

  const { loading:updateLoading } = useSelector((state) => state.updateProfile);

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  useEffect(() => {
    dispatch(getAllIdTypes());
  }, [dispatch]);

  const data = {
    idNumber: "",
    idTypeId: "",
  };
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createOtp = (otp) => {
    setToken(otp);
  };

  const handleFileChange = (e, name) => {
    const { files } = e.target;

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
        reader.onerror = (error) => {
          console.log({error});
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      frontEncodedString,
      photoEncodedString,
      utilityEncodedString,
      certOfIncoEncodedString,
      cacEncodedString,
      moaEncodedString,
    } = base64File;

    const { idTypeId, idNumber } = formData;

    let data = {
      cacImage: {
        encodedUpload: cacEncodedString,
      },
      certificateOfIncoImage: {
        encodedUpload: certOfIncoEncodedString,
      },
      contactPersonIdentityImage: {
        encodedUpload: frontEncodedString,
      },
      contactPersonIdNumber: idNumber ? idNumber : companyDocs?.idNumber,
      idTypeId: idTypeId ? parseInt(idTypeId) : companyDocs?.idType?.id,
      contactPersonPhotographImage: {
        encodedUpload: photoEncodedString,
      },
      moaImage: {
        encodedUpload: moaEncodedString,
      },
      utilityBillImage: {
        encodedUpload: utilityEncodedString,
      },
    };
    const reset = {
      setShowEdit,
      setFormData,
      setBase64File,
      dispatch,
    };
    dispatch(uploadCompanyDocument(data, reset));
  };

  const handleFileSelect = (e, reference) => {
    e.preventDefault();
    reference.current.click();
  };

  const handleSendOtp = () => {
    const type = "document"
    dispatch(sendCompanyOtp(type));
  };

  const handleOTPModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: CLEAR_MESSAGES });
    dispatch({ type: CLEAR_OTP });
  };

  useEffect(() => {
    if (validateEmailOtp) {
      toggleEdit();
      handleOTPModalClose();
    }
  }, [validateEmailOtp]);

  const reset = () => {
    setBase64File({
      ...base64File,
      frontEncodedString: "",
      certOfIncoEncodedString: "",
      utilityEncodedString: "",
      photoEncodedString: "",
      cacEncodedString: "",
      moaEncodedString: "",
    });
    setFormData({
      ...formData,
      idNumber: "",
      idTypeId: "",
    });
  };

  useEffect(() => {
    if (!users) {
      dispatch(getAuthUsers());
    }
  }, [users, dispatch]);

  useEffect(() => {
    dispatch(getCompanyDocs());
  }, [dispatch]);

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
              {companyDocs?.contactPersonPhotographImage?.imageUrl &&
              showEdit ? (
                <div className="position-absolute user-image">
                  <div className="">
                    <img
                      className="image-frame"
                      style={{
                        borderRadius: "50%",
                        border: "6px solid #FFFFFF",
                      }}
                      src={companyDocs?.contactPersonPhotographImage?.imageUrl}
                      alt="User"
                      width="125"
                      height="125"
                    />
                    {base64File?.photoEncodedString ? (
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
                        base64File?.photoEncodedString
                          ? `data:image/jpeg;base64,${base64File?.photoEncodedString}`
                          : User
                      }
                      alt="User"
                      width="125"
                      height="125"
                    />
                    {base64File?.photoEncodedString ? (
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
                  companyDocs?.contactPersonPhotographImage?.imageUrl
                    ? "white-camera-font-awe position-absolute fa-solid fa-camera"
                    : "camera-font-awe position-absolute fa-solid fa-camera"
                }
                onClick={(e) => handleFileSelect(e, photoFileInputRef)}
              ></i>
            </div>
            <div className="image-holder">
              <div className="row">
                <div className="d-sm-flex justify-content-between">
                  <div className="fileText pl-5">
                    <h4 className="">Company Documents</h4>
                    <small className="">
                      Update your photo and Company Documents
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
                        onClick={() => {
                          toggleEdit();
                          reset();
                        }}
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
                    company="company"
                    otpType="document"
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
                  value={formData?.idTypeId || companyDocs?.idType?.id}
                  onChange={handleChange}
                  disabled={showEdit}
                >
                  <option value="">Select ID Type...</option>
                  {idTypes?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 col-lg-6">
                <label>ID Number</label>
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder={companyDocs?.idNumber || "Enter ID Number"}
                    type="text"
                    name="idNumber"
                    value={formData?.idNumber}
                    onChange={handleChange}
                    disabled={showEdit}
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                {companyDocs?.contactPersonIdImage?.imageUrl && showEdit ? (
                  <div className="row pb-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="file-image image-fluid"
                          src={FileDoc}
                          alt="FileDoc"
                        />
                        <div className="d-flex" style={{ columnGap: "10px" }}>
                          <h5 className="image-fluid mr-3">
                            Company Contact Person ID
                          </h5>
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
                          href={companyDocs?.contactPersonIdImage?.imageUrl}
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
                    {!base64File?.frontEncodedString ? (
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            className="file-image image-fluid"
                            src={FileDoc}
                            alt="FileDoc"
                          />
                          <div>
                            <h5 className="">
                              Upload Company Contact Person ID
                            </h5>
                            <h5 className="">jpg, pdf, 2 MB</h5>
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
                              Company Contact Person ID{" "}
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
                {companyDocs?.certificateOfIncoImage?.imageUrl && showEdit ? (
                  <div className="row pb-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="file-image image-fluid"
                          src={FileDoc}
                          alt="FileDoc"
                        />
                        <div className="d-flex" style={{ columnGap: "10px" }}>
                          <h5 className="image-fluid mr-3">
                            Company/Business Certificate of Incorporation
                          </h5>
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
                          href={companyDocs?.certificateOfIncoImage?.imageUrl}
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
                    {!base64File?.certOfIncoEncodedString ? (
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            className="file-image image-fluid"
                            src={FileDoc}
                            alt="FileDoc"
                          />
                          <div>
                            <h5 className="">
                              Upload Company/Business Certificate of
                              Incorporation
                            </h5>
                            <h5 className="">jpg, pdf, 2 MB</h5>
                          </div>
                        </div>
                        <div className="w-30 style-attachment">
                          <input
                            type="file"
                            className="file"
                            ref={certOfIncoFileInputRef}
                            onChange={(e) =>
                              handleFileChange(e, "certOfIncoEncodedString")
                            }
                          />
                          <button
                            type="button"
                            className="normal-btn grey-button"
                            disabled={showEdit}
                            onClick={(e) =>
                              handleFileSelect(e, certOfIncoFileInputRef)
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
                              Company/Business Certificate of Incorporation{" "}
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  setBase64File({
                                    ...base64File,
                                    backEncodedString: "",
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
                        <div className="w-30 style-attachment">
                          <input
                            type="file"
                            className="file"
                            ref={certOfIncoFileInputRef}
                            onChange={(e) =>
                              handleFileChange(e, "certOfIncoEncodedString")
                            }
                          />
                          <button
                            type="button"
                            className="normal-btn grey-button"
                            disabled={showEdit}
                            onClick={(e) =>
                              handleFileSelect(e, certOfIncoFileInputRef)
                            }
                          >
                            Choose file
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {users?.company?.companyType === "CORPORATE_LIMITED" && (
                  <>
                    {companyDocs?.cacImage?.imageUrl && showEdit ? (
                      <div className="row pb-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center justify-content-center">
                            <img
                              className="file-image image-fluid"
                              src={FileDoc}
                              alt="FileDoc"
                            />
                            <div
                              className="d-flex"
                              style={{ columnGap: "10px" }}
                            >
                              <h5 className="image-fluid mr-3">
                                {`Company CAC - Form CO2 & CO7`}
                              </h5>
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
                              href={companyDocs?.cacImage?.imageUrl}
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
                        {!base64File?.cacEncodedString ? (
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center">
                              <img
                                className="file-image image-fluid"
                                src={FileDoc}
                                alt="FileDoc"
                              />
                              <div>
                                <h5 className="">{`Upload Company CAC - Form CO2 & CO7`}</h5>
                                <h5 className="">jpg, pdf, 2 MB</h5>
                              </div>
                            </div>
                            <div className="w-30 style-attachment">
                              <input
                                type="file"
                                className="file"
                                ref={cacFileInputRef}
                                onChange={(e) =>
                                  handleFileChange(e, "cacEncodedString")
                                }
                              />
                              <button
                                type="button"
                                className="normal-btn grey-button"
                                disabled={showEdit}
                                onClick={(e) =>
                                  handleFileSelect(e, cacFileInputRef)
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
                                  {`Company CAC - Form CO2 & CO7`}{" "}
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      setBase64File({
                                        ...base64File,
                                        backEncodedString: "",
                                      })
                                    }
                                  >
                                    <i className="fa-solid fa-xmark"></i>
                                  </span>
                                </h5>
                                <div
                                  className="progress"
                                  style={{ height: "3px" }}
                                >
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
                            <div className="w-30 style-attachment">
                              <input
                                type="file"
                                className="file"
                                ref={cacFileInputRef}
                                onChange={(e) =>
                                  handleFileChange(e, "cacEncodedString")
                                }
                              />
                              <button
                                type="button"
                                className="normal-btn grey-button"
                                disabled={showEdit}
                                onClick={(e) =>
                                  handleFileSelect(e, cacFileInputRef)
                                }
                              >
                                Choose file
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {companyDocs?.moaImage?.imageUrl && showEdit ? (
                      <div className="row pb-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center justify-content-center">
                            <img
                              className="file-image image-fluid"
                              src={FileDoc}
                              alt="FileDoc"
                            />
                            <div
                              className="d-flex"
                              style={{ columnGap: "10px" }}
                            >
                              <h5 className="image-fluid mr-3">
                                Company Memorandum of Association
                              </h5>
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
                              href={companyDocs?.moaImage?.imageUrl}
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
                        {!base64File?.moaEncodedString ? (
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center">
                              <img
                                className="file-image image-fluid"
                                src={FileDoc}
                                alt="FileDoc"
                              />
                              <div>
                                <h5 className="">
                                  Upload Company Memorandum of Association
                                </h5>
                                <h5 className="">jpg, pdf, 2 MB</h5>
                              </div>
                            </div>
                            <div className="w-30 style-attachment">
                              <input
                                type="file"
                                className="file"
                                ref={moaFileInputRef}
                                onChange={(e) =>
                                  handleFileChange(e, "moaEncodedString")
                                }
                              />
                              <button
                                type="button"
                                className="normal-btn grey-button"
                                disabled={showEdit}
                                onClick={(e) =>
                                  handleFileSelect(e, moaFileInputRef)
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
                                  Company Memorandum of Association{" "}
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      setBase64File({
                                        ...base64File,
                                        backEncodedString: "",
                                      })
                                    }
                                  >
                                    <i className="fa-solid fa-xmark"></i>
                                  </span>
                                </h5>
                                <div
                                  className="progress"
                                  style={{ height: "3px" }}
                                >
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
                            <div className="w-30 style-attachment">
                              <input
                                type="file"
                                className="file"
                                ref={moaFileInputRef}
                                onChange={(e) =>
                                  handleFileChange(e, "moaEncodedString")
                                }
                              />
                              <button
                                type="button"
                                className="normal-btn grey-button"
                                disabled={showEdit}
                                onClick={(e) =>
                                  handleFileSelect(e, moaFileInputRef)
                                }
                              >
                                Choose file
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                {companyDocs?.utilityBillImage?.imageUrl && showEdit ? (
                  <div className="row pb-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="file-image image-fluid"
                          src={FileDoc}
                          alt="FileDoc"
                        />
                        <div className="d-flex" style={{ columnGap: "10px" }}>
                          <h5 className="image-fluid mr-3">
                            Company Utility Bill
                          </h5>
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
                          href={companyDocs?.utilityBillImage?.imageUrl}
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
                    {!base64File?.utilityEncodedString ? (
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            className="file-image image-fluid"
                            src={FileDoc}
                            alt="FileDoc"
                          />
                          <div>
                            <h5 className="">Upload Company Utility Bill</h5>
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
                              Company Utility Bill{" "}
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

export default CompanyDoc;

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

  @media (max-width: 1030px) {
    .block {
      display: block;
    }
  }

  @media (max-width: 900px) {
    padding: 0 2rem 7rem 1rem;
    .style-attachment {
      .normal-btn {
        // display: none;
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
    left: 50px;
    font-size: 24px;
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
