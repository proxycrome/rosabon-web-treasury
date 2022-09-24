import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userProfileReducer } from "./userProfile.reducer";
import wallet from "./walletReducer";
import updateProfile from "./updateProfileReducer";
import product from "./productReducer";
import plan from "./planReducer";
import feedback from "./feedbackReducer";

const reducer = combineReducers({
	auth: authReducer,
	user_profile: userProfileReducer,
	wallet,
	updateProfile,
	product,
	plan,
	feedback,
});

export default reducer;