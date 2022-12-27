// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch, connect } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   registerCompany,
//   registerUser,
// } from "../../redux/actions/auth/SignupAction";

// function Signup() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const count = useSelector((state) => state.auth.signup_btn);
//   const success = useSelector((state) => state.auth.success);
//   const [passwordShown1, setPasswordShown1] = useState(false);
//   const [passwordShown2, setPasswordShown2] = useState(false);
//   const [isCompanyNewsLetters, setisCompanyNewsLetters] = useState(false);
//   const [isUserNewsLetters, setisUserNewsLetters] = useState(false);
//   const [isCompanyTerms, setIsCompanyTerms] = useState(false);
//    const [isUserTerms, setIsUserTerms] = useState(false);
//   // const [isNewsLetters, setIsNewsLetters] = useState(false);
//   const [emailError, setEmailError] = useState(null);
//   const [passwordError, setPasswordError] = useState(null);
//   const [c_passwordError, setC_PasswordError] = useState(null);

//   const data = {
//     email: "",
//     password: "",
//     phone: "",
//     source: "",
//     sourceOthers: "",
//     contactFirstName: "",
//     contactLastName: "",
//     contactMiddleName: "",
//     name: "",
//     firstName: "",
//     lastName: "",
//     middleName: "",
//     refferedBy: "",
//     c_password: "",
//     terms: "",
//   };

//   const [formData, setformData] = useState(data);

//   function confirmPassword(c_password) {
//     return c_password == formData.password ;
//   }

//   function isValidEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
//   }

//   function validatePassword(password) {
//     var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

//     return re.test(password);
//   }

//   const togglePassword1 = () => {
//     setPasswordShown1(!passwordShown1);
//   };
//   const togglePassword2 = () => {
//     setPasswordShown2(!passwordShown2);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData({
//       ...formData,
//       [name]: value,
//     });

//     if (name == "c_password") {
//       if (!confirmPassword(e.target.value)) {
//         setC_PasswordError("Password mismatch");
//       } else {
//         setC_PasswordError(null);
//       }
//     }

//     if (name == "email") {
//       if (!isValidEmail(e.target.value)) {
//         setEmailError("Email is invalid");
//       } else {
//         setEmailError(null);
//       }
//     }

//     if (name === "password") {
//       if (!validatePassword(e.target.value)) {
//         setPasswordError(
//           "Your password must contain at least one digit, 8 characters, one special character"
//         );
//       } else {
//         setPasswordError(null);
//       }
//     }
//   };

//   const handleUserSubmit = (e) => {
//     e.preventDefault();
//     if (!emailError && !passwordError && !c_passwordError) {
//       const {
//         email,
//         password,
//         source,
//         sourceOthers,
//         phone,
//         firstName,
//         lastName,
//         middleName,
//         refferedBy,
//       } = formData;
//       let individualUser = {
//         firstName,
//         lastName,
//         middleName,
//       };
//       let data = {
//         individualUser,
//         email,
//         isAssited: true,
//         isNewsLetters: isUserNewsLetters,
//         password,
//         phone,
//         role: "INDIVIDUAL_USER",
//         source,
//         sourceOthers,
//         refferedBy,
//         usage: "TREASURY",
//       };
//       dispatch(registerUser(data));
//     } else {
//     }
//   };

//   const handleCompanySubmit = async (e) => {
//     e.preventDefault();
//     if (!emailError && !passwordError && !c_passwordError) {
//       const {
//         email,
//         password,
//         source,
//         contactFirstName,
//         contactLastName,
//         sourceOthers,
//         phone,
//         name,
//         refferedBy,
//       } = formData;
//       let company = {
//         contactFirstName,
//         contactLastName,
//         name,
//       };

//       let data = {
//         company,
//         email,
//         isAssited: true,
//         isNewsLetters: isCompanyNewsLetters,
//         password,
//         phone,
//         role: "COMPANY",
//         source,
//         sourceOthers,
//         usage: "TREASURY",
//         refferedBy,
//       };
//       dispatch(registerCompany(data));
//     } else {
//       // toast.error(error);
//     }
//   };

//   useEffect(() => {
//     if (success) {
//       navigate("/congrates", { state: "success_signup" });
//     }
//   }, [success]);

