import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
	GET_CATEGORIES_WITH_PRODUCTS,
	GET_PRODUCTS,
	GET_SINGLE_PRODUCT,
} from "./actionTypes";

import {
	getCatWithProductsError,
	getCatWithProductsSuccess,
	getProductsError,
	getProductsSuccess,
	getSingleProductError,
	getSingleProductSuccess,
} from "./actions";

import {
	getCatWithProductsService,
	getProductsService,
	getSingleProductService,
} from "../../services/productService";

function* getProducts() {
	try {
		const response = yield call(getProductsService);
		console.log(response.data);
		yield put(getProductsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getProductsError(error?.response?.data));
	}
}

function* getSingleProduct({ payload: { id } }) {
	try {
		const response = yield call(getSingleProductService, id);
		console.log(response.data);
		yield put(getSingleProductSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getSingleProductError(error?.response?.data));
	}
}

function* getCatWithProducts() {
	try {
		const response = yield call(getCatWithProductsService);
		console.log(response.data);
		yield put(getCatWithProductsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getCatWithProductsError(error?.response?.data));
	}
}

export function* watchGetProducts() {
	yield takeEvery(GET_PRODUCTS, getProducts);
}

export function* watchGetSingleProduct() {
	yield takeEvery(GET_SINGLE_PRODUCT, getSingleProduct);
}

export function* watchGetCatWithProducts() {
	yield takeEvery(GET_CATEGORIES_WITH_PRODUCTS, getCatWithProducts);
}

function* ProductSaga() {
	yield all([
		fork(watchGetProducts),
		fork(watchGetSingleProduct),
		fork(watchGetCatWithProducts),
	]);
}

export default ProductSaga;
