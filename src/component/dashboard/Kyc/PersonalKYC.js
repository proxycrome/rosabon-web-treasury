import React, { useState, useEffect } from "react";
import * as types from "../../../redux/constant/auth";
import { config } from "../../../redux/config";
import { headers } from "../../../redux/headers";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BVNConfirm } from "../../Accessories/BVNConfirm";
import ModalComponent from "../../ModalComponent";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
	updateUserCompanyKYC,
	verifyBvn,
	getCountries,
	getStates,
} from "../../../redux/actions/personalInfo/userProfile.actions";
import moment from "moment";

const PersonalKYC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user_details = useSelector((state) => state.user_profile.users);

	const auth = useSelector((state) => state.auth);
	const { login, isLoggedIn } = auth;

	const user_profile = useSelector((state) => state.user_profile);
	const { showBvnModal, bvnError, bvnMessage, countries, states } =
		user_profile;

	console.log(user_details);

	// const success = useSelector((state) => state.auth.success);
	const [show, setShow] = useState(false);

	const data = {
		dateOfBirth: "",
		gender: "",
		bvn: "",
		firstName: "",
		middleName: "",
		lastName: "",
		name: "",
		houseNoAddress: "",
		state: "",
		city: "",
		country: "",
		phone: "",
		email: "",
		countryId: 1,
	};

	const [formData, setformData] = useState(data);

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setformData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e, route) => {
		e.preventDefault();

		const {
			dateOfBirth,
			gender,
			bvn,
			firstName,
			middleName,
			lastName,
			countryId,
			houseNoAddress,
			state,
			city,
			country,
			phone,
			email,
		} = formData;

		let data = {
			isAssited: user_details && user_details.assited,
			isNewsLetters: user_details && user_details.newsLetters,
			isKyc: true,
			phone: phone ? phone : user_details && user_details?.phone,
			role: "INDIVIDUAL_USER",
			status: user_details && user_details?.status,
			usage: "TREASURY",
			source: user_details?.source,
			sourceOthers: user_details?.sourceOthers,
			email: email ? email : user_details && user_details?.email,
			individualUser: {
				bvn: bvn ? bvn : user_details.individualUser.bvn,
				address: {
					city: city ? city : user_details?.individualUser?.address?.city,
					country: country
						? country
						: user_details?.individualUser?.address?.country,
					houseNoAddress: houseNoAddress
						? houseNoAddress
						: user_details?.individualUser?.address.houseNoAddress,
					state: state ? state : user_details?.individualUser?.address?.state,
				},
				countryId: +countryId,
				dateOfBirth: dateOfBirth
					? String(moment(dateOfBirth).format("DD-MM-YYYY"))
					: user_details?.individualUser?.dateOfBirth,
				gender: gender ? gender : user_details?.individualUser?.gender,
				firstName: firstName
					? firstName
					: user_details?.individualUser?.firstName,
				lastName: lastName ? lastName : user_details?.individualUser?.lastName,
				middleName: middleName
					? middleName
					: user_details?.individualUser?.middleName,
			},
		};

		const tokenString = JSON.parse(localStorage.getItem("token"));
		const pathCred = {
			navigate,
			route,
		};
		console.log(data);
		// console.log(tokenString);
		dispatch(updateUserCompanyKYC(tokenString.token, data, pathCred));
	};

	const handleVerifyBVN = (e) => {
		e.preventDefault();
		const { firstName, lastName, bvn, phone } = formData;

		const objData = {
			firstName: firstName
				? firstName
				: user_details?.individualUser?.firstName,
			lastName: lastName ? lastName : user_details?.individualUser?.lastName,
			id: bvn ? bvn : user_details.individualUser.bvn,
			isSubjectConsent: true,
			phoneNumber: phone ? phone : user_details && user_details?.phone,
		};

		console.log(objData);
		dispatch(verifyBvn(objData));
	};

	const handleBVNModalClose = () => {
		dispatch({ type: types.CLOSE_MODAL });
	};

	useEffect(() => {
		dispatch(getCountries());
		dispatch(getStates(formData.countryId));
	}, [formData.countryId]);

	console.log(bvnError);
	console.log(bvnMessage);

	return (
		<div>
			{user_details && user_details ? (
				<div className="">
					<div>
						<Toaster />
					</div>
					<div>
						<div className="" style={{ overflowY: "auto" }}>
							<WrapperBody>
								<div>
									<div>
										<div className="d-flex justify-content-between align-items-center">
											<h3>Hello {user_details.individualUser.firstName},</h3>
											{/* <Link to="/">
                        <button className="dashboard">Dashboard</button>
                      </Link> */}
										</div>

										<p>
											Kindly update your profile, it will only take a few
											minutes
										</p>

										<form autoComplete="off">
											<h4>Personal Details</h4>
											<div>
												<div className="row">
													<div className="col-md-6 col-lg-4">
														<label>First Name</label>
														<div className="input-group mb-4">
															<input
																className="form-control"
																type="text"
																placeholder={
																	user_details?.individualUser?.firstName ||
																	"Enter first name"
																}
																name="firstName"
																value={formData.firstName}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-md-6 col-lg-4 ">
														<label>Middle Name</label>
														<div className="input-group mb-4">
															<input
																className="form-control"
																type="text"
																placeholder={
																	user_details?.individualUser?.middleName ||
																	"Enter middle name"
																}
																name="middleName"
																onChange={handleChange}
																value={formData.middleName}
															/>
														</div>
													</div>
													<div className="col-md-8 col-lg-4 pb-4">
														<label>Last Name</label>
														<div className="input-group">
															<input
																type="text"
																className="form-control"
																placeholder={
																	user_details?.individualUser?.lastName ||
																	"Enter last name"
																}
																name="lastName"
																value={formData.lastName}
																onChange={handleChange}
															/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6 col-lg-4 ">
														<label>Gender</label>
														<div className="input-group mb-4">
															<select
																className="form-select form-select-lg mb-3 select-field"
																aria-label=".form-select-lg"
																onChange={handleChange}
																value={
																	formData.gender ||
																	user_details?.individualUser?.gender
																}
																name="gender"
															>
																<option value="">Select Gender...</option>
																<option value="MALE">Male</option>
																<option value="FEMALE">Female</option>
															</select>
														</div>
													</div>
													<div className="col-md-6 col-lg-4 ">
														<label>Date of Birth</label>
														<div className="input-group mb-4">
															<input
																className="form-control"
																placeholder={
																	user_details?.individualUser?.dateOfBirth ||
																	"DD-MM-YYYY"
																}
																type="text"
																onChange={handleChange}
																name="dateOfBirth"
																value={formData.dateOfBirth}
															/>
														</div>
													</div>
													<div className="col-md-6 col-lg-4 ">
														<label>Primary phone number</label>
														<div className="input-group mb-4">
															<input
																className="form-control"
																type="text"
																placeholder={
																	user_details?.phone ||
																	"Enter Primary Phone number"
																}
																onChange={handleChange}
																name="phone"
																value={formData.phone}
															/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6 col-lg-8 ">
														<label>Bank verification number (BVN)</label>
														<div className="input-group">
															<input
																className="form-control"
																placeholder={
																	user_details?.individualUser?.bvn ||
																	"Bank verification number (BVN)"
																}
																type="text"
																onChange={handleChange}
																name="bvn"
																value={formData.bvn}
															/>
														</div>
													</div>
													<div className="col-md-6 col-lg-4">
														<button
															type="button"
															onClick={handleVerifyBVN}
															className="profile_vify_btn"
														>
															Verify
														</button>
													</div>
													<small className="text-danger">
														{bvnError?.message ? bvnError?.message : ""}
													</small>
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
																	name={`${bvnMessage?.data?.firstName} ${bvnMessage?.data?.lastName}`}
																	bvn={
																		formData.bvn ||
																		user_details?.individualUser?.bvn
																	}
																	nameMatch={bvnMessage?.isNameMatched}
																/>
															</ModalComponent>
														</div>
													</div>
												</div>
											</div>

											<h4 className="pt-5">Contact Details</h4>
											<div>
												<div className="row d-flex align-items-baseline">
													<div className="col-md-8 ">
														<label>Email</label>
														<div className="input-group mb-4">
															<input
																className="form-control"
																type="text"
																placeholder={
																	user_details?.email || "Enter your email"
																}
																onChange={handleChange}
																name="email"
																value={formData.email}
															/>
														</div>
													</div>
													<div className="col-md-4">
														<label>Country of Residence</label>
														<div className="input-group mb-4">
															<select
																className="form-select form-select-lg mb-3 select-field"
																aria-label=".form-select-lg"
																onChange={handleChange}
																value={
																	formData.countryId ||
																	user_details?.individualUser
																		?.coutryOfResidence?.id
																}
																name="countryId"
																// value={1}
															>
																<option value={0}></option>
																{countries?.map((country) => (
																	<option key={country.id} value={country.id}>
																		{country.name}
																	</option>
																))}
															</select>
														</div>
													</div>
												</div>
												<div className="row">
													<div className=" ">
														<label>Contact Address</label>
														<div className="input-group mb-4">
															<input
																className="form-control"
																placeholder={
																	user_details?.individualUser?.address
																		?.houseNoAddress || "Contact Address"
																}
																type="text"
																onChange={handleChange}
																name="houseNoAddress"
																value={formData.houseNoAddress}
															/>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-4 ">
														<label>State</label>
														<div className="input-group mb-2">
															<select
																className="form-select form-select-lg mb-3 select-field"
																aria-label=".form-select-lg"
																onChange={handleChange}
																value={
																	formData.state ||
																	user_details?.individualUser?.address?.state
																}
																name="state"
															>
																<option value="">Select State...</option>
																{states?.map((state) => (
																	<option key={state.id} value={state.name}>
																		{state.name}
																	</option>
																))}
															</select>
														</div>
													</div>
													<div className="col-md-4 ">
														<label>City</label>
														<div className="input-group mb-4">
															<input
																className="form-control"
																placeholder={
																	user_details?.individualUser?.address?.city ||
																	"City"
																}
																type="text"
																onChange={handleChange}
																name="city"
																value={formData.city}
															/>
														</div>
													</div>
													<div className="col-md-4">
														<label>Nationality</label>
														<div className="input-group">
															<select
																className="form-select form-select-lg mb-3 select-field"
																aria-label=".form-select-lg"
																onChange={handleChange}
																value={
																	formData.country ||
																	user_details?.individualUser?.address?.country
																}
																name="country"
															>
																<option value="">
																	Select your Nationality...
																</option>
																{countries?.map((country) => (
																	<option key={country.id} value={country.name}>
																		{country.name}
																	</option>
																))}
															</select>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</WrapperBody>

							<WrapperFooter>
								<div className="footer-body">
									<div className="d-flex align-items-center justify-content-between footer-content">
										<div>
											{(formData.firstName ||
												user_details?.individualUser?.firstName) &&
											(formData.middleName ||
												user_details?.individualUser?.middleName) &&
											(formData.lastName ||
												user_details?.individualUser?.lastName) &&
											(formData.dateOfBirth ||
												user_details?.individualUser?.dateOfBirth) &&
											(formData.phone || user_details?.phone) &&
											(formData.email || user_details?.email) &&
											(formData.name ||
												user_details?.individualUser?.coutryOfResidence
													?.name) &&
											(formData.houseNoAddress ||
												user_details?.individualUser?.address
													?.houseNoAddress) &&
											(formData.state ||
												user_details?.individualUser?.address?.state) &&
											(formData.city ||
												user_details?.individualUser?.address?.city) &&
											(formData.country ||
												user_details?.individualUser?.address?.country) &&
											(formData.gender ||
												user_details?.individualUser?.gender) &&
											(formData.bvn || user_details?.individualUser?.bvn) &&
											bvnMessage?.success ? (
												<button
													className=""
													onClick={(e) => handleSubmit(e, "/profile")}
												>
													Save and Continue
												</button>
											) : (
												<button className="" disabled>
													Save and Continue
												</button>
											)}
										</div>
										<div>
											{(formData.firstName ||
												user_details?.individualUser?.firstName) &&
											(formData.middleName ||
												user_details?.individualUser?.middleName) &&
											(formData.lastName ||
												user_details?.individualUser?.lastName) &&
											(formData.dateOfBirth ||
												user_details?.individualUser?.dateOfBirth) &&
											(formData.phone || user_details?.phone) &&
											(formData.email || user_details?.email) &&
											(formData.houseNoAddress ||
												user_details?.individualUser?.address
													?.houseNoAddress) &&
											(formData.state ||
												user_details?.individualUser?.address?.state) &&
											(formData.city ||
												user_details?.individualUser?.address?.city) &&
											(formData.country ||
												user_details?.individualUser?.address?.country) &&
											(formData.gender ||
												user_details?.individualUser?.gender) &&
											(formData.bvn || user_details?.individualUser?.bvn) &&
											bvnMessage?.success ? (
												<button
													className="blue-btn"
													onClick={(e) => handleSubmit(e, "/plan-product")}
												>
													Save and Invest Now
												</button>
											) : (
												<button className="" disabled>
													Save and Invest Now
												</button>
											)}
										</div>
									</div>
								</div>
							</WrapperFooter>
						</div>
					</div>
				</div>
			) : (
				<p>Please Wait...</p>
			)}
		</div>
	);
};

