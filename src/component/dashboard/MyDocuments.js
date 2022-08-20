// import React, { useState } from "react";
// import { ProfileTabs } from "./ProfileTabs";
// import { ProfileNavBar } from "./ProfileNavbar";
// import styled from "styled-components";
// import Footer from "./ProfileFooter";
// import { ProfileSideBarList } from "./ProfileSideBar";
// import ModalComponent from "../ModalComponent";
// import { OTPVerify } from "../Accessories/BVNConfirm";

// export const MyDocument = ({ setTabs }) => {
//   return (
//     <WrappProfile>
//       <div className="content">
//         <ProfileSideBarList />
//         <div>
//           <div>
//             <ProfileNavBar />
//             <div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "0.2fr 1fr",
//                 }}
//                 className="">
//                 <ProfileTabs handleChange={(e) => setTabs(e)} />
//                 <ProfileEdit />
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
//   const [show, setShow] = useState(false);

//   return (
//     <div>
//       <div>
//         <WrapperBody>
//           <div>
//             <div className="banner"></div>
//             <div className="body_text d-flex align-items-center justify-content-between">
//               <div>
//                 <h4>Personal Details</h4>
//                 <p>Update your photo and personal Details</p>
//               </div>
//               <div>
//                 <button
//                   onClick={() => setShow(true)}
//                   style={{
//                     borderRadius: "5px",
//                     color: "#F2F2F2",
//                     fontFamily: "Montserrat",
//                     fontStyle: "normal",
//                     width: "72px",
//                     height: "34px",
//                     background: "#111E6C",
//                     outline: "none",
//                     border: "none",
//                   }}>
//                   Edit
//                 </button>
//               </div>
//               <ModalComponent
//                 show={show}
//                 size={"md"}
//                 handleClose={() => setShow(false)}>
//                 <OTPVerify
//                   bank="bank"
//                   show={show}
//                   handleClose={() => setShow(false)}
//                 />
//               </ModalComponent>
//             </div>
//             <div className="row">
//               <div className="col-md-6 ">
//                 <label>Gender</label>
//                 <div className="input-group mb-4">
//                   <input
//                     className="form-control"
//                     placeholder="Gender"
//                     aria-label="First Name..."
//                     type="text"
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6 ">
//                 <label>Date of Birth</label>
//                 <div className="input-group mb-4">
//                   <input
//                     className="form-control"
//                     placeholder="Date of Birth"
//                     aria-label="First Name..."
//                     type="text"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="upload_file_body">
//               <div className="upload_file d-flex align-items-center justify-content-between">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div className="box"></div>
//                   <div>
//                     <p className="file_font">Upload ID (front)</p>
//                     <p className="file_font">jpg, png. 2 MB</p>
//                   </div>
//                 </div>
//                 <button
//                   style={{
//                     borderRadius: "5px",
//                     color: "#828282",
//                     fontFamily: "Montserrat",
//                     fontStyle: "normal",
//                     width: "87px",
//                     height: "34px",
//                     background: "#F2F2F2",
//                     outline: "none",
//                     border: "none",
//                     fontSize: "13px",
//                     fontWeight: "500",
//                   }}
//                   className="file_button">
//                   Choose file
//                 </button>
//               </div>
//               <div className="upload_file d-flex align-items-center justify-content-between">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div className="box"></div>
//                   <div>
//                     <p className="file_font">Upload ID (front)</p>
//                     <p className="file_font">jpg, png. 2 MB</p>
//                   </div>
//                 </div>
//                 <button
//                   style={{
//                     borderRadius: "5px",
//                     color: "#828282",
//                     fontFamily: "Montserrat",
//                     fontStyle: "normal",
//                     width: "87px",
//                     height: "34px",
//                     background: "#F2F2F2",
//                     outline: "none",
//                     border: "none",
//                     fontSize: "13px",
//                     fontWeight: "500",
//                   }}
//                   className="file_button">
//                   Choose file
//                 </button>
//               </div>
//               <div className="upload_file d-flex align-items-center justify-content-between">
//                 <div className="d-flex align-items-center justify-content-between">
//                   <div className="box"></div>
//                   <div>
//                     <p className="file_font">Upload ID (front)</p>
//                     <p className="file_font">jpg, png. 2 MB</p>
//                   </div>
//                 </div>
//                 <button
//                   style={{
//                     borderRadius: "5px",
//                     color: "#828282",
//                     fontFamily: "Montserrat",
//                     fontStyle: "normal",
//                     width: "87px",
//                     height: "34px",
//                     background: "#F2F2F2",
//                     outline: "none",
//                     border: "none",
//                     fontSize: "13px",
//                     fontWeight: "500",
//                   }}
//                   className="file_button">
//                   Choose file
//                 </button>
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

//   .body_text {
//     padding-bottom: 45px;
//   }
//   .upload_file_body {
//     padding-top: 80px;
//     padding-bottom: 20px;
//   }
//   .upload_file {
//     padding-top: 10px;
//     padding-bottom: 10px;
//   }
//   .file_font_awe {
//     font-size: 70px;
//   }
//   .box {
//     width: 60px;
//     height: 70px;
//     border: 2px solid #e0e0e0;
//     border-radius: 15px;
//     margin-right: 15px;
//     margin-bottom: 15px;
//   }
//   .file_font {
//     font-style: normal;
//     font-weight: 400;
//     font-size: 15px;
//     line-height: 18px;
//     letter-spacing: -0.04em;
//     text-transform: capitalize;
//     color: #828282;
//   }
//   .file_button {
//     background: #f2f2f2;
//     border-radius: 5px;
//   }

//   .banner {
//     height: 219px;
//     background: #e0e0e0;
//     border-radius: 50px 0px 0px 0px;
//     margin-bottom: 25px;
//   }
//   h4 {
//     font-style: normal;
//     font-weight: 600;
//     font-size: 20px;
//     line-height: 24px;
//     text-transform: capitalize;
//     color: #222222;
//   }

//   p {
//     font-style: normal;
//     font-weight: 500;
//     font-size: 19px;
//     line-height: 23px;
//     letter-spacing: -0.02em;
//     color: #333333;
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
// `;
