import {
	CREATE_PLAN,
	CREATE_PLAN_ERROR,
	CREATE_PLAN_SUCCESS,
    DELETE_PLAN,
    DELETE_PLAN_ERROR,
    DELETE_PLAN_SUCCESS,
	GET_CONTRIB_VAL,
	GET_CONTRIB_VAL_ERROR,
	GET_CONTRIB_VAL_SUCCESS,
	GET_ELIGIBLE_PLANS,
	GET_ELIGIBLE_PLANS_ERROR,
	GET_ELIGIBLE_PLANS_SUCCESS,
	GET_EX_RATES,
	GET_EX_RATES_ERROR,
	GET_EX_RATES_SUCCESS,
    GET_INVESTMENT_RATES,
    GET_INVESTMENT_RATES_ERROR,
    GET_INVESTMENT_RATES_SUCCESS,
    GET_PENAL_CHARGE,
    GET_PENAL_CHARGE_ERROR,
    GET_PENAL_CHARGE_SUCCESS,
    GET_PLAN_HISTORY,
    GET_PLAN_HISTORY_ERROR,
    GET_PLAN_HISTORY_SUCCESS,
    GET_PLANS,
    GET_PLANS_ERROR,
    GET_PLANS_SUCCESS,
    GET_SINGLE_PLAN,
    GET_SINGLE_PLAN_ERROR,
    GET_SINGLE_PLAN_SUCCESS,
    GET_SINGLE_PLAN_HISTORY,
    GET_SINGLE_PLAN_HISTORY_ERROR,
    GET_SINGLE_PLAN_HISTORY_SUCCESS,
    GET_TENOR,
    GET_TENOR_ERROR,
    GET_TENOR_SUCCESS,
    GET_WITHHOLDING_TAX,
    GET_WITHHOLDING_TAX_ERROR,
    GET_WITHHOLDING_TAX_SUCCESS,
    PAY_WITH_CARD,
    PAY_WITH_CARD_ERROR,
    PAY_WITH_CARD_SUCCESS,
    PLAN_ACTION,
    PLAN_ACTION_ERROR,
    PLAN_ACTION_SUCCESS,
    VIEW_BANK_DETAIL,
    VIEW_BANK_DETAIL_ERROR,
    VIEW_BANK_DETAIL_SUCCESS,
} from "./actionTypes";

export const getContribVal = () => {
	return {
		type: GET_CONTRIB_VAL,
	};
};

export const getContribValSuccess = (data) => {
	return {
		type: GET_CONTRIB_VAL_SUCCESS,
		payload: data,
	};
};

export const getContribValError = (error) => {
	return {
		type: GET_CONTRIB_VAL_ERROR,
		payload: error,
	};
};

export const getExRates = () => {
	return {
		type: GET_EX_RATES,
	};
};

export const getExRatesSuccess = (data) => {
	return {
		type: GET_EX_RATES_SUCCESS,
		payload: data,
	};
};

export const getExRatesError = (error) => {
	return {
		type: GET_EX_RATES_ERROR,
		payload: error,
	};
};

export const createPlan = (formData, setShow) => {
	return {
		type: CREATE_PLAN,
		payload: { formData, setShow },
	};
};

export const createPlanSuccess = (data) => {
	return {
		type: CREATE_PLAN_SUCCESS,
		payload: data,
	};
};

export const createPlanError = (error) => {
	return {
		type: CREATE_PLAN_ERROR,
		payload: error,
	};
};

export const deletePlan = (id) => {
    return {
        type: DELETE_PLAN,
        payload: {id}
    }
}

export const deletePlanSuccess = (data) => {
    return {
        type: DELETE_PLAN_SUCCESS,
        payload: data
    }
}

export const deletePlanError = (error) => {
    return {
        type: DELETE_PLAN_ERROR,
        payload: error
    }
}

export const getInvestmentRates = () => {
    return {
        type: GET_INVESTMENT_RATES
    }
}

export const getInvestmentRatesSuccess = (data) => {
    return {
        type: GET_INVESTMENT_RATES_SUCCESS,
        payload: data
    }
}

export const getInvestmentRatesError = (error) => {
    return {
        type: GET_INVESTMENT_RATES_ERROR,
        payload: error
    }
}

export const getPlans = () => {
    return {
        type: GET_PLANS
    }
}

