import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
    GET_CATEGORIES_WITH_PRODUCTS,
    GET_CATEGORIES_WITH_PRODUCTS_SUCCESS,
    GET_CATEGORIES_WITH_PRODUCTS_ERROR,
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CATEGORIES_SUCCESS,
    GET_PRODUCT_CATEGORIES_ERROR
  } from './actionTypes';
  
  const initialState = {
    loading: false,
    products: null,
    productsError: null,
    singleProduct: null,
    singleProductError: null,
    catWithProducts: null,
    catWithProductsError: null,
    categories: null,
    categoriesError: null
  };
  
  const product = ( state=initialState, action ) => {
    switch (action.type) {
      case GET_PRODUCTS:
      case GET_SINGLE_PRODUCT:
      case GET_CATEGORIES_WITH_PRODUCTS:
      case GET_PRODUCT_CATEGORIES:
        state = {
          ...state,
          loading: true
        }
        break;
        
      case GET_PRODUCTS_SUCCESS:
        state = {
          ...state,
          loading: false,
          products: action.payload,
          productsError: null
        }
        break;
  
      case GET_PRODUCTS_ERROR:
        state = {
          ...state,
          loading: false,
          products: null,
          productsError: action.payload
        }
        break;
  
      case GET_SINGLE_PRODUCT_SUCCESS:
        state = {
          ...state,
          loading: false,
          singleProduct: action.payload,
          singleProductError: null
        }
        break;
  
      case GET_SINGLE_PRODUCT_ERROR:
        state = {
          ...state,
          loading: false,
          singleProduct: null,
          singleProductError: action.payload
        }
        break;
  
      case GET_CATEGORIES_WITH_PRODUCTS_SUCCESS:
        state = {
          ...state,
          loading: false,
          catWithProducts: action.payload,
          catWithProductsError: null
        }
        break;
  
      case GET_CATEGORIES_WITH_PRODUCTS_ERROR:
        state = {
          ...state, 
          loading: false,
          catWithProducts: null,
          catWithProductsError: action.payload
        }
        break;

      case GET_PRODUCT_CATEGORIES_SUCCESS:
        state = {
          ...state,
          loading: false,
          categories: action.payload,
          categoriesError: null
        };
        break;

      case GET_PRODUCT_CATEGORIES_ERROR:
        state = {
          ...state,
          loading: false,
          categories: null,
          categoriesError: action.payload
        };
        break;
  
      default:
        state = { ...state }
        break;
    };
  
    return state;
  };
  
  export default product;