import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { CREATE_DYNAMIC_ACC } from "./actionTypes";

import { 
    createDynamicAccError, 
    createDynamicAccSuccess 
} from "./actions";

import { createDynamicAccService } from "../../services/providusService";

function* createDynamicAcc({ payload: { planName } }) {
    try {
        const response = yield call(createDynamicAccService, planName);
        yield put(createDynamicAccSuccess(response.data));
    } catch (error) {
        console.log(error?.response?.data)
        yield put(createDynamicAccError(error?.response?.data))
    }
};

export function* watchCreateDynamicAcc() {
	yield takeEvery(CREATE_DYNAMIC_ACC, createDynamicAcc);
};

function* ProvidusSaga() {
    yield all([
        fork(watchCreateDynamicAcc),
    ])
};

export default ProvidusSaga;