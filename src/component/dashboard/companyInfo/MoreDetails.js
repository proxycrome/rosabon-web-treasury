import React, { useState, useEffect, useRef } from "react";
import { UncontrolledTooltip, Alert } from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { Collapse } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import User from "../../../asset/user.png";
import FileDoc from "../../../asset/file.png";
import Check from "../../../asset/checked.png";
import plus from "../../../asset/plus.svg";
import Canceled from "../../../asset/cnaceled.png";
import {
  verifyBvn,
  sendCompanyOtp,
  updateDirectorDetails,
  getDirectorDetails,
  deleteDirector,
  getAllIdTypes,
} from "../../../store/actions";
import ModalComponent from "../../ModalComponent";
import { BVNConfirm, OTPVerify } from "../../Accessories/BVNConfirm";
import AddDirectors from "./AddDirectors";
import Spinner from "../../common/loading";
import {
  CLEAR_OTP,
  CLOSE_MODAL,
  CLEAR_MESSAGES,
} from "../../../store/profile/actionTypes";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MoreDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showOne, setShowOne] = useState(true);
  const [showEdit, setShowEdit] = useState(true);
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [addDirectors, setAddDirectors] = useState(false);
  const [directorField, setDirectorField] = useState([]);
  const [base64File, setBase64File] = useState({
    frontEncodedString: "",
    photoEncodedString: "",
  });

  const photoFileInputRef = useRef(null);
  const frontFileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const idCardInputRef = useRef(null);
  const currIdCardInputRef = useRef(null);

  const {
    showBvnModal,
    bvnError,
    bvnMessage,
    showEmailOtpModal,
    otp,
    otpError,
    validateEmailOtp,
    id,
    idTypes,
  } = useSelector((state) => state.user_profile);

  const { directors, loading, deleteDirectorMsg, directorMsg } = useSelector(
    (state) => state.updateProfile
  );

  const [col1, setCol1] = useState("");
  const [col2, setCol2] = useState("");

  const t_col1 = (val) => {
    if (col1 === val) {
      setCol1("");
    } else {
      setCol1(val);
    }
  };

  const t_col2 = (val) => {
    if (col2 === val) {
      setCol2("");
    } else {
      setCol2(val);
    }
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const createOtp = (otp) => {
    setToken(otp);
  };

  const data = {
    firstName: "",
    lastName: "",
    middleName: "",
    address: "",
    email: "",
    phone: "",
    bvn: "",
    idTypeId: "",
    idNumber: "",
  };
  const [formData, setformData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneValueChange = (value) => {
    setformData({
      ...formData,
      phone: value,
    });
  };

  const updateNames = (firstName, lastName) => {
    setformData({
      ...formData,
      firstName,
      lastName,
    });
    // console.log(firstName, lastName);
  };

  const [editFormData, setEditFormData] = useState({
    [`firstName${col2}`]: "",
    [`middleName${col2}`]: "",
    [`lastName${col2}`]: "",
    [`address${col2}`]: "",
    [`email${col2}`]: "",
    [`phone${col2}`]: "",
    [`bvn${col2}`]: "",
    [`idTypeId${col2}`]: "",
    [`idNumber${col2}`]: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditPhoneValueChange = (value) => {
    setEditFormData({
      ...editFormData,
      [`phone${col2}`]: value,
    });
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

  const updateMoreDirector = (values) => {
    const newDirector = {
      id: new Date().getTime().toString(),
      ...values,
    };
    setDirectorField([...directorField, newDirector]);
  };

  function validateform(values) {
    let errors = {};

    if (!values.firstName) {
      errors.firstName = "first name is required";
    }
    // if (!values.middleName) {
    //   errors.middleName = "Middle name is required";
    // }

    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    if (!values.email) {
      errors.email = "Email address is required";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    }

    if (!values.idTypeId) {
      errors.idTypeId = "ID Type is required";
    }

    if (!values.idNumber) {
      errors.idNumber = "ID Number is required";
    }

    if (!values.bvn) {
      errors.bvn = "BVN is required";
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (directors?.length > 0) {
      const director = directors?.find((item) => item.id === col2);
      const data = {
        id: col2,
        firstName: editFormData[`firstName${col2}`] || director?.firstName,
        lastName: editFormData[`lastName${col2}`] || director?.lastName,
        middleName: editFormData[`middleName${col2}`] || director?.middleName,
        phone: editFormData[`phone${col2}`] || director?.phone,
        email: editFormData[`email${col2}`] || director?.email,
        address: editFormData[`address${col2}`] || director?.address,
        bvn: editFormData[`bvn${col2}`] || director?.bvn,
        idTypeId:
          Number(editFormData[`idTypeId${col2}`]) || Number(director?.idType?.id),
        idNumber: editFormData[`idNumber${col2}`] || director?.idNumber,
        idDocumentImage: {
          encodedUpload: base64File[`frontEncodedString${col2}`],
        },
        passportImage: {
          encodedUpload: base64File[`photoEncodedString${col2}`],
        },
      };
      dispatch(updateDirectorDetails(data, reset, dispatch));
    }

    if (directorField?.length > 0) {
      let formArr = [];
      formArr.push(...directorField);

      const dirArr = formArr?.map((item) => {
        const { id, no, ...others } = item;
        return { ...others };
      });
      dispatch(updateDirectorDetails(dirArr, reset, dispatch));
    } else {
      setErrors(validateform(formData));
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    let formArr = [];
    if (Object.keys(errors).length === 0 && isSubmitted) {
      // if (!bvnMessage?.isNameMatched) {
      //   toast.error("Verify Your BVN");
      //   return;
      // }
      const {
        firstName,
        middleName,
        lastName,
        phone,
        email,
        address,
        bvn,
        idTypeId,
        idNumber,
      } = formData;

      const { frontEncodedString, photoEncodedString } = base64File;

      const data = {
        no: 1,
        firstName,
        lastName,
        middleName,
        phone,
        email,
        address,
        bvn,
        idTypeId: Number(idTypeId),
        idNumber,
        idDocumentImage: {
          encodedUpload: frontEncodedString,
        },
        passportImage: {
          encodedUpload: photoEncodedString,
        },
      };

      formArr.push(data);

      formArr.push(...directorField);

      const otherArr = formArr.map((data) => {
        const { id, no, ...others } = data;
        return { ...others };
      });

      dispatch(updateDirectorDetails(otherArr, reset, dispatch));
    }
  }, [errors]);

  const handleFileSelect = (e, reference) => {
    e.preventDefault();
    reference.current.click();
  };

  const handleVerifyBVN = (e, id, dirId, edit) => {
    e.preventDefault();

    const director = directors?.find((item) => item.id === dirId);

    if (directors.length > 0 && edit) {
      const objData = {
        firstName:
          editFormData[`firstName${dirId}`]?.toUpperCase() ||
          director?.firstName?.toUpperCase(),
        lastName:
          editFormData[`lastName${dirId}`]?.toUpperCase() ||
          director?.lastName?.toUpperCase(),
        id: editFormData[`bvn${dirId}`] || director?.bvn,
        isSubjectConsent: true,
        phoneNumber: editFormData[`phone${dirId}`] || director?.phone,
      };

      dispatch(verifyBvn(objData, id));
      return;
    }

    const { firstName, lastName, bvn, phone } = formData;

    const objData = {
      firstName: firstName?.toUpperCase(),
      lastName: lastName?.toUpperCase(),
      id: bvn,
      isSubjectConsent: true,
      phoneNumber: phone,
    };

    dispatch(verifyBvn(objData, id));
  };

  const handleBVNModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const handleOTPModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: CLEAR_MESSAGES });
    dispatch({ type: CLEAR_OTP });
  };

  const handleSendOtp = () => {
    dispatch(sendCompanyOtp());
  };

  useEffect(() => {
    if (validateEmailOtp) {
      toggleEdit();
      handleOTPModalClose();
    }
  }, [validateEmailOtp]);

  const countNumbers = () => {
    let num = [];
    for (let i = 0; i <= 10; i++) {
      num[i] = i;
    }
    return num;
  };

  const handleDeleteDirector = (id) => {
    dispatch(deleteDirector(id, setShowModal));
  };

  const reset = () => {
    setformData({
      ...formData,
      firstName: "",
      lastName: "",
      middleName: "",
      address: "",
      email: "",
      phone: "",
      bvn: "",
      idTypeId: "",
      idNumber: "",
    });

    setBase64File({
      ...base64File,
      frontEncodedString: "",
      photoEncodedString: "",
    });
  };

  const deleteDirectorDetails = (id) => {
    const rem = directorField?.filter((item) => item.id !== id);
    setDirectorField(rem);
  };


  useEffect(() => {
    dispatch(getAllIdTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDirectorDetails());
    setDirectorField([]);
  }, [dispatch, deleteDirectorMsg, directorMsg]);

  return (
    <div>
      <Toaster />
      <form autoComplete="off" onSubmit={handleSubmit}>
        <WrapperBody>
          <div className="container-fluid">
            {loading ? (
              <div className="vh-100 w-100">
                <Spinner />
              </div>
            ) : directors?.length > 0 ? (
              <>
                <div className="mt-2 d-flex justify-content-end">
                  {showEdit ? (
                    <button
                      type="button"
                      className="btn_bg_blue"
                      onClick={handleSendOtp}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="grey-btn"
                      onClick={() => {
                        toggleEdit();
                        if (
                          directorField?.length <= 0 &&
                          directors?.length <= 0
                        ) {
                          reset();
                        }
                      }}
                    >
                      Cancel
                    </button>
                  )}
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
                    />
                  </ModalComponent>
                </div>
                {directors?.map((item, index) => (
                  <div key={item.id}>
                    <div className="row mt-4">
                      <div className="d-flex justify-content-between mt-2">
                        <h4>
                          Director {index + 1}{" "}
                          <span
                            className="pl-5"
                            onClick={() => t_col2(item.id)}
                          >
                            {col2 === item.id ? (
                              <i className="fa-solid fa-angle-up arrow"></i>
                            ) : (
                              <i className="fa-solid fa-angle-down arrow"></i>
                            )}
                          </span>
                        </h4>
                      </div>
                    </div>
                    {item.id === col2 ? (
                      <div className="details-content">
                        {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
                        <div className="d-flex flex-column align-items-end">
                          <button
                            type="button"
                            className={`${directors?.length < 2 ? "grey-button" : " red-button mb-5"}`}
                            onClick={() => setShowModal(true)}
                            disabled={directors?.length < 2}
                          >
                            Delete Director
                          </button>
                        </div>
                        <Collapse isOpen={col2 === item.id}>
                          <ModalComponent
                            show={showModal}
                            size={"md"}
                            handleClose={() => setShowModal(false)}
                          >
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
                                              src={Canceled}
                                              alt="Canceled"
                                            />
                                          </div>
                                          <p className="pt-5">
                                            This action will delete the selected{" "}
                                            <br />
                                            director's details
                                          </p>
                                          <div className="pt-5 ">
                                            <button
                                              type="button"
                                              className="btn grey_btn"
                                              onClick={() =>
                                                setShowModal(false)
                                              }
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              type="button"
                                              className="btn blue_btn"
                                              onClick={() =>
                                                handleDeleteDirector(col2)
                                              }
                                            >
                                              Okay
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </WrappCongrate>
                                </div>
                              </Wrapper>
                            </div>
                          </ModalComponent>
                          <div className="image-holder">
                            <div className="row">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center justify-content-center">
                                  {base64File[`photoEncodedString${col2}`] &&
                                  !showEdit ? (
                                    <img
                                      className="image-frame"
                                      style={{
                                        borderRadius: "50%",
                                        border: "2px solid #FFFFFF",
                                      }}
                                      src={
                                        base64File[`photoEncodedString${col2}`]
                                          ? `data:image/jpeg;base64,${
                                              base64File[
                                                `photoEncodedString${col2}`
                                              ]
                                            }`
                                          : User
                                      }
                                      alt="User"
                                      width="125"
                                      height="125"
                                    />
                                  ) : (
                                    <img
                                      className="image-frame"
                                      style={{
                                        borderRadius: "50%",
                                        border: "2px solid #FFFFFF",
                                      }}
                                      src={
                                        item?.passportImage?.imageUrl
                                          ? item?.passportImage?.imageUrl
                                          : User
                                      }
                                      alt="User"
                                      width="125"
                                      height="125"
                                    />
                                  )}

                                  {base64File[`photoEncodedString${col2}`] ? (
                                    <img
                                      className="image-fluid align-self-start"
                                      src={Check}
                                      alt="check"
                                      width="15"
                                    />
                                  ) : null}
                                  <div className="ml-2">
                                    <h5 className="">
                                      Upload Your Passport Photo
                                    </h5>
                                    <p className="">jpg, 2 MB</p>
                                  </div>
                                </div>
                                <div>
                                  <input
                                    type="file"
                                    className="file"
                                    accept="image/jpeg"
                                    ref={imageInputRef}
                                    onChange={(e) =>
                                      handleFileChange(
                                        e,
                                        `photoEncodedString${col2}`
                                      )
                                    }
                                    disabled={showEdit}
                                  />
                                  {!showEdit ? (
                                    <button
                                      type="button"
                                      className="btn_bg_blue"
                                      onClick={(e) =>
                                        handleFileSelect(e, imageInputRef)
                                      }
                                    >
                                      Choose file
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="normal-btn grey-button"
                                      disabled={showEdit}
                                    >
                                      Choose file
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4 mb-4">
                              <label>First Name</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={item?.firstName || "First Name"}
                                  name={`firstName${col2}`}
                                  defaultValue={
                                    editFormData[`firstName${col2}`] ||
                                    item?.firstName
                                  }
                                  onChange={handleEditChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 mb-4">
                              <label>Middle Name</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={
                                    item?.middleName || "Middle Name"
                                  }
                                  name={`middleName${col2}`}
                                  defaultValue={
                                    editFormData[`middleName${col2}`] ||
                                    item?.middleName
                                  }
                                  onChange={handleEditChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 mb-4">
                              <label>Last Name</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={item?.lastName || "Last Name"}
                                  name={`lastName${col2}`}
                                  defaultValue={
                                    editFormData[`lastName${col2}`] ||
                                    item?.lastName
                                  }
                                  onChange={handleEditChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col mb-4">
                              <label>Address</label>
                              <div className="input-group ">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={item?.address || "Address"}
                                  name={`address${col2}`}
                                  defaultValue={
                                    editFormData[`address${col2}`] ||
                                    item?.address
                                  }
                                  onChange={handleEditChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-7 mb-4">
                              <label>Email Address</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={item?.email || "Email Address"}
                                  name={`email${col2}`}
                                  defaultValue={
                                    editFormData[`email${col2}`] || item?.email
                                  }
                                  onChange={handleEditChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                            <div className="col-md-5 mb-4">
                              <label>Phone Number</label>
                              <div className="input-group" id="phone">
                                <PhoneInput
                                  country={"ng"}
                                  inputClass={`form-control phone-input ${
                                    showEdit ? "disable" : ""
                                  }`}
                                  buttonClass={`phone-select-field ${
                                    showEdit ? "disable" : ""
                                  }`}
                                  name="phone"
                                  value={
                                    editFormData[`phone${col2}`] || item?.phone
                                  }
                                  // countryCodeEditable={false}
                                  disabled={showEdit}
                                  onChange={(value) =>
                                    handleEditPhoneValueChange(value)
                                  }
                                  disableCountryCode={true}
                                  placeholder={item?.phone || "Phone Number"}
                                  disableDropdown
                                  masks={{ ng: ".... ... ...." }}
                                />
                                <UncontrolledTooltip
                                  placement="bottom"
                                  target="phone"
                                >
                                  Please provide the Phone Number tied to the
                                  BVN
                                </UncontrolledTooltip>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-9 mb-4">
                              <div className="row d-flex">
                                <div className="col-8">
                                  <label>Bank verification number (BVN)</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={
                                        item?.bvn ||
                                        "Bank verification number (BVN)"
                                      }
                                      name={`bvn${col2}`}
                                      defaultValue={
                                        editFormData[`bvn${col2}`] || item?.bvn
                                      }
                                      onChange={handleEditChange}
                                      disabled={showEdit}
                                    />
                                  </div>
                                  {bvnError && bvnError.message && (
                                    <small className="text-danger">
                                      {bvnError?.message}
                                    </small>
                                  )}
                                </div>
                                {(editFormData[`firstName${col2}`] ||
                                  item?.firstName) &&
                                (editFormData[`lastName${col2}`] ||
                                  item?.lastName) &&
                                (editFormData[`address${col2}`] ||
                                  item?.address) &&
                                (editFormData[`phone${col2}`] || item?.phone) &&
                                (editFormData[`email${col2}`] || item?.email) &&
                                (editFormData[`bvn${col2}`] || item?.bvn) &&
                                !bvnMessage?.isNameMatched &&
                                !showEdit ? (
                                  <div className="col-4 mt-3">
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        handleVerifyBVN(e, 1, col2, true)
                                      }
                                      className="profile_vify_btn"
                                    >
                                      Verify
                                    </button>
                                  </div>
                                ) : (
                                  <div className="col-4 mt-3">
                                    <button
                                      type="button"
                                      disabled
                                      className="grey_vify_btn"
                                    >
                                      Verify
                                    </button>
                                  </div>
                                )}

                                <div>
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "100px",
                                      right: "300px",
                                    }}
                                  >
                                    <ModalComponent
                                      show={showBvnModal}
                                      size={"md"}
                                      handleClose={handleBVNModalClose}
                                    >
                                      <BVNConfirm
                                        show={showBvnModal}
                                        handleClose={handleBVNModalClose}
                                        firstName={bvnMessage?.data?.firstName}
                                        lastName={bvnMessage?.data?.lastName}
                                        bvn={editFormData[`bvn${col2}`]}
                                        director="director"
                                        nameMatch={bvnMessage?.isNameMatched}
                                      />
                                    </ModalComponent>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label>ID Type</label>
                              <div className="input-group">
                                <select
                                  className="form-select form-select-md"
                                  aria-label=".form-select-md"
                                  name={`idTypeId${col2}`}
                                  value={
                                    editFormData[`idTypeId${col2}`] ||
                                    item?.idType?.id
                                  }
                                  onChange={handleEditChange}
                                  disabled={showEdit}
                                >
                                  <option value="">Select ID Type...</option>
                                  {idTypes?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <label>ID Number</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={item?.idNumber || "ID Number"}
                                  name={`idNumber${col2}`}
                                  defaultValue={
                                    editFormData[`idNumber${col2}`] ||
                                    item?.idNumber
                                  }
                                  onChange={handleEditChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                          </div>
                          {item?.idDocumentImage?.imageUrl && showEdit ? (
                            <div className="row py-4 mb-5">
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
                                      ID Card
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
                                    href={item?.idDocumentImage?.imageUrl}
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
                            <div className="row pt-4 mb-5">
                              {!base64File[`frontEncodedString${col2}`] ? (
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <img
                                      className="file-image image-fluid"
                                      src={FileDoc}
                                      alt="FileDoc"
                                    />
                                    <div>
                                      <h5 className="">Upload ID Card</h5>
                                      <h5 className="">jpg, pdf, 2 MB</h5>
                                    </div>
                                  </div>
                                  <div className=" style-attachment">
                                    <input
                                      type="file"
                                      className="file"
                                      ref={currIdCardInputRef}
                                      onChange={(e) =>
                                        handleFileChange(
                                          e,
                                          `frontEncodedString${col2}`
                                        )
                                      }
                                    />
                                    {!showEdit ? (
                                      <button
                                        type="button"
                                        className="btn_bg_blue"
                                        onClick={(e) =>
                                          handleFileSelect(
                                            e,
                                            currIdCardInputRef
                                          )
                                        }
                                      >
                                        Choose file
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="normal-btn grey-button"
                                        disabled={showEdit}
                                      >
                                        Choose file
                                      </button>
                                    )}
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
                                          style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                          }}
                                          onClick={() =>
                                            setBase64File({
                                              ...base64File,
                                              [`frontEncodedString${col2}`]: "",
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
                                  <div className=" style-attachment">
                                    <input
                                      type="file"
                                      className="file"
                                      ref={currIdCardInputRef}
                                      onChange={(e) =>
                                        handleFileChange(
                                          e,
                                          `frontEncodedString${col2}`
                                        )
                                      }
                                    />
                                    {!showEdit ? (
                                      <button
                                        type="button"
                                        className="btn_bg_blue"
                                        onClick={(e) =>
                                          handleFileSelect(
                                            e,
                                            currIdCardInputRef
                                          )
                                        }
                                      >
                                        Choose file
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="normal-btn grey-button"
                                        disabled={showEdit}
                                      >
                                        Choose file
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Collapse>
                        {/* </form> */}
                      </div>
                    ) : null}
                    {/* <hr /> */}
                  </div>
                ))}
                {directorField?.length > 0 &&
                  directorField?.map((data) => (
                    <div key={data.id}>
                      <hr />
                      <div className="row mt-5">
                        <div className="d-flex justify-content-between mt-5">
                          <h4>
                            Director {data.no}{" "}
                            <span
                              className="pl-5"
                              onClick={() => t_col1(data.id)}
                            >
                              {col1 === data.id ? (
                                <i className="fa-solid fa-angle-down arrow"></i>
                              ) : (
                                <i className="fa-solid fa-angle-up arrow"></i>
                              )}
                            </span>
                          </h4>
                          <div>
                            <button
                              type="button"
                              className="red-button"
                              onClick={() => deleteDirectorDetails(data.id)}
                            >
                              Delete Director Details
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
                      <Collapse isOpen={col1 === data.id}>
                        <div className="image-holder">
                          <div className="row">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center justify-content-center">
                                <img
                                  className="image-frame"
                                  style={{
                                    borderRadius: "50%",
                                    border: "2px solid #FFFFFF",
                                  }}
                                  src={
                                    data?.passportImage?.encodedUpload
                                      ? `data:image/jpeg;base64,${data?.passportImage?.encodedUpload}`
                                      : User
                                  }
                                  alt="User"
                                  width="125"
                                  height="125"
                                />
                                {data?.passportImage?.encodedUpload ? (
                                  <img
                                    className="image-fluid align-self-start"
                                    src={Check}
                                    alt="check"
                                    width="15"
                                  />
                                ) : null}
                                <div>
                                  <h5 className="">
                                    Upload Your Passport Photo
                                  </h5>
                                  <p className="">jpg, 2 MB</p>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="file"
                                  className="file"
                                  accept="image/jpeg"
                                  ref={photoFileInputRef}
                                  onChange={(e) =>
                                    handleFileChange(e, "photoEncodedString")
                                  }
                                  disabled={showEdit}
                                />
                                {showEdit ? (
                                  <button
                                    type="button"
                                    className="grey-button"
                                    disabled={showEdit}
                                  >
                                    Choose File
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4 ">
                            <label>First Name</label>
                            <div className="input-group mb-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="firstName"
                                value={data?.firstName}
                                onChange={handleChange}
                                disabled={showEdit}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 ">
                            <label>Middle Name</label>
                            <div className="input-group mb-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Middle Name"
                                name="middleName"
                                value={data?.middleName}
                                onChange={handleChange}
                                disabled={showEdit}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 mb-4">
                            <label>Last Name</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                name="lastName"
                                value={data?.lastName}
                                onChange={handleChange}
                                disabled={showEdit}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col ">
                            <label>Address</label>
                            <div className="input-group mb-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                                value={data.address}
                                onChange={handleChange}
                                disabled={showEdit}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-7 ">
                            <label>Email Address</label>
                            <div className="input-group mb-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email Address"
                                name="email"
                                value={data?.email}
                                onChange={handleChange}
                                disabled={showEdit}
                              />
                            </div>
                          </div>
                          <div className="col-md-5 ">
                            <label>Phone Number</label>
                            <div className="input-group mb-4" id="phone">
                              <PhoneInput
                                country={"ng"}
                                inputClass={`form-control phone-input disable`}
                                buttonClass={`phone-select-field disable `}
                                name="phone"
                                value={data?.phone}
                                // countryCodeEditable={false}
                                disabled
                                onChange={(value) =>
                                  handlePhoneValueChange(value)
                                }
                                disableCountryCode={true}
                                placeholder="Phone Number"
                                disableDropdown
                                masks={{ ng: ".... ... ...." }}
                              />
                              <UncontrolledTooltip
                                placement="bottom"
                                target="phone"
                              >
                                Please provide the Phone Number tied to the BVN
                              </UncontrolledTooltip>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-9">
                            <div className="row">
                              <div className="col-8 mb-4">
                                <label>Bank verification number (BVN)</label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Bank verification number (BVN)"
                                    name="bvn"
                                    value={data?.bvn}
                                    onChange={handleChange}
                                    disabled={showEdit}
                                  />
                                </div>
                              </div>
                              {false ? (
                                <div className="col-4">
                                  <button
                                    type="button"
                                    onClick={handleVerifyBVN}
                                    className="profile_vify_btn"
                                  >
                                    Verify
                                  </button>
                                </div>
                              ) : (
                                <div className="col-4">
                                  <button
                                    type="button"
                                    disabled={showEdit}
                                    className="grey_vify_btn"
                                  >
                                    Verify
                                  </button>
                                </div>
                              )}

                              <div>
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "100px",
                                    right: "300px",
                                  }}
                                >
                                  <ModalComponent
                                    show={showBvnModal}
                                    size={"md"}
                                    handleClose={handleBVNModalClose}
                                  >
                                    <BVNConfirm
                                      show={showBvnModal}
                                      handleClose={handleBVNModalClose}
                                      firstName={bvnMessage?.data?.firstName}
                                      lastName={bvnMessage?.data?.lastName}
                                      bvn={data.bvn}
                                      director="director"
                                      nameMatch={bvnMessage?.isNameMatched}
                                    />
                                  </ModalComponent>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 ">
                            <label>ID Type</label>
                            <select
                              className="form-select form-select-md mb-3"
                              aria-label=".form-select-md"
                              name="idTypeId"
                              value={data?.idTypeId}
                              onChange={handleChange}
                              disabled={showEdit}
                            >
                              <option value="">Select ID Type...</option>
                              {idTypes?.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6 ">
                            <label>ID Number</label>
                            <div className="input-group mb-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="ID Number"
                                name="idNumber"
                                value={data.idNumber}
                                onChange={handleChange}
                                disabled={showEdit}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row py-4">
                          {!data.idDocumentImage?.encodedUpload ? (
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center justify-content-center">
                                <img
                                  className="file-image image-fluid"
                                  src={FileDoc}
                                  alt="FileDoc"
                                />
                                <div>
                                  <h5 className="">Upload ID Card</h5>
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
                                {!showEdit ? (
                                  <button
                                    type="button"
                                    className="btn_bg_blue"
                                    onClick={(e) =>
                                      handleFileSelect(e, frontFileInputRef)
                                    }
                                  >
                                    Choose file
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="normal-btn grey-button"
                                    disabled={showEdit}
                                  >
                                    Choose file
                                  </button>
                                )}
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
                                      style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                      // onClick={() =>
                                      // 	setBase64File({
                                      // 		...base64File,
                                      // 		frontEncodedString: "",
                                      // 	})
                                      // }
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
                              <div className="style-attachment">
                                <input
                                  type="file"
                                  className="file"
                                  ref={frontFileInputRef}
                                  onChange={(e) =>
                                    handleFileChange(e, "frontEncodedString")
                                  }
                                />
                                {!showEdit ? null : ( // </button> // 	Choose file // 	}> // 		handleFileSelect(e, frontFileInputRef) // 	onClick={(e) => // 	className="btn_bg_blue" // 	type="button" // <button
                                  <button
                                    type="button"
                                    className="normal-btn grey-button"
                                    disabled={showEdit}
                                  >
                                    Choose file
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </Collapse>
                      {/* </form> */}
                    </div>
                  ))}
                <Collapse isOpen={addDirectors}>
                  {
                    addDirectors && (
                      <AddDirectors
                        updateDirector={(data) => updateMoreDirector(data)}
                        countNumbers={countNumbers}
                        number={
                          directorField[directorField.length - 1]?.no ||
                          directors?.length
                        }
                        removeForm={setAddDirectors}
                        idTypes={idTypes}
                      />
                    )
                  }
                </Collapse>
                <div className="row">
                  <div
                    className="d-flex align-items-center mt-5"
                    onClick={() => setAddDirectors(!addDirectors)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={plus} alt="plus" className="mx-2" />
                    <span style={{ color: "#111E6C", marginRight: "30px" }}>
                      {" "}
                      Add More Directors
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="row">
                  <div className="d-flex justify-content-between mt-2">
                    <h4>
                      Director 1{" "}
                      <span
                        className="pl-5"
                        onClick={() => setShowOne(!showOne)}
                      >
                        {showOne ? (
                          <i className="fa-solid fa-angle-down arrow"></i>
                        ) : (
                          <i className="fa-solid fa-angle-up arrow"></i>
                        )}
                      </span>
                    </h4>
                    <div>
                      {showEdit ? (
                        <button
                          type="button"
                          className="btn_bg_blue"
                          onClick={handleSendOtp}
                        >
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
                    />
                  </ModalComponent>
                </div>

                <div className="details-content">
                  {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
                  <Collapse isOpen={showOne}>
                    <div className="image-holder">
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center justify-content-center">
                            <img
                              className="image-frame"
                              style={{
                                borderRadius: "50%",
                                border: "2px solid #FFFFFF",
                              }}
                              src={
                                base64File.photoEncodedString
                                  ? `data:image/jpeg;base64,${base64File.photoEncodedString}`
                                  : User
                              }
                              alt="User"
                              width="125"
                              height="125"
                            />
                            {base64File.photoEncodedString ? (
                              <img
                                className="image-fluid align-self-start"
                                src={Check}
                                alt="check"
                                width="15"
                              />
                            ) : null}
                            <div>
                              <h5 className="">Upload Your Passport Photo</h5>
                              <p className="">jpg, 2 MB</p>
                            </div>
                          </div>
                          <div>
                            <input
                              type="file"
                              className="file"
                              accept="image/jpeg"
                              ref={photoFileInputRef}
                              onChange={(e) =>
                                handleFileChange(e, "photoEncodedString")
                              }
                              disabled={showEdit}
                            />
                            {showEdit ? (
                              <button
                                type="button"
                                className="grey-button"
                                disabled={showEdit}
                              >
                                Choose File
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn_bg_blue"
                                onClick={(e) =>
                                  handleFileSelect(e, photoFileInputRef)
                                }
                              >
                                Choose File
                              </button>
                            )}
                          </div>
                          {/* <button>Choose file</button> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <label>First Name</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={showEdit}
                          />
                        </div>
                        {errors.firstName && (
                          <span className="text-danger">
                            {errors.firstName}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Middle Name</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Middle Name"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            disabled={showEdit}
                          />
                        </div>
                        {errors.middleName && (
                          <span className="text-danger">
                            {errors.middleName}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label>Last Name</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={showEdit}
                          />
                        </div>
                        {errors.lastName && (
                          <span className="text-danger">{errors.lastName}</span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
                        <label>Address</label>
                        <div className="input-group ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={showEdit}
                          />
                        </div>
                        {errors.address && (
                          <span className="text-danger">{errors.address}</span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-7 mb-4">
                        <label>Email Address</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={showEdit}
                          />
                        </div>
                        {errors.email && (
                          <span className="text-danger">{errors.email}</span>
                        )}
                      </div>
                      <div className="col-md-5 mb-4">
                        <label>Phone Number</label>
                        <div className="input-group" id="phone">
                          <PhoneInput
                            country={"ng"}
                            inputClass={`form-control phone-input ${
                              showEdit ? "disable" : ""
                            }`}
                            buttonClass={`phone-select-field ${
                              showEdit ? "disable" : ""
                            }`}
                            name="phone"
                            value={formData?.phone}
                            // countryCodeEditable={false}
                            disabled={showEdit}
                            onChange={(value) => handlePhoneValueChange(value)}
                            disableCountryCode={true}
                            placeholder="Phone Number"
                            disableDropdown
                            masks={{ ng: ".... ... ...." }}
                          />
                          <UncontrolledTooltip
                            placement="bottom"
                            target="phone"
                          >
                            Please provide the Phone Number tied to the BVN
                          </UncontrolledTooltip>
                        </div>
                        {errors.phone && (
                          <span className="text-danger">{errors.phone}</span>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-9">
                        <div className="row d-flex">
                          <div className="col-8 mb-4">
                            <label>Bank verification number (BVN)</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Bank verification number (BVN)"
                                name="bvn"
                                value={formData.bvn}
                                onChange={handleChange}
                                disabled={showEdit}
                              />
                            </div>
                            <small className="text-danger">
                              {bvnError?.message && id === 1
                                ? bvnError?.message
                                : ""}
                            </small>
                            {errors.bvn && (
                              <span className="text-danger">{errors.bvn}</span>
                            )}
                          </div>
                          {formData.firstName &&
                          formData.lastName &&
                          formData.address &&
                          formData.phone &&
                          formData.email &&
                          formData.bvn &&
                          // !showEdit &&
                          (!(formData.firstName === bvnMessage?.data?.firstName) ||
                          !(formData.lastName === bvnMessage?.data?.lastName)) ? (
                            <div className="col-4 mt-3">
                              <button
                                type="button"
                                onClick={(e) => handleVerifyBVN(e, 1)}
                                className="profile_vify_btn"
                              >
                                Verify
                              </button>
                            </div>
                          ) : (
                            <div className="col-4 mt-3">
                              <button
                                type="button"
                                disabled={showEdit}
                                className="grey_vify_btn"
                              >
                                Verify
                              </button>
                            </div>
                          )}

                          <div>
                            <div
                              style={{
                                position: "absolute",
                                top: "100px",
                                right: "300px",
                              }}
                            >
                              <ModalComponent
                                show={showBvnModal}
                                size={"md"}
                                handleClose={handleBVNModalClose}
                              >
                                <BVNConfirm
                                  show={showBvnModal}
                                  handleClose={handleBVNModalClose}
                                  firstName={bvnMessage?.data?.firstName}
                                  lastName={bvnMessage?.data?.lastName}
                                  bvn={formData.bvn}
                                  confirmName={(firstName, lastName) =>
                                    {updateNames(firstName, lastName)}
                                  }
                                  director="director"
                                  nameMatch={bvnMessage?.isNameMatched}
                                />
                              </ModalComponent>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>ID Type</label>
                        <div className="input-group">
                          <select
                            className="form-select form-select-md"
                            aria-label=".form-select-md"
                            name="idTypeId"
                            value={formData.idTypeId}
                            onChange={handleChange}
                            disabled={showEdit}
                          >
                            <option value="">Select ID Type...</option>
                            {idTypes?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.idTypeId && (
                          <span className="text-danger">{errors.idTypeId}</span>
                        )}
                      </div>
                      <div className="col-md-6 mb-4">
                        <label>ID Number</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="ID Number"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleChange}
                            disabled={showEdit}
                          />
                        </div>
                        {errors.idNumber && (
                          <span className="text-danger">{errors.idNumber}</span>
                        )}
                      </div>
                    </div>
                    {false ? (
                      <div className="row py-4">
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
                              <h5 className="image-fluid mr-3">ID Card</h5>
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
                            {/* <a
                                  href={companyDocs?.contactPersonIdImage?.imageUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                > */}
                            <button
                              type="button"
                              className="normal-btn grey-button"
                            >
                              View
                            </button>
                            {/* </a> */}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row pt-4">
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
                              {!showEdit ? (
                                <button
                                  type="button"
                                  className="btn_bg_blue"
                                  onClick={(e) =>
                                    handleFileSelect(e, frontFileInputRef)
                                  }
                                >
                                  Choose file
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="normal-btn grey-button"
                                  disabled={showEdit}
                                >
                                  Choose file
                                </button>
                              )}
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
                                    style={{
                                      cursor: "pointer",
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
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
                            <div className=" style-attachment">
                              <input
                                type="file"
                                className="file"
                                ref={frontFileInputRef}
                                onChange={(e) =>
                                  handleFileChange(e, "frontEncodedString")
                                }
                              />
                              {!showEdit ? (
                                <button
                                  type="button"
                                  className="btn_bg_blue"
                                  onClick={(e) =>
                                    handleFileSelect(e, frontFileInputRef)
                                  }
                                >
                                  Choose file
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="normal-btn grey-button"
                                  disabled={showEdit}
                                >
                                  Choose file
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Collapse>
                  {/* </form> */}
                  {directorField?.length > 0 &&
                    directorField?.map((data) => (
                      <div key={data.id}>
                        <hr />
                        <div className="row mt-5">
                          <div className="d-flex justify-content-between mt-5">
                            <h4>
                              Director {data.no}{" "}
                              <span
                                className="pl-5"
                                onClick={() => t_col1(data.id)}
                              >
                                {col1 ? (
                                  <i className="fa-solid fa-angle-down arrow"></i>
                                ) : (
                                  <i className="fa-solid fa-angle-up arrow"></i>
                                )}
                              </span>
                            </h4>
                            <div>
                              <button
                                type="button"
                                className="red-button"
                                onClick={() => deleteDirectorDetails(data.id)}
                              >
                                Delete Director Details
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
                        <Collapse isOpen={col1 === data.id}>
                          <div className="image-holder">
                            <div className="row">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center justify-content-center">
                                  <img
                                    className="image-frame"
                                    style={{
                                      borderRadius: "50%",
                                      border: "2px solid #FFFFFF",
                                    }}
                                    src={
                                      data?.passportImage?.encodedUpload
                                        ? `data:image/jpeg;base64,${data?.passportImage?.encodedUpload}`
                                        : User
                                    }
                                    alt="User"
                                    width="125"
                                    height="125"
                                  />
                                  {data?.passportImage?.encodedUpload ? (
                                    <img
                                      className="image-fluid align-self-start"
                                      src={Check}
                                      alt="check"
                                      width="15"
                                    />
                                  ) : null}
                                  <div>
                                    <h5 className="">
                                      Upload Your Passport Photo
                                    </h5>
                                    <p className="">jpg, 2 MB</p>
                                  </div>
                                </div>
                                <div>
                                  <input
                                    type="file"
                                    className="file"
                                    accept="image/jpeg"
                                    ref={photoFileInputRef}
                                    onChange={(e) =>
                                      handleFileChange(e, "photoEncodedString")
                                    }
                                    disabled={showEdit}
                                  />
                                  {showEdit ? (
                                    <button
                                      type="button"
                                      className="grey-button"
                                      disabled={showEdit}
                                    >
                                      Choose File
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4 ">
                              <label>First Name</label>
                              <div className="input-group mb-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="First Name"
                                  name="firstName"
                                  value={data?.firstName}
                                  onChange={handleChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 ">
                              <label>Middle Name</label>
                              <div className="input-group mb-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Middle Name"
                                  name="middleName"
                                  value={data?.middleName}
                                  onChange={handleChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                            <div className="col-md-4 mb-4">
                              <label>Last Name</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last Name"
                                  name="lastName"
                                  value={data?.lastName}
                                  onChange={handleChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col ">
                              <label>Address</label>
                              <div className="input-group mb-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Address"
                                  name="address"
                                  value={data.address}
                                  onChange={handleChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-7">
                              <label>Email Address</label>
                              <div className="input-group mb-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email Address"
                                  name="email"
                                  value={data?.email}
                                  onChange={handleChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                            <div className="col-md-5">
                              <label>Phone Number</label>
                              <div className="input-group mb-4" id="phone">
                                <PhoneInput
                                  country={"ng"}
                                  inputClass={`form-control phone-input disable`}
                                  buttonClass={`phone-select-field disable`}
                                  name="phone"
                                  value={data?.phone}
                                  // countryCodeEditable={false}
                                  disabled
                                  onChange={(value) =>
                                    handlePhoneValueChange(value)
                                  }
                                  disableCountryCode={true}
                                  placeholder="Phone Number"
                                  disableDropdown
                                  masks={{ ng: ".... ... ...." }}
                                />
                                <UncontrolledTooltip
                                  placement="bottom"
                                  target="phone"
                                >
                                  Please provide the Phone Number tied to the
                                  BVN
                                </UncontrolledTooltip>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-9">
                              <div className="row">
                                <div className="col-8 mb-4">
                                  <label>Bank verification number (BVN)</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Bank verification number (BVN)"
                                      name="bvn"
                                      value={data?.bvn}
                                      onChange={handleChange}
                                      disabled={showEdit}
                                    />
                                  </div>
                                </div>
                                {data.firstName &&
                                data.lastName &&
                                data.address &&
                                data.phone &&
                                data.email &&
                                data.bvn &&
                                !showEdit &&
                                !bvnMessage?.isNameMatched ? (
                                  <div className="col-4">
                                    <button
                                      type="button"
                                      onClick={handleVerifyBVN}
                                      className="profile_vify_btn"
                                    >
                                      Verify
                                    </button>
                                  </div>
                                ) : (
                                  <div className="col-4">
                                    <button
                                      type="button"
                                      disabled={showEdit}
                                      className="grey_vify_btn"
                                    >
                                      Verify
                                    </button>
                                  </div>
                                )}

                                <div>
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "100px",
                                      right: "300px",
                                    }}
                                  >
                                    <ModalComponent
                                      show={showBvnModal}
                                      size={"md"}
                                      handleClose={handleBVNModalClose}
                                    >
                                      <BVNConfirm
                                        show={showBvnModal}
                                        handleClose={handleBVNModalClose}
                                        firstName={bvnMessage?.data?.firstName}
                                        lastName={bvnMessage?.data?.lastName}
                                        bvn={formData.bvn}
                                        director="director"
                                        nameMatch={bvnMessage?.isNameMatched}
                                      />
                                    </ModalComponent>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 ">
                              <label>ID Type</label>
                              <select
                                className="form-select form-select-md mb-3"
                                aria-label=".form-select-md"
                                name="idTypeId"
                                value={data?.idTypeId}
                                onChange={handleChange}
                                disabled={showEdit}
                              >
                                <option value="">Select ID Type...</option>
                                {idTypes?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-6 ">
                              <label>ID Number</label>
                              <div className="input-group mb-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="ID Number"
                                  name="idNumber"
                                  value={data.idNumber}
                                  onChange={handleChange}
                                  disabled={showEdit}
                                />
                              </div>
                            </div>
                          </div>
                          {false ? (
                            <div className="row py-4">
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
                                      ID Card
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
                                  {/* <a
                                        href={companyDocs?.contactPersonIdImage?.imageUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                      > */}
                                  <button
                                    type="button"
                                    className="normal-btn grey-button"
                                  >
                                    View
                                  </button>
                                  {/* </a> */}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="row py-4">
                              {!data.idDocumentImage?.encodedUpload ? (
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center justify-content-center">
                                    <img
                                      className="file-image image-fluid"
                                      src={FileDoc}
                                      alt="FileDoc"
                                    />
                                    <div>
                                      <h5 className="">Upload ID Card</h5>
                                      <h5 className="">jpg, pdf, 2 MB</h5>
                                    </div>
                                  </div>
                                  <div className=" style-attachment">
                                    <input
                                      type="file"
                                      className="file"
                                      ref={frontFileInputRef}
                                      onChange={(e) =>
                                        handleFileChange(
                                          e,
                                          "frontEncodedString"
                                        )
                                      }
                                    />
                                    {!showEdit ? (
                                      <button
                                        type="button"
                                        className="btn_bg_blue"
                                        onClick={(e) =>
                                          handleFileSelect(e, frontFileInputRef)
                                        }
                                      >
                                        Choose file
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="normal-btn grey-button"
                                        disabled={showEdit}
                                      >
                                        Choose file
                                      </button>
                                    )}
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
                                          style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                          }}
                                          // onClick={() =>
                                          // 	setBase64File({
                                          // 		...base64File,
                                          // 		frontEncodedString: "",
                                          // 	})
                                          // }
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
                                  <div className="style-attachment">
                                    <input
                                      type="file"
                                      className="file"
                                      ref={frontFileInputRef}
                                      onChange={(e) =>
                                        handleFileChange(
                                          e,
                                          "frontEncodedString"
                                        )
                                      }
                                    />
                                    {!showEdit ? null : (
                                      <button
                                        type="button"
                                        className="normal-btn grey-button"
                                        disabled={showEdit}
                                      >
                                        Choose file
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Collapse>
                        {/* </form> */}
                      </div>
                    ))}
                  <Collapse isOpen={addDirectors}>
                    {
                      addDirectors && (
                        <AddDirectors
                          updateDirector={(data) => updateMoreDirector(data)}
                          countNumbers={countNumbers}
                          number={directorField[directorField.length - 1]?.no || 1}
                          removeForm={setAddDirectors}
                          idTypes={idTypes}
                        />
                      )
                    }
                  </Collapse>
                  <div className="row">
                    <div
                      className="d-flex align-items-center mt-5"
                      onClick={() => setAddDirectors(!addDirectors)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={plus} alt="plus" className="mx-2" />
                      <span style={{ color: "#111E6C", marginRight: "30px" }}>
                        {" "}
                        Add More Directors
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </WrapperBody>
        <WrapperFooter>
          <div className="footer-body">
            <div className="d-flex align-items-center justify-content-end footer-content">
              <div>
                {!showEdit || directorField?.length > 0 ? (
                  <button type="submit" className="blue-btn">
                    Save
                  </button>
                ) : (
                  <button type="submit" className="grey-button" disabled>
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </WrapperFooter>
      </form>
    </div>
  );
};

export default MoreDetails;

const WrapperBody = styled.div`
  padding: 0 4rem 7rem 1rem;
  .details-content {
    padding-top: 20px;
  }
  @media (max-width: 560px) {
    padding: 0 1rem 7rem 1rem;
  }

  .arrow {
    font-size: 16px;
    margin-left: 10px;
  }

  .file {
    display: none;
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

  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }

  .red-button {
    background: #f20000;
    color: #ffffff;
  }

  .progress-bar-style {
    width: 70%;
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
    &:disabled {
      cursor: not-allowed;
    }
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

  select {
    width: 300px !important;
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

  .grey_vify_btn {
    margin-top: 35px;
    background: #f2f2f2;
    color: #ccc;
    cursor: not-allowed;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  .phone-select-field {
    height: 54px;
    font-family: "Montserrat";
    border-left: 1.5px solid #e0e0e0 !important;
    border-top: 1.5px solid #e0e0e0 !important;
    border-bottom: 1.5px solid #e0e0e0 !important;
    border-right: 1px solid #eee !important;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
    background: #ffffff;
  }

  .phone-input {
    width: 100%;
    height: 54px;
    border: 1.5px solid #e0e0e0 !important;
    border-radius: 8px;
    padding: 15px 15px 15px 80px;
    position: relative;
    font-weight: 500;
    font-size: 17px;
    line-height: 16px;
    color: #333333;
    background: #ffffff !important;
  }

  .disable {
    background: rgba(28, 68, 141, 0.09) !important;
    cursor: not-allowed;
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
`;

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
    width: 120px;
    height: 41px;
    background: #f2f2f2;
    border-radius: 10px;
    color: #111e6c;
    margin-right: 2rem;
  }

  .blue_btn {
    font-size: 14px;
    width: 120px;
    height: 41px;
    background: #111e6c;
    border-radius: 10px;
    color: #ffffff;
    margin-left: 2rem;
  }
`;
