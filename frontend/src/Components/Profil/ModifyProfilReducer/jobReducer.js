const jobReducer = (state, action) => {
	if (action.type === "USER_JOB_INPUT") {
		return { value: action.val, isValid: action.val.length > 3 };
	}
	if (action.type === "USER_JOB_INPUT_BLUR") {
		return { value: state.value, isValid: state.value.length > 3 };
	}
	return { value: "", isValid: false };
};

export default jobReducer;
