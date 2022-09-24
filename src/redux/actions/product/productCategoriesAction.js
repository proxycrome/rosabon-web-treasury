import {
  GET_CATEGORIES_WITH_PRODUCTS,
  GET_CATEGORIES_WITH_PRODUCTS_SUCCESS,
  GET_CATEGORIES_WITH_PRODUCTS_ERROR
} from '../../constant/productActionTypes';
import { get_categories_with_products } from '../../api/product/productCategories.api';
  
export const getCatWithProducts = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_WITH_PRODUCTS });
  const { formData, errorObj } = await get_categories_with_products();
  console.log(formData);
  if (formData) {
    dispatch({ type: GET_CATEGORIES_WITH_PRODUCTS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_CATEGORIES_WITH_PRODUCTS_ERROR, payload: errorObj });
  }
};
  