//   return (
//     <Wrapper>
//       <div>
//         <div>
//           <Toaster position="bottom-center" />
//         </div>
//         <div className="">
//           {count ? (
//             <div className="">
//               <RightWrapper>
//                 <h4>Sign up</h4>
//                 <div className="container">
//                   <form autoComplete="off" onSubmit={handleUserSubmit}>
//                     <LoginInput>
//                       <div className="row">
//                         <div className="col-md-6 ">
//                           <label>First Name</label>
//                           <div className="input-group mb-4">
//                             <input
//                               className="form-control"
//                               placeholder="First Name"
//                               type="text"
//                               onChange={handleChange}
//                               name="firstName"
//                               value={formData.firstName}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-6 ps-2 mb-4">
//                           <label>Last Name</label>
//                           <div className="input-group">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Last Name"
//                               onChange={handleChange}
//                               name="lastName"
//                               value={formData.lastName}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mb-4">
//                         <label>Email Address</label>
//                         <div className="input-group">
//                           <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Email Address"
//                             onChange={handleChange}
//                             name="email"
//                             value={formData.email}
//                           />
//                         </div>
//                         {emailError && (
//                           <h3>
//                             Your account is pending verification. please check
//                             your email for the verification link
//                           </h3>
//                         )}
//                       </div>
//                       <div className="mb-4">
//                         <label>Mobile Number</label>
//                         <div className="input-group">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Mobile Number"
//                             onChange={handleChange}
//                             name="phone"
//                             value={formData.phone}
//                           />
//                         </div>
//                       </div>
//                       <div className="mb-4 input_password">
//                         <label>Password</label>
//                         <div className="input-group">
//                           <input
//                             type={passwordShown1 ? "text" : "password"}
//                             className="form-control"
//                             placeholder="Password"
//                             onChange={handleChange}
//                             name="password"
//                             value={formData.password}
//                             // onBlur={(e) => validatePassword(e.target.value)}
//                           />
//                           <i
//                             onClick={togglePassword1}
//                             className={
//                               passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
//                             }
//                           ></i>
//                         </div>
//                         {passwordError && (
//                           <h3>
//                             Your password must contain at least one digit, 8
//                             characters, one special character, maximum of 32
//                             characters
//                           </h3>
//                         )}
//                       </div>
//                       <div className="mb-4 input_password">
//                         <label>Confirm Password</label>
//                         <div className="input-group">
//                           <input
//                             type={passwordShown2 ? "text" : "password"}
//                             className="form-control"
//                             placeholder="Confirm Password"
//                             onChange={handleChange}
//                             name="c_password"
//                             value={formData.c_password}
//                             // onBlur={(e) => validatC_Password(e.target.value)}
//                           />
//                           <i
//                             onClick={togglePassword2}
//                             className={
//                               passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
//                             }
//                           ></i>
//                         </div>
//                         {c_passwordError && <h3>password mismatch</h3>}
//                       </div>
//                       <div className="mb-4">
//                         <div className="">
//                           <label>How did you hear about us</label>
//                           <select
//                             className="form-select form-select-lg mb-3"
//                             aria-label=".form-select-lg"
//                             onChange={handleChange}
//                             name="source"
//                           >
//                             <option value="">Please choose an option</option>
//                             <option value="ROSABON_SALES">
//                               Rosabon sales executive
//                             </option>
//                             <option value="ANOTHER_USER">Another user</option>
//                             <option value="OTHER">Others</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="mb-4">
//                         <div className="input-group">
//                           {formData.source == "OTHER" ? (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Source Name"
//                               onChange={handleChange}
//                               name="sourceOthers"
//                               value={formData.sourceOthers}
//                             />
//                           ) : formData.source == "ANOTHER_USER" ? (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Input referral code"
//                               onChange={handleChange}
//                               name="refferedBy"
//                               value={formData.refferedBy}
//                             />
//                           ) : formData.source == "ROSABON_SALES" ? (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Input referral code"
//                               onChange={handleChange}
//                               name="refferedBy"
//                               value={formData.refferedBy}
//                             />
//                           ) : (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Input referral code"
//                               onChange={handleChange}
//                               name="refferedBy"
//                               value={formData.refferedBy}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <div className="">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="checkNewsLetter"
//                             onChange={(e) =>
//                               setisUserNewsLetters(!isUserNewsLetters)
//                             }
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="checkNewsLetter"
//                           >
//                             Yes, i want to recieve newsletters of Promos and
//                             Offers
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="checkTerms"
//                             onChange={(e) => setIsUserTerms(!isUserTerms)}
//                           />
//                           <label className="form-check-label" htmlFor="checkTerms">
//                             I agree to the Terms and Privacy Policy
//                           </label>
//                         </div>
//                       </div>
//                     </LoginInput>
//                     <LoginButton>
//                       <div className="">
//                         {isUserTerms &&
//                         formData.c_password &&
//                         formData.phone &&
//                         formData.email &&
//                         formData.lastName &&
//                         formData.firstName &&
//                         (formData.refferedBy || formData.sourceOthers) &&
//                         formData.password ? (
//                           <button type="submit">Sign up</button>
//                         ) : (
//                           <button disabled>Sign up</button>
//                         )}

