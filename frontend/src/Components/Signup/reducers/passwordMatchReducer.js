const passwordReducer = (state, action) => {
	if (action.type === "USER_PASSWORD_MATCH_INPUT") {
		return {
			valueConfirmPassword: action.val,
			valuePassword: action.val2,
			isValid: action.val === action.val2
		};
	}
	if (action.type === "USER_PASSWORD_INPUT_BLUR") {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: "", isValid: false };
};

export default passwordReducer;
