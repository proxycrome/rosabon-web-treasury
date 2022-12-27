import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
// import ProfileUpdate from "./component/dashboard/ProfileUpdate";
import ProtectedRoute, { KYCRoute, NotProtectedRoute } from "./ProtectecRoute";
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
import PayWithCard from "./component/Plan/Plan/PayWithCard";
import Statement from "./component/Plan/statement";
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
import DebitCardCallback from "./component/Accessories/DebitCardCallback";

function PageRoutes({ login, isAuth, user }) {
	return (
		// <HashRouter>
		<Routes>
			<Route path="*" element={<p>Error 404</p>} />
			<Route
				path="/payment/callback"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<DebitCardCallback />
					</ProtectedRoute>
				}
			/>

			<Route
				exact
				path="/"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<HomeView />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/plan-product"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<PlanProduct />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/plan-list"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<ListPlans />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/plan-topup/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<TopupPlan />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/plan-payment"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<PlanPayment />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/create-plan/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<PlanForm />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/rollover/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<PlanRollover />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/transfer/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<Transfer />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/pay-with-card/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<PayWithCard />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/withdrawal/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<Withdrawal />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/history/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<Transactions />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/archives"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<Archives />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/user-wallet"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<UserWallet />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/wallet-history"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<HistoryTable />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/referral-table"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<ReferalTable />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/referral-table/bonus"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<ReferralBonus />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/deposit-table"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<TransferDeposit />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/special-earnings"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<SpecialEarnings />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/feedback"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<Feedback />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/feedback-tickets"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<FeedbackTickets />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/open-tickets"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<FeedbackOpenTickets />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/close-tickets"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<FeedbackCloseTickets />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin-message/:id"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<AdminMessage />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/help"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<Help />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/statement"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome>
							<Statement />
						</PlanHome>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/kyc"
				element={
					<KYCRoute isAuth={isAuth} user={user}>
						<KYC />
					</KYCRoute>
				}>
				<Route path="" element={<GeneralKYC />} />
			</Route>

			<Route
				path="/profile"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<Profile />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/plan-details-form"
				element={
					<ProtectedRoute isAuth={isAuth} user={user}>
						<PlanHome details="details" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<NotProtectedRoute isAuth={isAuth} user={user}>
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
