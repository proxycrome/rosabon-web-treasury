import {
    GET_CATEGORIES_WITH_PRODUCTS,
	GET_CATEGORIES_WITH_PRODUCTS_ERROR,
	GET_CATEGORIES_WITH_PRODUCTS_SUCCESS,
	GET_PRODUCTS,
	GET_PRODUCTS_ERROR,
	GET_PRODUCTS_SUCCESS,
    GET_SINGLE_PRODUCT,
    GET_SINGLE_PRODUCT_ERROR,
    GET_SINGLE_PRODUCT_SUCCESS,
} from "./actionTypes";

export const getProducts = () => {
	return {
		type: GET_PRODUCTS,
	};
};

export const getProductsSuccess = (data) => {
	return {
		type: GET_PRODUCTS_SUCCESS,
		payload: data,
	};
};

export const getProductsError = (error) => {
	return {
		type: GET_PRODUCTS_ERROR,
		payload: error,
	};
};

export const getSingleProduct = (id) => {
    return {
        type: GET_SINGLE_PRODUCT,
        payload: {id},
    }
}

export const getSingleProductSuccess = (data) => {
    return {
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: data,
    }
}

export const getSingleProductError = (error) => {
    return {
        type: GET_SINGLE_PRODUCT_ERROR,
        payload: error,
    }
}

export const getCatWithProducts = () => {
    return {
        type: GET_CATEGORIES_WITH_PRODUCTS
    }
}

export const getCatWithProductsSuccess = (data) => {
    return {
        type: GET_CATEGORIES_WITH_PRODUCTS_SUCCESS,
        payload: data,
    }
}

export const getCatWithProductsError = (error) => {
    return {
        type: GET_CATEGORIES_WITH_PRODUCTS_ERROR,
        payload: error,
    }
}