import { GET_ACTIVITY, GET_ACTIVITY_BY_USER } from "./types";

export const getActivity = (data) => {
	return {
		type: GET_ACTIVITY,
		payload: data
	};
};
