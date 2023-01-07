import {
    GET_CLOSED_TICKETS,
    GET_CLOSED_TICKETS_ERROR,
    GET_CLOSED_TICKETS_SUCCESS,
    GET_OPEN_TICKETS,
    GET_OPEN_TICKETS_ERROR,
    GET_OPEN_TICKETS_SUCCESS,
    GET_REPLIES,
    GET_REPLIES_ERROR,
    GET_REPLIES_SUCCESS,
    GET_SINGLE_TICKET,
    GET_SINGLE_TICKET_ERROR,
    GET_SINGLE_TICKET_SUCCESS,
    GET_TICKETS,
	GET_TICKETS_ERROR,
	GET_TICKETS_SUCCESS,
    GET_TICKET_CATEGORIES,
    GET_TICKET_CATEGORIES_ERROR,
    GET_TICKET_CATEGORIES_SUCCESS,
	POST_FEEDBACK,
	POST_FEEDBACK_ERROR,
	POST_FEEDBACK_SUCCESS,
    POST_REPLY,
    POST_REPLY_ERROR,
    POST_REPLY_SUCCESS,
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

export const getSingleTicket = (id) => {
    return {
        type: GET_SINGLE_TICKET,
        payload: {id}
    }
}

export const getSingleTicketSuccess = (data) => {
    return {
        type: GET_SINGLE_TICKET_SUCCESS,
        payload: data,
    }
}

export const getSingleTicketError = (error) => {
    return {
        type: GET_SINGLE_TICKET_ERROR,
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

export const postReply = (formData, dispatch) => {
	return {
		type: POST_REPLY,
		payload: { formData, dispatch },
	};
};

export const postReplySuccess = (data) => {
	return {
		type: POST_REPLY_SUCCESS,
		payload: data,
	};
};

export const postReplyError = (error) => {
	return {
		type: POST_REPLY_ERROR,
		payload: error,
	};
};

export const getReplies = (id) => {
    return {
        type: GET_REPLIES,
        payload: {id}
    }
};

export const getRepliesSuccess = (data) => {
    return {
        type: GET_REPLIES_SUCCESS,
        payload: data,
    }
};

export const getRepliesError = (error) => {
    return {
        type: GET_REPLIES_ERROR,
        payload: error
    }
};

export const getTicketCategories = () => {
    return {
        type: GET_TICKET_CATEGORIES,
    }
};

export const getTicketCategoriesSuccess = (data) => {
    return {
        type: GET_TICKET_CATEGORIES_SUCCESS,
        payload: data
    }
};

export const getTicketCategoriesError = (error) => {
    return {
        type: GET_TICKET_CATEGORIES_ERROR,
        payload: error
    }
};