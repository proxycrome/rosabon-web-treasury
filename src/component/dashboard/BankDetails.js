// import React, { useState } from "react";
// import { ProfileTabs } from "./ProfileTabs";
// import { ProfileNavBar } from "./ProfileNavbar";
// import styled from "styled-components";
// import Footer from "./ProfileFooter";
// import { ProfileSideBarList } from "./ProfileSideBar";
// import ModalComponent from "../ModalComponent";
// import { BVNConfirm } from "../Accessories/BVNConfirm";

// export const BankDetail = ({ setTabs }) => {
//   return (
//     <div>
//       <WrappBankDetails>
//         <div className="content">
//           <ProfileSideBarList />
//           <div className="body">
//             <ProfileNavBar />
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "0.2fr 1fr",
//               }}>
//               <ProfileTabs handleChange={(e) => setTabs(e)} />
//               <BankDetails />
//             </div>
//           </div>
//         </div>
//         <Footer position="bank" />
//       </WrappBankDetails>
//     </div>
//   );
// };

// const WrappBankDetails = styled.div`
//   height: 100vh;
//   .content {
//     display: grid;
//     grid-template-columns: 0.2fr 1fr;
//     padding-bottom: 112px;
//   }
//   .navbar {
//     padding-bottom: 93px;
//   }
// `;

// const BankDetails = () => {
//   const [show, setShow] = useState(false);

//   return (
//     <div>
//       <WrapperBody>
//         <div className="d-flex align-items-center justify-content-between">
//           <h4 className="">My Bank Details</h4>
//           <div>
//             <button
//               style={{
//                 background: "none",
//                 color: "#242424",
//                 fontFamily: "Montserrat",
//                 fontStyle: "normal",
//                 width: "72px",
//                 height: "34px",
//                 outline: "none",
//                 border: "none",
//                 marginRight: "10px",
//               }}>
//               Cancel
//             </button>
//             <button
//               style={{
//                 borderRadius: "5px",
//                 color: "#F2F2F2",
//                 fontFamily: "Montserrat",
//                 fontStyle: "normal",
//                 width: "72px",
//                 height: "34px",
//                 background: "#111E6C",
//                 outline: "none",
//                 border: "none",
//               }}>
//               Edit
//             </button>
//           </div>
//         </div>
//         <div>
//           <div class="row">
//             <div class="col-md-8 ">
//               <label>Select Bank</label>
//               <div class="input-group mb-4">
//                 <input class="form-control" placeholder="" type="text" />
//               </div>
//             </div>
//           </div>
//           <div class="row">
//             <div class="col-md-3 ">
//               <label>Account Number</label>
//               <div class="input-group mb-4">
//                 <input class="form-control" placeholder="" type="text" />
//               </div>
//             </div>
//             <div class="col-md-3 ">
//               <button
//                 type="button"
//                 onClick={() => setShow(true)}
//                 className="profile_vify_btn">
//                 Verify
//               </button>
//             </div>
//             <ModalComponent
//               show={show}
//               size={"md"}
//               handleClose={() => setShow(false)}>
//               <BVNConfirm bank="bank" show={show} handleClose={() => setShow(false)} />
//             </ModalComponent>
            
//             <div class="col-md-6 ">
//               <label>Acount Name</label>
//               <div class="input-group mb-4">
//                 <input class="form-control" placeholder="" type="text" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </WrapperBody>
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
//   }
//   h3 {
//     font-style: normal;
//     font-weight: 700;
//     font-size: 33px;
//     line-height: 40px;
//     color: #222222;
//     padding-left: 10px;
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
//   .profile_vify_btn {
//     padding: 15px 33px;
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
