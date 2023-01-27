import { GET_ACTIVITY, GET_ACTIVITY_BY_USER } from "./types";

const initialState = {
	data: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ACTIVITY:
			return {
				data: action.payload
			};

		default:
			return state;
	}
};

export default reducer;
