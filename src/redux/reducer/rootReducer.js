import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { userProfileReducer } from "./userProfile.reducer";

const reducer = combineReducers({
	auth: authReducer,
	user_profile: userProfileReducer
});

export default reducer;