export default PersonalKYC;

const WrapperFooter = styled.div`
	background: #ffffff;
	box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
	padding: 40px 80px;
	@media (max-width: 600px) {
		padding: 40px 20px;
	}
	@media (max-width: 450px) {
		.footer-content {
			display: block !important;
		}
		.footer-body {
			padding-left: 25%;
		}
		button {
			margin: 10px 0;
		}
	}
	button {
		background: #f2f2f2;
		border-radius: 10px;
		outline: none;
		border: none;
		cursor: pointer;
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
const WrapperBody = styled.div`
	.dashboard {
		padding: 10px;
		background: #111e6c;
		border-radius: 8px;
		color: #ffffff;
	}
	padding: 4rem 5rem;
	@media (max-width: 600px) {
		padding: 6rem 3rem;
	}
	.select-field {
		font-family: "Montserrat";
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 15px;
		letter-spacing: -0.01em;
		color: #242424;
		padding: 15px;
	}
	h4 {
		font-style: normal;
		font-weight: 600;
		font-size: 20px;
		line-height: 24px;
		text-transform: capitalize;
		color: #222222;
		padding-bottom: 15px;
	}
	h3 {
		font-style: normal;
		font-weight: 700;
		font-size: 33px;
		line-height: 40px;
		color: #222222;
	}
	p {
		font-style: normal;
		font-weight: 500;
		font-size: 19px;
		line-height: 23px;
		letter-spacing: -0.02em;
		color: #333333;
		padding-bottom: 25px;
	}
	input {
		width: 239.5px;
		height: 54px;
		border: 1.5px solid #e0e0e0;
		border-radius: 8px;
		padding-left: 20px;
	}

	select {
		height: 54px;
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
		padding: 10px 10px;
		margin-top: 40px;
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
