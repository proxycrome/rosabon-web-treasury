import React, { useState, useEffect, useRef } from "react";
import * as types from "../../../redux/constant/auth";
import { UncontrolledTooltip, Alert } from "reactstrap";
import styled from "styled-components";
import { Collapse } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import User from "../../../asset/user.png";
import FileDoc from "../../../asset/file.png";
import Check from "../../../asset/checked.png";
import { uploadPersonalDocument } from "../../../redux/actions/updateProfile/uploadDocument.action";
import { successMessage } from "../../../redux/actions/auth/SignupAction";
import plus from "../../../asset/plus.svg";
import {
	sendCompanyOtp,
	verifyBvn,
} from "../../../redux/actions/personalInfo/userProfile.actions";
import ModalComponent from "../../ModalComponent";
import { BVNConfirm, OTPVerify } from "../../Accessories/BVNConfirm";
import { CLEAR_OTP } from "../../../redux/constant/userActionTypes";

const AddDirectors = ({ updateDirector, countNumbers, number, removeForm }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showOne, setShowOne] = useState(true);
	const [showEdit, setShowEdit] = useState(true);
	const [token, setToken] = useState("");
	const [errors, setErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [base64File, setBase64File] = useState({
		frontEncodedString: "",
		photoEncodedString: "",
	});

	const photoFileInputRef = useRef();
	const frontFileInputRef = useRef();

	const {
		showBvnModal,
		bvnError,
		bvnMessage,
		showEmailOtpModal,
		otp,
		otpError,
		validateEmailOtp,
        id,
	} = useSelector((state) => state.user_profile);

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
		idType: "",
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
			e.target.files = null;
		}
	};

	function validateform(values) {
		let errors = {};

		if (!values.firstName) {
			errors.firstName = "first name is required";
		}
		if (!values.middleName) {
			errors.middleName = "Middle name is required";
		}

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

		if (!values.idType) {
			errors.idType = "ID Type is required";
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
		setErrors(validateform(formData));
		setIsSubmitted(true);
	};

	const directorNo = () => {
		const arr = countNumbers();
		let num = number;
		for (let i of arr) {
			if (i > num) {
				num = i;
				break;
			}
		}
		return num;
	};

	useEffect(() => {
		if (
			Object.keys(errors).length === 0 &&
			isSubmitted &&
			bvnMessage?.isNameMatched
		) {
			const {
				firstName,
				middleName,
				lastName,
				phone,
				email,
				address,
				bvn,
				idType,
				idNumber,
			} = formData;

			const { frontEncodedString, photoEncodedString } = base64File;

			const data = {
				no: directorNo(),
				firstName,
				lastName,
				middleName,
				phone,
				email,
				address,
				bvn,
				idType,
				idNumber,
				idDocumentImage: {
					encodedUpload: frontEncodedString,
				},
				passportImage: {
					encodedUpload: photoEncodedString,
				},
			};
			console.log(data);
			// dispatch(changePersonalPassword(data));
			updateDirector(data);

			setformData({
				...formData,
				firstName: "",
				lastName: "",
				middleName: "",
				address: "",
				email: "",
				phone: "",
				bvn: "",
				idType: "",
				idNumber: "",
			});

			setBase64File({
				...base64File,
				frontEncodedString: "",
				photoEncodedString: "",
			});
            removeForm(false)
		}
	}, [errors]);

	const handleFileSelect = (e, reference) => {
		e.preventDefault();
		reference.current.click();
	};

	const handleVerifyBVN = (e, id) => {
		e.preventDefault();
		const { firstName, lastName, bvn, phone } = formData;

		const objData = {
			firstName: firstName,
			lastName: lastName,
			id: bvn,
			isSubjectConsent: true,
			phoneNumber: phone,
		};

		console.log(objData);
		dispatch(verifyBvn(objData, id));
	};

	const handleBVNModalClose = () => {
		dispatch({ type: types.CLOSE_MODAL });
	};

	const handleOTPModalClose = () => {
		dispatch({ type: types.CLOSE_MODAL });
		dispatch({ type: types.CLEAR_MESSAGES });
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
			idType: "",
			idNumber: "",
		});

		setBase64File({
			...base64File,
			frontEncodedString: "",
			photoEncodedString: "",
		});
	};

	return (
		<div className="mt-5">
			<form autoComplete="off" onSubmit={handleSubmit}>
				<WrapperBody>
                    <hr />
					<div className="container-fluid">
						<div className="row mt-4">
							<div className="d-flex justify-content-between mt-5">
								<h4>
									Director {directorNo()}{" "}
									<span className="pl-5" onClick={() => setShowOne(!showOne)}>
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
											onClick={handleSendOtp}>
											Edit
										</button>
									) : (
										<button
											type="button"
											className="grey-button"
											onClick={() => {
												toggleEdit();
												reset();
											}}>
											Cancel
										</button>
									)}
								</div>
							</div>
							<ModalComponent
								show={showEmailOtpModal}
								size={"md"}
								handleClose={handleOTPModalClose}>
								<OTPVerify
									show={showEmailOtpModal}
									handleClose={handleOTPModalClose}
									emailOtp={true}
									updateOtp={(otp) => createOtp(otp)}
									otpData={otp?.data}
								/>
							</ModalComponent>
						</div>

						<div className="details-content">
							<Collapse isOpen={showOne}>
								<div className="image-holder">
									<div className="row">
										<div className="d-flex align-items-center justify-content-between">
											<div className="d-flex align-items-center justify-content-center">
												<img className="image-fluid" src={User} alt="User" />
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
														disabled={showEdit}>
														Choose File
													</button>
												) : (
													<button
														type="button"
														className="btn_bg_blue"
														onClick={(e) =>
															handleFileSelect(e, photoFileInputRef)
														}>
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
											<span className="text-danger">{errors.firstName}</span>
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
											<span className="text-danger">{errors.middleName}</span>
										)}
									</div>
									<div className="col-md-4">
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
									<div className="col-md-8 mb-4">
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
									<div className="col-md-4 mb-4">
										<label>Phone Number</label>
										<div className="input-group">
											<input
												type="text"
												className="form-control"
												placeholder="Phone Number"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												disabled={showEdit}
											/>
											<UncontrolledTooltip placement="bottom" target="phone">
												Please provide the Phone Number tied to the BVN
											</UncontrolledTooltip>
										</div>
										{errors.phone && (
											<span className="text-danger">{errors.phone}</span>
										)}
									</div>
								</div>
								<div className="row">
									<div className="col-lg-8">
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
													{bvnError?.message && id === directorNo() ? bvnError?.message : ""}
												</small>
												{errors.bvn && (
													<span className="text-danger">{errors.bvn}</span>
												)}
											</div>
											{formData.firstName &&
											formData.middleName &&
											formData.lastName &&
											formData.address &&
											formData.phone &&
											formData.email &&
											formData.bvn &&
											!showEdit ? (
												<div className="col-4 mt-3">
													<button
														type="button"
														onClick={(e) => handleVerifyBVN(e, directorNo())}
														className="profile_vify_btn">
														Verify
													</button>
												</div>
											) : (
												<div className="col-4 mt-3">
													<button
														type="button"
														disabled={showEdit}
														className="grey_vify_btn">
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
													}}>
													<ModalComponent
														show={showBvnModal}
														size={"md"}
														handleClose={handleBVNModalClose}>
														<BVNConfirm
															show={showBvnModal}
															handleClose={handleBVNModalClose}
															name={`${bvnMessage?.data?.firstName} ${bvnMessage?.data?.lastName}`}
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
									<div className="col-md-6 mb-3">
										<label>ID Type</label>
										<div className="input-group">
											<select
												className="form-select form-select-md"
												aria-label=".form-select-md"
												name="idType"
												value={formData.idType}
												onChange={handleChange}
												disabled={showEdit}>
												<option value="">Select ID Type...</option>
												<option value="NATIONAL_IDENTITY_CARD">
													National ID card
												</option>
												<option value="DRIVER_LICENSE">
													Driver's License{" "}
												</option>
												<option value="INTERNATIONAL_PASSPORT">
													International Passport
												</option>
												<option value="VOTER_CARD">Voter's Card </option>
											</select>
										</div>
										{errors.idType && (
											<span className="text-danger">{errors.idType}</span>
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
												<div className="d-flex" style={{ columnGap: "10px" }}>
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
													className="normal-btn grey-button">
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
															}>
															Choose file
														</button>
													) : (
														<button
															type="button"
															className="normal-btn grey-button"
															disabled={showEdit}>
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
																}>
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
															}>
															Choose file
														</button>
													) : (
														<button
															type="button"
															className="normal-btn grey-button"
															disabled={showEdit}>
															Choose file
														</button>
													)}
												</div>
											</div>
										)}
									</div>
								)}
								<div className="row">
									<div className="col-md-12 d-flex justify-content-center mt-5">
										<button type="submit" className="btn_bg_blue">
											Add to List of Directors
										</button>
									</div>
								</div>
							</Collapse>
						</div>
					</div>
				</WrapperBody>
			</form>
			<hr />
		</div>
	);
};

export default AddDirectors;

const WrapperBody = styled.div`
	padding-bottom: 3rem;
	.details-content {
		padding-top: 70px;
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
	.details-content {
		padding-top: 45px;
	}
	.grey-button {
		background: #f2f2f2;
		color: #111e6c;
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
		color: #111e6c;
		border-radius: 8px;
		font-style: normal;
		font-weight: 600;
		font-size: 17px;
		line-height: 21px;
	}
`;
