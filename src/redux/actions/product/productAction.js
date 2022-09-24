import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR
} from '../../constant/productActionTypes';
import { get_products, get_single_product } from '../../api/product/product.api'

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS });
  const { formData, errorObj } = await get_products();
  console.log(formData);
  if (formData) {
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_PRODUCTS_ERROR, payload: errorObj });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_PRODUCT });
  const { formData, errorObj } = await get_single_product(id);
  console.log(formData);
  if (formData) {
    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: errorObj });
  }
};