//                         <p className="text-center">
//                           Already have an account?{" "}
//                           <span className="">
//                             <Link to="/login">Sign in </Link>
//                           </span>
//                         </p>
//                       </div>
//                     </LoginButton>
//                   </form>
//                 </div>
//               </RightWrapper>
//             </div>
//           ) : (
//             <div className="">
//               <RightWrapper>
//                 <h4>Sign up</h4>
//                 <div className="container">
//                   <form autoComplete="off" onSubmit={handleCompanySubmit}>
//                     <LoginInput>
//                       <div className="mb-4">
//                         <label>Company Name</label>
//                         <div className="input-group">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Company Name"
//                             onChange={handleChange}
//                             name="name"
//                             value={formData.name}
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-6 ">
//                           <label>Contact Person First name</label>
//                           <div className="input-group mb-4">
//                             <input
//                               className="form-control"
//                               placeholder="First Name"
//                               type="text"
//                               onChange={handleChange}
//                               name="contactFirstName"
//                               value={formData.contactFirstName}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-6 ps-2 mb-4">
//                           <label>Contact Person Last name</label>
//                           <div className="input-group">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Last Name"
//                               onChange={handleChange}
//                               name="contactLastName"
//                               value={formData.contactLastName}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mb-4">
//                         <label>Contact Person Email Address</label>
//                         <div className="input-group">
//                           <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Email Address"
//                             onChange={handleChange}
//                             name="email"
//                             value={formData.email}
//                           />
//                         </div>
//                         {emailError && (
//                           <h3>
//                             Your account is pending verification. please check
//                             your email for the verification link
//                           </h3>
//                         )}
//                       </div>
//                       <div className="mb-4">
//                         <label>Contact Person Number</label>
//                         <div className="input-group">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Mobile Number"
//                             onChange={handleChange}
//                             name="phone"
//                             value={formData.phone}
//                           />
//                         </div>
//                       </div>
//                       <div className="mb-4 input_password">
//                         <label>Password</label>
//                         <div className="input-group">
//                           <input
//                             type={passwordShown1 ? "text" : "password"}
//                             className="form-control"
//                             placeholder="Password"
//                             onChange={handleChange}
//                             name="password"
//                             value={formData.password}
//                           />
//                           <i
//                             onClick={togglePassword1}
//                             className={
//                               passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
//                             }
//                           ></i>
//                         </div>
//                         {passwordError && (
//                           <h3>
//                             Your password must contain at least one digit, 8
//                             characters, one special character
//                           </h3>
//                         )}
//                       </div>
//                       <div className="mb-4 input_password">
//                         <label>Confirm Password</label>
//                         <div className="input-group">
//                           <input
//                             type={passwordShown2 ? "text" : "password"}
//                             className="form-control"
//                             placeholder="Confirm Password"
//                             onChange={handleChange}
//                             name="c_password"
//                             value={formData.c_password}
//                           />
//                           <i
//                             onClick={togglePassword2}
//                             className={
//                               passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
//                             }
//                           ></i>
//                         </div>
//                         {c_passwordError && <h3>password mismatch</h3>}
//                       </div>
//                       <div className="mb-4">
//                         <div className="">
//                           <label>How did you hear about us</label>
//                           <select
//                             className="form-select form-select-lg mb-3"
//                             aria-label=".form-select-lg"
//                             onChange={handleChange}
//                             name="source"
//                           >
//                             <option value="">Please choose an option</option>
//                             <option value="ROSABON_SALES">
//                               Rosabon sales executive
//                             </option>
//                             <option value="ANOTHER_USER">Another user</option>
//                             <option value="OTHER">Others</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="mb-4">
//                         <div className="input-group">
//                           {formData.source == "OTHER" ? (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Source Name"
//                               onChange={handleChange}
//                               name="sourceOthers"
//                               value={formData.sourceOthers}
//                             />
//                           ) : formData.source == "ANOTHER_USER" ? (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Input referral code"
//                               onChange={handleChange}
//                               name="refferedBy"
//                               value={formData.refferedBy}
//                             />
//                           ) : formData.source == "ROSABON_SALES" ? (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Input referral code"
//                               onChange={handleChange}
//                               name="refferedBy"
//                               value={formData.refferedBy}
//                             />
//                           ) : (
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Input referral code"
//                               onChange={handleChange}
//                               name="refferedBy"
//                               value={formData.refferedBy}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <div className="">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="checkNewsLetter"
//                             onChange={(e) => setIsCompanyTerms(!isCompanyTerms)}
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="checkNewsLetter"
//                           >
//                             Yes, i want to recieve newsletters of Promos and
//                             Offers
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="checkTerms"
//                             onChange={(e) => setIsCompanyTerms(!isCompanyTerms)}
//                           />
//                           <label className="form-check-label" htmlFor="checkTerms">
//                             I agree to the Terms and Privacy Policy
//                           </label>
//                         </div>
//                       </div>
//                     </LoginInput>
//                     <LoginButton>
//                       <div className="">
//                         {isCompanyTerms &&
//                         formData.c_password &&
//                         formData.phone &&
//                         formData.email &&
//                         formData.contactFirstName &&
//                         formData.contactLastName &&
//                         formData.name &&
//                         (formData.refferedBy || formData.sourceOthers) &&
//                         formData.password ? (
//                           <button type="submit">Sign up</button>
//                         ) : (
//                           <button disabled>Sign up</button>
//                         )}

