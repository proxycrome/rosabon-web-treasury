import toast from 'react-hot-toast';
import {
  upload_personal_document,
  upload_company_document,
} from '../../api/updateProfile/uploadDocument.api';
import {
  PUT_PERSONAL_DOCUMENTS,
  PUT_PERSONAL_DOCUMENTS_ERROR,
  PUT_PERSONAL_DOCUMENTS_SUCCESS,
  UPDATE_COMPANY_DOCS,
  UPDATE_COMPANY_DOCS_ERROR,
  UPDATE_COMPANY_DOCS_SUCCESS,
} from '../../constant/updateProfileActionTypes';

export const uploadCompanyDocument = (objData) => async (dispatch) => {
  dispatch({ type: UPDATE_COMPANY_DOCS });
  const { formData, errorObj } = await upload_company_document(objData);

  if (formData) {
    dispatch({ type: UPDATE_COMPANY_DOCS_SUCCESS, payload: formData });
    setTimeout(() => {
      toast.success('Your details have been updated successfully');
    }, 1000);
  }

  if (errorObj) {
    dispatch({ type: UPDATE_COMPANY_DOCS_ERROR, payload: errorObj });
    setTimeout(() => {
      toast.error(errorObj.message);
    }, 1000);
  }
};

export const uploadPersonalDocument = (dataObj) => async (dispatch) => {
  dispatch({ type: PUT_PERSONAL_DOCUMENTS });
  const { formData, errorObj } = await upload_personal_document(dataObj);

  if (formData) {
    dispatch({ type: PUT_PERSONAL_DOCUMENTS_SUCCESS, payload: formData });
    setTimeout(() => {
      toast.success('Your documents have been updated successfully');
    }, 1000);
  }

  if (errorObj) {
    dispatch({ type: PUT_PERSONAL_DOCUMENTS_ERROR, payload: errorObj });
    setTimeout(() => {
      toast.error(errorObj.message);
    }, 1000);
  }
};
