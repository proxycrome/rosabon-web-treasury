import * as types from "../../constant/auth";
import toast from 'react-hot-toast';
import {
  upload_personal_document,
  upload_company_document,
} from "../../api/updateProfile/uploadDocument.api";
import { PUT_PERSONAL_DOCUMENTS, PUT_PERSONAL_DOCUMENTS_ERROR, PUT_PERSONAL_DOCUMENTS_SUCCESS } from "../../constant/updateProfileActionTypes";


export const uploadCompanyDocument = (token) => async (dispatch) => {
  try {
    await upload_company_document(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const uploadPersonalDocument = (dataObj) => async (dispatch) => {
  dispatch({ type: PUT_PERSONAL_DOCUMENTS });
  const { formData, errorObj } = await upload_personal_document(dataObj);

  if (formData) {
    dispatch({ type: PUT_PERSONAL_DOCUMENTS_SUCCESS, payload: formData });
    setTimeout(() => {
      toast.success("Your documents have been updated successfully");
    }, 1000);
  }

  if (errorObj) {
    dispatch({ type: PUT_PERSONAL_DOCUMENTS_ERROR, payload: errorObj });
    setTimeout(() => {
      toast.error(errorObj.message);
    }, 1000);
  }
};