//                         <p className="text-center">
//                           Already have an account?{" "}
//                           <span className="">
//                             <Link to="/login">Sign in </Link>
//                           </span>
//                         </p>
//                       </div>
//                     </LoginButton>
//                   </form>
//                 </div>
//               </RightWrapper>
//             </div>
//           )}
//         </div>
//       </div>
//     </Wrapper>
//   );
// }

// export default Signup;

// const Wrapper = styled.div`
//   .content {
//     display: grid;
//     @media (min-width: 900px) {
//       grid-template-columns: 1fr 1fr;
//     }
//   }
// `;

// const RightWrapper = styled.section`
//   background: #ffffff;
//   padding: 8rem 4rem 4rem 4rem;
//   @media (max-width: 900px) {
//     padding: 4rem 3rem;
//   }
//   Link {
//     text-decoration: none;
//   }
//   .login-btn {
//   }
//   .top_login_btn {
//     padding-bottom: 50px;
//     button {
//       font-style: normal;
//       font-weight: 500;
//       font-size: 16px;
//       line-height: 20px;
//       letter-spacing: -0.04em;
//       outline: none;
//       border: none;
//       background: #ffffff;
//     }
//     .blue_login_btn {
//       background: #111e6c;
//       border-radius: 10px;
//       padding: 10px 10px;
//       outline: none;
//       border: none;
//       color: #f2f2f2;
//       margin-left: 10px;
//     }
//   }
//   h4 {
//     font-style: normal;
//     font-weight: 700;
//     font-size: 33px;
//     line-height: 40px;
//     color: #222222;
//     padding-bottom: 60px;
//   }
//   .login_input {
//   }
//   input[type="text"],
//   input[type="email"],
//   input[type="password"] {
//     width: 239.5px;
//     height: 54px;
//     border: 1.5px solid #e0e0e0;
//     border-radius: 8px;
//     padding-left: 20px;
//     position: relative;
//   }
//   label {
//     font-style: normal;
//     font-weight: 400;
//     font-size: 17px;
//     line-height: 21px;
//     letter-spacing: -0.04em;
//     color: #828282;
//     padding-bottom: 15px;
//     padding-left: 10px;
//   }
//   h3 {
//     font-family: "Montserrat";
//     font-style: normal;
//     font-weight: 300;
//     font-size: 13px;
//     line-height: 16px;
//     display: flex;
//     align-items: center;
//     letter-spacing: -0.02em;
//     color: #e20d0d;
//     padding-top: 12px;
//   }
// `;

// const LoginInput = styled.div`
//   label,
//   span {
//     font-style: normal;
//     font-weight: 500;
//     font-size: 17px;
//     line-height: 21px;
//     letter-spacing: -0.04em;
//     color: #828282;
//   }
//   label {
//     padding-bottom: 7px;
//     padding-left: 8px;
//   }
//   span {
//     padding-left: 200px;
//   }
//   .input_password {
//     position: relative;
//     i {
//       position: absolute;
//       right: 15px;
//       top: 12px;
//       cursor: pointer;
//     }
//   }
// `;
// const LoginButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   button {
//     background: #111e6c;
//     border-radius: 10px;
//     padding: 10px 120px;
//     font-style: normal;
//     font-weight: 600;
//     font-size: 18px;
//     line-height: 22px;
//     color: #ffffff;
//     margin-top: 80px;
//   }
//   p {
//     font-style: normal;
//     font-weight: 400;
//     font-size: 17px;
//     line-height: 21px;
//     letter-spacing: -0.04em;
//     color: #333333;
//     margin-top: 15px;
//   }
//   span {
//     color: rgba(28, 68, 141, 1);
//   }
// `;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData({
//       ...formData,
//       [name]: value,
//     });

