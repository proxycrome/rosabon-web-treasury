import * as types from "../../constant/auth";
import {
  upload_personal_document,
  upload_company_document,
} from "../../api/updateProfile/uploadDocument.api";


export const uploadCompanyDocument = (token) => async (dispatch) => {
  try {
    await upload_company_document(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const uploadPersonalDocument = (token) => async (dispatch) => {
  try {
    await upload_personal_document(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};