const lastNameReducer = (state, action) => {
	if (action.type === "USER_LAST_NAME_INPUT") {
		return { value: action.val, isValid: action.val.length > 2 };
	}
	if (action.type === "USER_LAST_NAME_INPUT_BLUR") {
		return { value: state.value, isValid: state.value.length > 2 };
	}
	return { value: "", isValid: false };
};

export default lastNameReducer;
