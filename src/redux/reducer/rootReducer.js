import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userProfileReducer } from "./userProfile.reducer";
import wallet from "./walletReducer";
import updateProfile from "./updateProfileReducer";

const reducer = combineReducers({
	auth: authReducer,
	user_profile: userProfileReducer,
	wallet,
	updateProfile,
});

export default reducer;