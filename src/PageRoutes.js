import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
// import ProfileUpdate from "./component/dashboard/ProfileUpdate";
import ProtectedRoute, { NotProtectedRoute } from "./ProtectecRoute";
import ForgotPassword from "./component/Auth/ForgotPassword";
import Congratulatios from "./component/Auth/Congratulatios";
import ResetPassword from "./component/Auth/ResetPassword";
import Authentication from "./component/Auth";
import Profile from "./pages";
import KYC from "./pages/KYC/KYC";
import PlanHome from "./component/Plan";
import HomeView from "./component/Plan/home/HomeView";
import ListPlans from "./component/Plan/Plan";
import TopupPlan from "./component/Plan/Plan/TopupPlan";
import PlanPayment from "./component/Plan/Plan/PlanPayment";
import PlanProduct from "./component/Plan/createPlan";
import PlanRollover from "./component/Plan/Plan/Rollover/Rollover";
import Transfer from "./component/Plan/Plan/Transfer/Transfer";
import Withdrawal from "./component/Plan/Plan/Withdrawal/Withdrawal";
import Transactions from "./component/Plan/Plan/Transactions";
import Archives from "./component/Plan/Plan/Archives";
import GeneralKYC from "./component/dashboard/Kyc/index";
import UserSignup from "./component/Auth/userSignup";
import CompanySignup from "./component/Auth/CompanySignup";
// import {PlanFrom} from "./component/Plan/createPlan/PlanForm"
import PlanForm from "./component/Plan/createPlan/PlanForm";
import Login from "./component/Auth/Login";
import UserWallet from "./component/Plan/wallet/UserWallet";
import Feedback from "./component/Plan/feedback/Feedback";
import AdminMessage from "./component/Plan/feedback/AdminMessage";
import Help from "./component/Plan/help/Help";
import {
	HistoryTable,
	ReferalTable,
	ReferralBonus,
	TransferDeposit,
	SpecialEarnings,
	FeedbackTickets,
	FeedbackOpenTickets,
	FeedbackCloseTickets,
} from "./component/Plan/Accesssories";

function PageRoutes({ login, isAuth }) {
	console.log(isAuth);
	return (
		// <HashRouter>
			<Routes>
				<Route path="*" element={<p>Error 404</p>} />
				<Route
					path="/"
					element={
						<ProtectedRoute isAuth={isAuth}>
							<PlanHome />
						</ProtectedRoute>
					}>
					<Route path="" element={<HomeView />} />
					<Route path="plan-product" element={<PlanProduct />} />
					<Route path="plan-list" element={<ListPlans />} />
					<Route path="plan-topup" element={<TopupPlan />} />
					<Route path="plan-payment" element={<PlanPayment />} />
					<Route path="create-plan" element={<PlanForm />} />
					<Route path="rollover" element={<PlanRollover />} />
					<Route path="transfer" element={<Transfer />} />
					<Route path="withdrawal" element={<Withdrawal />} />
					<Route path="history" element={<Transactions />} />
					<Route path="archives" element={<Archives />} />
					<Route path="user-wallet" element={<UserWallet />} />
					<Route path="wallet-history" element={<HistoryTable />} />
					<Route path="referral-table" element={<ReferalTable />} />
					<Route path="referral-table/bonus" element={<ReferralBonus />} />
					<Route path="deposit-table" element={<TransferDeposit />} />
					<Route path="special-earnings" element={<SpecialEarnings />} />
					<Route path="feedback" element={<Feedback />} />
					<Route path="feedback-tickets" element={<FeedbackTickets />} />
					<Route path="open-tickets" element={<FeedbackOpenTickets />} />
					<Route path="close-tickets" element={<FeedbackCloseTickets />} />
					<Route path="admin-message" element={<AdminMessage />} />
					<Route path="help" element={<Help />} />
				</Route>
				<Route
					path="/kyc"
					element={
						<ProtectedRoute isAuth={isAuth}>
							<KYC />
						</ProtectedRoute>
					}>
					<Route path="" element={<GeneralKYC />} />
				</Route>

				<Route
					path="/profile"
					element={
						<ProtectedRoute isAuth={isAuth}>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/plan-details-form"
					element={
						<ProtectedRoute isAuth={isAuth}>
							<PlanHome details="details" />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<NotProtectedRoute isAuth={isAuth}>
							<Login />
						</NotProtectedRoute>
					}
				/>

				<Route
					path="/register-user"
					element={
						<NotProtectedRoute isAuth={isAuth}>
							<UserSignup signup="signup" />
						</NotProtectedRoute>
					}
				/>
				<Route
					path="/register-company"
					element={
						<NotProtectedRoute isAuth={isAuth}>
							<CompanySignup signup="signup" />
						</NotProtectedRoute>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<NotProtectedRoute isAuth={isAuth}>
							<ForgotPassword />
						</NotProtectedRoute>
					}
				/>
				<Route
					path="/congrates"
					element={
						<NotProtectedRoute isAuth={isAuth}>
							<Congratulatios />
						</NotProtectedRoute>
					}
				/>
				<Route
					path="/reset-password"
					element={
						<NotProtectedRoute isAuth={isAuth}>
							<ResetPassword />
						</NotProtectedRoute>
					}
				/>
			</Routes>
		// </HashRouter>
	);
}

export default PageRoutes;
