import { GET_USER, POST_USER, GET_OTHER_USER } from "./types";

const initialState = {
	data: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER:
			return {
				data: action.payload
			};
		case POST_USER:
			return {
				data: action.payload
			};
		case GET_OTHER_USER:
			return {
				data: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
