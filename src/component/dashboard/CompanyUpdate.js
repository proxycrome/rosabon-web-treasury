// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useSelector, useDispatch } from "react-redux";
// import { ProfileSideBar } from "./ProfileSideBar";
// import { BVNConfirm } from "../Accessories/BVNConfirm";
// import ModalComponent from "../ModalComponent";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuthUsers } from "../../redux/actions/personalInfo/userProfile.actions";

// const CompanyUpdate = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const count = useSelector((state) => state.auth.signup_btn);
//   const company_details = useSelector((state) => state.user_profile.users);
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const tokenString = JSON.parse(localStorage.getItem("company-token"));
//     if (tokenString) {
//       dispatch(getAuthUsers(tokenString));
//     } else {
//       navigate("/login");
//     }
//   }, []);

//   return (
//     <div>
//       <div className="">
//         <div>
//           <div className="">
//             <WrapperBody>
//               <div>
//                 <div>
//                   <h3>Hello ,</h3>
//                   <p>
//                     Kindly update your profile, it will only take a few minutes
//                   </p>
//                   <h4>Company Details</h4>
//                   <div>
//                     <div className="row">
//                       <div className="col-md-8">
//                         <label>Company Name</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder="{company_details.company.name}"
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-6 col-lg-4 ">
//                         <label>Company RC number</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder="Company RC number"
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-lg-4 ">
//                         <label>Company Registration Date</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder="Company Registration Date"
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="mb-4">
//                         <label>Company Address</label>
//                         <div className="input-group">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Company Address"
//                             aria-label="Last Name..."
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-8 ">
//                         <label>Nature of Business</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder="Nature of Business"
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 ">
//                         <label>Company Type</label>
//                         <div className="input-group mb-4">
//                           <input className="form-control" type="text" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <h4 className="pt-5">Contact Person Details</h4>
//                   <div>
//                     <div className="row">
//                       <div className="col-md-4 ">
//                         <label>Contact Person First Name</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder=""
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 ">
//                         <label>Contact Person Last Name</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder=""
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-8 ">
//                         <label>Contact Person Email Address</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder="{company_details.email}"
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-4 ">
//                         <label>Contact person Number</label>
//                         <div className="input-group mb-4">
//                           <input
//                             className="form-control"
//                             placeholder="{company_details.phone}"
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </WrapperBody>
//             <WrapperFooter>
//               <Link to="/company-profile">
//                 <button className="">Save and Continue</button>
//               </Link>
//               <Link to="/company-profile">
//                 <button className="">Save and Invest Now</button>
//               </Link>
//             </WrapperFooter>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyUpdate;

// const WrapperFooter = styled.div`
//   width: 100%;
//   height: 114px;
//   background: #ffffff;
//   box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 5rem;

//   button {
//     width: 228px;
//     height: 44px;
//     background: #f2f2f2;
//     border-radius: 10px;
//     outline: none;
//     border: none;
//     color: #111e6c;
//   }
// `;
// const WrapperBody = styled.div`
//   padding: 6rem 5rem;
//   h4 {
//     font-style: normal;
//     font-weight: 600;
//     font-size: 20px;
//     line-height: 24px;
//     text-transform: capitalize;
//     color: #222222;
//     padding-bottom: 45px;
//   }
//   h3 {
//     font-style: normal;
//     font-weight: 700;
//     font-size: 33px;
//     line-height: 40px;
//     color: #222222;
//     padding-bottom: 15px;
//     /* padding-left: 10px; */
//   }
//   p {
//     font-style: normal;
//     font-weight: 500;
//     font-size: 19px;
//     line-height: 23px;
//     letter-spacing: -0.02em;
//     color: #333333;
//     padding-bottom: 65px;
//   }
//   input {
//     width: 239.5px;
//     height: 54px;
//     border: 1.5px solid #e0e0e0;
//     border-radius: 8px;
//     padding-left: 20px;
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
//   .profile_vify_btn {
//     padding: 10px 10px;
//     margin-top: 40px;
//     background: #111e6c;
//     border-radius: 8px;
//     font-style: normal;
//     font-weight: 600;
//     font-size: 17px;
//     line-height: 21px;
//     text-align: right;
//     color: #ffffff;
//   }
// `;
