import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FileDoc from "../../asset/file.png";
import Check from "../../asset/checked.png";

const FileUpload = ({showEdit, setFile, fileName, id}) => {
  const [base64File, setBase64File] = useState({});
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    if(Object.keys(base64File).length > 0){
        setFile(base64File);
    }
  }, [base64File])

  const handleFileSelect = (e, reference) => {
    e.preventDefault();
    reference.current.click();
  };

  return (
    <Wrapper>
      {false ? (
        <div className="row">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center justify-content-center">
              <img
                className="file-image image-fluid"
                src={FileDoc}
                alt="FileDoc"
              />
              <div className="d-flex" style={{ columnGap: "10px" }}>
                <h5 className="image-fluid mr-3">{fileName}</h5>
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
                href={companyDocs?.utilityBillImage?.imageUrl}
                target="_blank"
                rel="noreferrer"
              > */}
              <button type="button" className="normal-btn grey-button">
                View
              </button>
              {/* </a> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {!Object.keys(base64File).length > 0 ? (
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  className="file-image image-fluid"
                  src={FileDoc}
                  alt="FileDoc"
                />
                <div>
                  <h5 className="">Upload {fileName}</h5>
                  <h5 className="">jpg, pdf, 2 MB</h5>
                </div>
              </div>
              <div className=" style-attachment">
                <input
                  type="file"
                  className="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, "encodedUpload")}
                />
                <button
                  type="button"
                  className="normal-btn grey-button"
                  disabled={showEdit}
                  onClick={(e) => handleFileSelect(e, fileInputRef)}
                  id={id}
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
                    {fileName}{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setBase64File("")}
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
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, "encodedUpload")}
                />
                <button
                  type="button"
                  className="normal-btn grey-button"
                  disabled={showEdit}
                  onClick={(e) => handleFileSelect(e, fileInputRef)}
                  id={id}
                >
                  Choose file
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default FileUpload;

const Wrapper = styled.div`
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }
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