//     if (name == "c_password") {
//       if (!confirmPassword(e.target.value)) {
//         setC_PasswordError("Password mismatch");
//       } else {
//         setC_PasswordError(null);
//       }
//     }

//     if (name == "email") {
//       if (!isValidEmail(e.target.value)) {
//         setEmailError("Email is invalid");
//       } else {
//         setEmailError(null);
//       }
//     }

//     if (name === "password") {
//       if (!validatePassword(e.target.value)) {
//         setPasswordError(
//           "Your password must contain at least one digit, 8 characters, one special character"
//         );
//       } else {
//         setPasswordError(null);
//       }
//     }
//     if (name == "sourceOthers") {
//       e.target.value.sourceOthers < 3
//         ? setSourceError("Select the source field")
//         : setSourceError(null);
//     }

//     if (name == "password") {
//       e.target.value.password < 3
//         ? setPasswordError(
//             "Password field is required and should be at least 4 characters"
//           )
//         : setPasswordError(null);
//     }

//     if (name == "c_password") {
//       e.target.value.c_password < 3
//         ? setC_PasswordError(
//             "Confirm password field is required and should be at least 4 characters"
//           )
//         : setC_PasswordError(null);
//     }

//     if (name == "contactFirstName") {
//       e.target.value.contactFirstName < 3
//         ? setContactFNameError(
//             "Contact first name field is required and should be at least 4 characters"
//           )
//         : setContactFNameError(null);
//     }

//     if (name == "contactLastName") {
//       e.target.value.contactLastName < 3
//         ? setContactLNameError(
//             "Contact last name field is required and should be at least 4 characters"
//           )
//         : setContactLNameError(null);
//     }

//     if (name == "phone") {
//       e.target.value.phone < 3
//         ? setNumError(
//             "Contact number field is required and should be greater than 11 digits"
//           )
//         : setNumError(null);
//     }

//     // if (name == "email") {
//     //   if (e.target.value.length < 3) {
//     //     setCompanyNameError(
//     //       "Source field is required and should be at least 4 characters"
//     //     );
//     //   } else {
//     //     setCompanyNameError(null);
//     //   }
//     // }
//   };

// const [numError, setNumErr?or] = useState(null);
// const [numError, setNumError] = useState(null);
// const [errorMessage, setErrorMessage] = useState({});
// const [emailError, setEmailError] = useState(null);

//  const [sourceError, setSourceError] = useState(false);
//  const [companyNameError, setCompanyNameError] = useState(null);
//  const [contactFNameError, setContactFNameError] = useState(null);
//  const [contactLNameError, setContactLNameError] = useState(null);
//  const [emailError, setEmailError] = useState(null);
//  const [numError, setNumError] = useState(null);
//  const [passwordError, setPasswordError] = useState(null);
//  const [c_passwordError, setC_PasswordError] = useState(null);

// const handleCompanySubmit = async (e) => {
//   e.preventDefault();

//   let value = formData;


//   const {
//     email,
//     password,
//     source,
//     contactFirstName,
//     contactLastName,
//     sourceOthers,
//     phone,
//     name,
//     refferedBy,
//   } = formData;
//   let company = {
//     contactFirstName,
//     contactLastName,
//     name,
//   };

//   let data = {
//     company,
//     email,
//     isAssited: true,
//     isNewsLetters: isCompanyNewsLetters,
//     password,
//     phone,
//     role: "COMPANY",
//     source,
//     sourceOthers,
//     usage: "TREASURY",
//     refferedBy,
//   };
//   // dispatch(registerCompany(data));
// };

// function confirmPassword(c_password) {
//   return c_password == formData.password;
// }

// function isValidEmail(email) {
//   return /\S+@\S+\.\S+/.test(email);
// }

// function validatePassword(password) {
//   var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

//   return re.test(password);
// }

// const [formData, setformData] = useState(data);

// const data = {
//   email: "",
//   password: "",
//   phone: "",
//   source: "",
//   sourceOthers: "",
//   contactFirstName: "",
//   contactLastName: "",
//   contactMiddleName: "",
//   refferedBy: "",
//   c_password: "",
//   name: "",
// };
