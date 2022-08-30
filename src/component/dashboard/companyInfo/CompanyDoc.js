import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FileDoc from "../../../asset/file.png";
import { uploadCompanyDocument } from "../../../redux/actions/updateProfile/uploadDocument.action";
import { successMessage } from "../../../redux/actions/auth/SignupAction";

const CompanyDoc = () => {
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
    dispatch(uploadCompanyDocument(data));
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
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-between mt-2">
              <h4>Company Document</h4>
              {showEdit ? (
                <button
                  className={showEdit ? " btn_bg_blue" : ""}
                  onClick={toggleEdit}>
                  Edit
                </button>
              ) : (
                <button className="grey-button" onClick={toggleEdit}>
                  Cancel
                </button>
              )}
            </div>
          </div>
          <div className="document-content">
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
                      Certificate of Incoporation{" "}
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
                  <button className="font-awe-btn grey-button">
                    <i
                      className="fa-solid fa-paperclip"
                      disabled={showEdit}></i>
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
                      Certificate of Incoporation{" "}
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
                  <button className="font-awe-btn grey-button">
                    <i
                      className="fa-solid fa-paperclip"
                      disabled={showEdit}></i>
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
                      Certificate of Incoporation{" "}
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
                  <button className="font-awe-btn grey-button">
                    <i
                      className="fa-solid fa-paperclip"
                      disabled={showEdit}></i>
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
                      Certificate of Incoporation{" "}
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
                  <button className="font-awe-btn grey-button">
                    <i
                      className="fa-solid fa-paperclip"
                      disabled={showEdit}></i>
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
                    <h5 className="">Certificate of Incoporation</h5>
                    <h5 className="">jpg, png. 2 MB</h5>
                  </div>
                </div>
                <div className="w-30 style-attachment">
                  <button className="font-awe-btn grey-button">
                    <i
                      className="fa-solid fa-paperclip"
                      disabled={showEdit}></i>
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
                    <h5 className="">Certificate of Incoporation</h5>
                    <h5 className="">jpg, png. 2 MB</h5>
                  </div>
                </div>
                <div className="w-30 style-attachment">
                  <button className="font-awe-btn grey-button">
                    <i
                      className="fa-solid fa-paperclip"
                      disabled={showEdit}></i>
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
                    <h5 className="">Certificate of Incoporation</h5>
                    <h5 className="">jpg, png. 2 MB</h5>
                  </div>
                </div>
                <div className="w-30 style-attachment">
                  <button className="font-awe-btn grey-button">
                    <i
                      className="fa-solid fa-paperclip"
                      disabled={showEdit}></i>
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

export default CompanyDoc;

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
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }
  .document-content {
    padding-top: 70px;
  }
  .file-image {
    padding-right: 10px;
  }
  .progress-bar-style {
    width: 70%;
  }
  button {
    background: #111e6c;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px 27px;
    color: #f2f2f2;
    &:disabled{
      cursor: not-allowed;
    }
  }
  span {
    position: absolute;
    right: 10px;
    color: rgba(17, 30, 108, 1);
    font-size: 20px;
  }
  .grey-button {
    background: #f2f2f2;
    color: #828282;
  }
  h5 {
    font-style: normal;
    font-size: 15px;
    letter-spacing: -0.04em;
    color: #333333;
  }
  p {
    font-style: normal;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.04em;
    color: #333333;
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
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
`;