import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GET_CURRENCIES } from "./actionTypes";
import {
  getCurrenciesSuccess,
  getCurrenciesError
} from "./actions";
import { getCurrenciesService } from "../../services/currencyServices";

function* getCurrencies() {
  try {
    const response = yield call(getCurrenciesService);
		yield put(getCurrenciesSuccess(response.data));
  } catch (error) {
    yield put(getCurrenciesError(error?.response?.data))
  };
};

export function* watchGetCurrencies () {
  yield takeEvery(GET_CURRENCIES, getCurrencies);
};

function* CurrencySaga() {
	yield all([
		fork(watchGetCurrencies),
	]);
};

export default CurrencySaga;