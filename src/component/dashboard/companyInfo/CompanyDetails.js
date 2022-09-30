import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateCompanyDetails } from "../../../redux/actions/updateProfile/updateProfile.actions";
import { getAuthUsers } from "../../../redux/actions/personalInfo/userProfile.actions";

const CompanyDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showEditDetail, setShowEditDetail] = useState(true);
	const [showEditCont, setShowEditCont] = useState(true);
	const [showEditEmpoy, setShowEditEmpoy] = useState(true);
	const [showEditNOK, setShowEditNOK] = useState(true);

	const { users } = useSelector((state) => state.user_profile);

	console.log(users);

	const toggleDetail = () => {
		setShowEditDetail(!showEditDetail);
	};
	const toggleCont = () => {
		setShowEditCont(!showEditCont);
	};
	const toggleEmploy = () => {
		setShowEditEmpoy(!showEditEmpoy);
	};
	const toggleNOK = () => {
		setShowEditNOK(!showEditNOK);
	};

	const data = {
		companyType: "",
		contactFirstName: "",
		contactLastName: "",
		email: "",
		phone: "",
	};
	const [formData, setformData] = useState(data);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setformData({
			...formData,
			[name]: value,
		});
	};

	const validateUserInfo = (values) => {
		let errors = {};

		if ((!values.email && !users?.email) || !users?.email) {
			errors.email = "Email address is required";
		}

		if (
			(!values.contactFirstName && !users?.company?.contactFirstName) ||
			!users?.company?.contactFirstName
		) {
			errors.contactFirstName = "Contact person first name field is required";
		}

		if (
			(!values.companyType && !users?.company?.companyType) ||
			!users?.company?.companyType
		) {
			errors.companyType = "Company type field is required";
		}

		if (
			(!values.contactLastName && !users?.company?.contactLastName) ||
			!users?.company?.contactLastName
		) {
			errors.contactLastName = "Contact person last name field is required";
		}

		if ((!values.phone && !users?.phone) || !users?.phone) {
			errors.phone = "Phone number is required ";
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors(validateUserInfo(formData));
		setIsSubmitted(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitted) {
			const { contactFirstName, contactLastName, email, phone, companyType } =
				formData;
			const data = {
				contactFirstName: contactFirstName
					? contactFirstName
					: users?.company?.contactFirstName,
				contactLastName: contactLastName
					? contactLastName
					: users?.company?.contactLastName,
				email: email ? email : users?.email,
				phone: phone ? phone : users?.phone,
				companyType: companyType ? companyType : users?.company?.companyType,
			};
			console.log(data);
			dispatch(updateCompanyDetails(data));
		}
	}, [errors, isSubmitted]);

	const tokenObj = JSON.parse(localStorage.getItem("token"));

	useEffect(() => {
		if (!users) {
			dispatch(getAuthUsers(tokenObj?.token));
		}
	}, [users]);

	return (
		<div>
			<Toaster />
			<form autoComplete="off" onSubmit={handleSubmit}>
				<WrapperBody>
					<div className="container-fluid">
						<div>
							<div className="row">
								<div className="d-flex justify-content-between mt-2">
									<h4>Company Details</h4>
									<div>
										{showEditDetail ? (
											<button
												type="button"
												className="btn_bg_blue"
												onClick={toggleDetail}>
												Edit
											</button>
										) : (
											<button
												type="button"
												className="grey-button"
												onClick={toggleDetail}>
												Cancel
											</button>
										)}
									</div>
								</div>
							</div>
							<div className="">
								<div className="row">
									<div className="col-md-6">
										<label>Company Name</label>
										<div className="input-group mb-4">
											<input
												className="form-control"
												placeholder=""
												type="text"
												value={users?.company?.name}
												disabled={showEditDetail}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<label>Company RC Number</label>
										<div className="input-group mb-4">
											<input
												className="form-control"
												placeholder=""
												type="text"
												value={users?.company?.rcNumber}
												disabled={showEditDetail}
											/>
										</div>
									</div>
									<div className="col-md-8 mb-4">
										<label>Company Registration Date</label>
										<div className="input-group">
											<input
												type="text"
												className="form-control"
												placeholder=""
												value={users?.company?.dateOfInco}
												disabled={showEditDetail}
											/>
											{/* <span className=" input-font-awe">
                        <i className="fa-solid fa-calendar"></i>
                      </span> */}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col ">
										<label>Company Address</label>
										<div className="input-group mb-4">
											<input
												className="form-control"
												placeholder=""
												type="text"
												value={users?.company?.companyAddress}
												disabled={showEditDetail}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6 col-lg-4 ">
										<label>Customer ID Number</label>
										<div className="input-group mb-4">
											<input
												className="form-control"
												placeholder=""
												type="text"
												disabled={showEditDetail}
											/>
											{/* <span className=" input-font-awe">
                        <i className="fa-solid fa-angle-down"></i>
                      </span> */}
										</div>
									</div>
									<div className="col-md-6 col-lg-4 ">
										<label>Nature of Business</label>
										<div className="input-group mb-4">
											<input
												className="form-control"
												placeholder=""
												type="text"
												value={users?.company?.natureOfBusiness}
												disabled={showEditDetail}
											/>
										</div>
									</div>
									<div className="col-md-8 col-lg-4 mb-4">
										<label>Company Type</label>
										<div className="input-group">
											<select
												className="form-select form-select-md mb-3"
												aria-label=".form-select-md"
												disabled={showEditDetail}
												onChange={handleChange}
												name="companyType"
												value={
													formData?.companyType || users?.company?.companyType
												}>
												<option value="" disabled>
													Select Company Type
												</option>
												<option value="SOLE_PROPRIETORSHIP">
													Sole Proprietorship
												</option>
												<option value="PARTNERSHIP">Partnership</option>
												<option value="CORPORATE_LIMITED">
													Corporate Limited
												</option>
											</select>
										</div>
										{errors && errors?.companyType && (
											<span className="text-danger">{errors?.companyType}</span>
										)}
									</div>
								</div>
							</div>
							<div className="body-content">
								<div className="row">
									<div className="d-flex justify-content-between mt-5">
										<h4>Contact Person Details</h4>
										<div>
											{showEditCont ? (
												<button
													type="button"
													className="tn_bg_blue"
													onClick={toggleCont}>
													Edit
												</button>
											) : (
												<button
													type="button"
													className="grey-button"
													onClick={toggleCont}>
													Cancel
												</button>
											)}
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6 mb-4">
										<label>Contact Person First Name</label>
										<div className="input-group">
											<input
												className="form-control"
												placeholder={
													users?.company?.contactFirstName ||
													"Contact Person First Name"
												}
												type="text"
												name="contactFirstName"
												value={formData.contactFirstName}
												onChange={handleChange}
												disabled={showEditCont}
											/>
										</div>
										{errors && errors?.contactFirstName && (
											<span className="text-danger">
												{errors?.contactFirstName}
											</span>
										)}
									</div>
									<div className="col-md-6 mb-4">
										<label>Contact Person Last Name</label>
										<div className="input-group">
											<input
												type="text"
												className="form-control"
												placeholder={
													users?.company?.contactLastName ||
													"Contact Person Last Name"
												}
												name="contactLastName"
												value={formData.contactLastName}
												onChange={handleChange}
												disabled={showEditCont}
											/>
										</div>
										{errors && errors?.contactLastName && (
											<span className="text-danger">
												{errors?.contactLastName}
											</span>
										)}
									</div>
								</div>
								<div className="row">
									<div className="col-md-8 mb-4">
										<label>Email Address</label>
										<div className="input-group">
											<input
												className="form-control"
												placeholder={users?.email || "Email Address"}
												type="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												disabled={showEditCont}
											/>
										</div>
										{errors && errors?.email && (
											<span className="text-danger">{errors?.email}</span>
										)}
									</div>
									<div className="col-md-4 mb-4">
										<label>Phone Number</label>
										<div className="input-group">
											<input
												className="form-control"
												placeholder={users?.phone || "Phone Number"}
												type="number"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												disabled={showEditCont}
											/>
										</div>
										{errors && errors?.phone && (
											<span className="text-danger">{errors?.phone}</span>
										)}
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
								<button type="submit" className="blue-btn">
									Save
								</button>
							</div>
						</div>
					</div>
				</WrapperFooter>
			</form>
		</div>
	);
};

export default CompanyDetails;

const WrapperBody = styled.div`
	padding: 0 4rem 7rem 1rem;
	@media (max-width: 600px) {
		padding: 0 1rem 7rem 1rem;
	}
	.body-content {
		/* padding-top: 45px; */
	}
	.grey-button {
		background: #f2f2f2;
		color: #111e6c;
	}

	select {
		height: 54px;
	}

	button {
		background: #111e6c;
		border-radius: 5px;
		outline: none;
		border: none;
		padding: 10px 27px;
		color: #f2f2f2;
	}
	.input-font-awe {
		position: absolute;
		top: 8px;
		right: 20px;
		font-size: 25px;
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
