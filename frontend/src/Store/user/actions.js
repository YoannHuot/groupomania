import { GET_USER, POST_USER, GET_OTHER_USER } from "./types";

export const getUser = (data) => {
	return {
		type: GET_USER,
		payload: data
	};
};

export const postUser = (data) => {
	return {
		type: POST_USER,
		payload: data
	};
};
export const getOtherUser = (data) => {
	return {
		type: GET_OTHER_USER,
		payload: data
	};
};
