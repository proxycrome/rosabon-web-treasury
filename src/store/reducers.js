import { combineReducers  } from 'redux';

import authReducer from './auth/reducer';
import currencies from './currency/reducer';
import feedback from './feedback/reducer';
import userProfileReducer from './profile/reducer';
import paystack from './paystack/reducer';
import plan from './plan/reducer';
import product from './product/reducer';
import providus from './providus/reducer';
import updateProfile from './updateProfile/reducer';
import wallet from './wallet/reducer';


const rootReducer = combineReducers({
    auth: authReducer,
    user_profile: userProfileReducer,
    updateProfile,
    wallet,
    feedback,
    product,
    plan,
    paystack,
    currencies,
    providus,
});

export default rootReducer;