export const getPlansSuccess = (data) => {
    return {
        type: GET_PLANS_SUCCESS,
        payload: data,
    }
}

export const getPlansError = (error) => {
    return {
        type: GET_PLANS_ERROR,
        payload: error,
    }
}

export const getSinglePlan = (id) => {
    return {
        type: GET_SINGLE_PLAN,
        payload: {id}
    }
}

export const getSinglePlanSuccess = (data) => {
    return {
        type: GET_SINGLE_PLAN_SUCCESS,
        payload: data
    }
}

export const getSinglePlanError = (error) => {
    return {
        type: GET_SINGLE_PLAN_ERROR,
        payload: error
    }
}

export const getTenor = (formData) => {
    return {
        type: GET_TENOR,
        payload: {formData}
    }
}

export const getTenorSuccess = (data) => {
    return {
        type: GET_TENOR_SUCCESS,
        payload: data
    }
}

export const getTenorError = (error) => {
    return {
        type: GET_TENOR_ERROR,
        payload: error
    }
}

export const getWithholdingTax = () => {
    return {
        type: GET_WITHHOLDING_TAX
    }
}

export const getWithholdingTaxSuccess = (data) => {
    return {
        type: GET_WITHHOLDING_TAX_SUCCESS,
        payload: data
    }
}

export const getWithholdingTaxError = (error) => {
    return {
        type: GET_WITHHOLDING_TAX_ERROR,
        payload: error
    }
}

export const planAction = (formData, onSuccess) => {
	return {
		type: PLAN_ACTION,
		payload: { formData, onSuccess },
	};
};

export const planActionSuccess = (data) => {
	return {
		type: PLAN_ACTION_SUCCESS,
		payload: data,
	};
};

export const planActionError = (error) => {
	return {
		type: PLAN_ACTION_ERROR,
		payload: error,
	};
};

export const getEligiblePlans = () => {
    return {
        type: GET_ELIGIBLE_PLANS,
    }
}

export const getEligiblePlansSuccess = (data) => {
    return {
        type: GET_ELIGIBLE_PLANS_SUCCESS,
        payload: data,
    }
}

export const getEligiblePlansError = (error) => {
    return {
        type: GET_ELIGIBLE_PLANS_ERROR,
        payload: error,
    }
}

export const getPlanHistory = () => {
    return {
        type: GET_PLAN_HISTORY,
    }
};

export const getPlanHistorySuccess = (data) => {
    return {
        type: GET_PLAN_HISTORY_SUCCESS,
        payload: data,
    }
};

export const getPlanHistoryError = (error) => {
    return {
        type: GET_PLAN_HISTORY_ERROR,
        payload: error,
    }
};

export const getSinglePlanHistory = (id) => {
    return {
        type: GET_SINGLE_PLAN_HISTORY,
        payload: {id}
    }
};

export const getSinglePlanHistorySuccess = (data) => {
    return {
        type: GET_SINGLE_PLAN_HISTORY_SUCCESS,
        payload: data,
    }
};

export const getSinglePlanHistoryError = (error) => {
    return {
        type: GET_SINGLE_PLAN_HISTORY_ERROR,
        payload: error,
    }
};

export const viewBankDetail = (id) => {
    return {
        type: VIEW_BANK_DETAIL,
        payload: {id}
    }
};

export const viewBankDetailSuccess = (data) => {
    return {
        type: VIEW_BANK_DETAIL_SUCCESS,
        payload: data,
    }
};

export const viewBankDetailError = (error) => {
    return {
        type: VIEW_BANK_DETAIL_ERROR,
        payload: error,
    }
};

export const getPenalCharge = () => {
    return {
        type: GET_PENAL_CHARGE
    }
};

export const getPenalChargeSuccess = (data) => {
    return {
        type: GET_PENAL_CHARGE_SUCCESS,
        payload: data
    }
};

export const getPenalChargeError = (error) => {
    return {
        type: GET_PENAL_CHARGE_ERROR,
        payload: error
    }
};

export const payWithCard = (id) => {
    return {
        type: PAY_WITH_CARD,
        payload: {id}
    }
};

export const payWithCardSuccess = (data) => {
    return {
        type: [PAY_WITH_CARD_SUCCESS],
        payload: data,
    }
};

export const payWithCardError = (error) => {
    return {
        type: PAY_WITH_CARD_ERROR,
        payload: error,
    }
};