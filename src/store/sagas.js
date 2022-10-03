import { all } from "redux-saga/effects";

import AuthSaga from "./auth/saga";
import FeedbackSaga from "./feedback/saga";
import ProfileSaga from "./profile/saga";
import PlanSaga from "./plan/saga";
import ProductSaga from "./product/saga";
import UpdateProfileSaga from "./updateProfile/saga";
import WalletSaga from "./wallet/saga";

export default function* rootSaga() {
	yield all([
        AuthSaga(), 
        ProfileSaga(),
        UpdateProfileSaga(),
        WalletSaga(),
        FeedbackSaga(),
        ProductSaga(),
        PlanSaga(),
    ]);
}
