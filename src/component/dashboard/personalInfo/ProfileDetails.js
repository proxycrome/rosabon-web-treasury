// import React, { useState } from "react";
// import { ProfileTabs } from "../ProfileTabs";
// import { ProfileNavBar } from "../ProfileNavbar";
// import Footer from "../ProfileFooter";
// import { ProfileSideBarList } from "../ProfileSideBar";
// import styled from "styled-components";

// export const ProfileDetail = ({ setTabs }) => {

//   return (
//     <WrappProfile>
//       <div className="content">
//         <ProfileSideBarList />
//         <div >
//           <div>
//             <ProfileNavBar />
//             <div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "0.2fr 1fr",
//                 }}
//                 className="">
//                   <ProfileTabs handleChange={(e) => setTabs(e)} />
//                   <ProfileEdit />
//               </div>
//             </div>
//             <Footer position="bank" />
//           </div>
//         </div>
//       </div>
//     </WrappProfile>
//   );
// };

// const WrappProfile = styled.div`
//   .content {
//     display: grid;
//     grid-template-columns: 0.2fr 1fr;

//   }
// `;

// export const ProfileEdit = () => {
//   return (
//     <div>
//       <div>
//         <WrapperBody>
//           <div>
//             <div>
//               <h4>Personal Details</h4>
//               <div>
//                 <div className="row">
//                   <div className="col-md-4 ">
//                     <label>First Name</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="First Name"
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 ">
//                     <label>Middle Name</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="Middle Name"
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <label>Last Name</label>
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Last Name"
//                         aria-label="Last Name..."
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4 ">
//                     <label>Gender</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="Gender"
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 ">
//                     <label>Date of Birth</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="Date of Birth"
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 ps-2">
//                     <label>Primary phone number</label>
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Primary phone number"
//                         aria-label="Last Name..."
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-8 ">
//                     <label>Contact Person Email Address</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="Contact Person  Email Address"
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 ps-2">
//                     <label>BVN</label>
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder=""
//                         aria-label="Last Name..."
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-3 ">
//                     <label>Customer ID Number</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <h4 className="pt-5">Contact Details</h4>
//               <div>
//                 <div className="row">
//                   <div className="col-md-8 ">
//                     <label>Secondary Phone Number</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                   <div className="col-md-4 ">
//                     <label>Country of Residence</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="Middle Name"
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4 ">
//                     <label>State</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="State"
//                         aria-label="State..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 ">
//                     <label>City</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder="City"
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <label>City</label>
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="City"
//                         aria-label="City..."
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className=" ">
//                     <label>Address</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder=""
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <h4 className="pt-5">Employment Details</h4>
//               <div>
//                 <div className="row">
//                   <div className="col-md-4 ">
//                     <label>Occupation</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                   <div className="col-md-4 ">
//                     <label>Employer’s name</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className=" ">
//                     <label>Employers Address</label>
//                     <div className="input-group mb-4">
//                       <input
//                         className="form-control"
//                         placeholder=""
//                         aria-label="First Name..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <h4 className="pt-5">Next Of kin details</h4>
//               <div>
//                 <div className="row">
//                   <div className="col-md-4 ">
//                     <label>Next of Kin Name</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                   <div className="col-md-8 ">
//                     <label>Next of Kin Email</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className=" ">
//                     <label>Next of Kin Address</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-8 ">
//                     <label>next of kin phone number</label>
//                     <div className="input-group mb-4">
//                       <input className="form-control" placeholder="" type="text" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </WrapperBody>
//       </div>
//     </div>
//   );
// };

// const WrapperBody = styled.div`
//   padding: 0 5rem;
//   border-left: 0.7px solid #e0e0e0;
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
//     padding-left: 10px;
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
//     width: 83px;
//     height: 54px;
//     margin-top: 35px;
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
