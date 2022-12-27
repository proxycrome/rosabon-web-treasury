import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
	GET_CATEGORIES_WITH_PRODUCTS,
	GET_PRODUCTS,
	GET_PRODUCT_CATEGORIES,
	GET_SINGLE_PRODUCT,
} from "./actionTypes";

import {
	getCatWithProductsError,
	getCatWithProductsSuccess,
	getProductsError,
	getProductsSuccess,
	getProductCategoriesError,
	getProductCategoriesSuccess,
	getSingleProductError,
	getSingleProductSuccess,
} from "./actions";

import {
	getCatWithProductsService,
	getCategoriesService,
	getProductsService,
	getSingleProductService,
} from "../../services/productService";

function* getProducts() {
	try {
		const response = yield call(getProductsService);
		yield put(getProductsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getProductsError(error?.response?.data));
	}
}

function* getSingleProduct({ payload: { id } }) {
	try {
		const response = yield call(getSingleProductService, id);
		yield put(getSingleProductSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getSingleProductError(error?.response?.data));
	}
}

function* getCatWithProducts() {
	try {
		const response = yield call(getCatWithProductsService);
		yield put(getCatWithProductsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getCatWithProductsError(error?.response?.data));
	}
}

function* getProductCategories() {
	try {
		const response = yield call(getCategoriesService);
		yield put(getProductCategoriesSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getProductCategoriesError(error?.response?.data));
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

export function* watchGetProductCategories() {
	yield takeEvery(GET_PRODUCT_CATEGORIES, getProductCategories);
}

function* ProductSaga() {
	yield all([
		fork(watchGetProducts),
		fork(watchGetSingleProduct),
		fork(watchGetCatWithProducts),
		fork(watchGetProductCategories),
	]);
}

export default ProductSaga;
