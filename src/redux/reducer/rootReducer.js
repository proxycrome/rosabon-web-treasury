import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userProfileReducer } from "./userProfile.reducer";
import wallet from "./walletReducer";

const reducer = combineReducers({
	auth: authReducer,
	user_profile: userProfileReducer,
	wallet,
});

export default reducer;