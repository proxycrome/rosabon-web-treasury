import {
	CREATE_PLAN,
	CREATE_PLAN_ERROR,
	CREATE_PLAN_SUCCESS,
	GET_CONTRIB_VAL,
	GET_CONTRIB_VAL_ERROR,
	GET_CONTRIB_VAL_SUCCESS,
	GET_EX_RATES,
	GET_EX_RATES_ERROR,
	GET_EX_RATES_SUCCESS,
    GET_INVESTMENT_RATES,
    GET_INVESTMENT_RATES_ERROR,
    GET_INVESTMENT_RATES_SUCCESS,
    GET_PLANS,
    GET_PLANS_ERROR,
    GET_PLANS_SUCCESS,
    GET_SINGLE_PLAN,
    GET_SINGLE_PLAN_ERROR,
    GET_SINGLE_PLAN_SUCCESS,
    GET_TENOR,
    GET_TENOR_ERROR,
    GET_TENOR_SUCCESS,
    GET_WITHHOLDING_TAX,
    GET_WITHHOLDING_TAX_ERROR,
    GET_WITHHOLDING_TAX_SUCCESS
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