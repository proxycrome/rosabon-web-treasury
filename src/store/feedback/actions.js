import {
    GET_CLOSED_TICKETS,
    GET_CLOSED_TICKETS_ERROR,
    GET_CLOSED_TICKETS_SUCCESS,
    GET_OPEN_TICKETS,
    GET_OPEN_TICKETS_ERROR,
    GET_OPEN_TICKETS_SUCCESS,
    GET_TICKETS,
	GET_TICKETS_ERROR,
	GET_TICKETS_SUCCESS,
	POST_FEEDBACK,
	POST_FEEDBACK_ERROR,
	POST_FEEDBACK_SUCCESS,
} from "./actionTypes";

export const postFeedback = (formData, setShow) => {
	return {
		type: POST_FEEDBACK,
		payload: { formData, setShow },
	};
};

export const postFeedbackSuccess = (data) => {
	return {
		type: POST_FEEDBACK_SUCCESS,
		payload: data,
	};
};

export const postFeedbackError = (error) => {
	return {
		type: POST_FEEDBACK_ERROR,
		payload: error,
	};
};


export const getTickets = () => {
    return {
        type: GET_TICKETS,
    }
}

export const getTicketsSuccess = (data) => {
    return {
        type: GET_TICKETS_SUCCESS,
        payload: data,
    }
}

export const getTicketsError = (error) => {
    return {
        type: GET_TICKETS_ERROR,
        payload: error
    }
}

export const getOpenTickets = () => {
    return {
        type: GET_OPEN_TICKETS,
    }
}

export const getOpenTicketsSuccess = (data) => {
    return {
        type: GET_OPEN_TICKETS_SUCCESS,
        payload: data
    }
}

export const getOpenTicketsError = (error) => {
    return {
        type: GET_OPEN_TICKETS_ERROR,
        payload: error,
    }
}

export const getClosedTickets = () => {
    return {
        type: GET_CLOSED_TICKETS,
    }
}

export const getClosedTicketsSuccess = (data) => {
    return {
        type: GET_CLOSED_TICKETS_SUCCESS,
        payload: data,
    }
}

export const getClosedTicketsError = (error) => {
    return {
        type: GET_CLOSED_TICKETS_ERROR,
        payload: error,
    }
}