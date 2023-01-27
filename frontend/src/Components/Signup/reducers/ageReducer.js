const ageReducer = (state, action) => {
	if (action.type === "USER_AGE_INPUT") {
		return { value: action.val, isValid: true };
	}
	if (action.type === "USER_AGE_INPUT_BLUR") {
		return { value: state.value, isValid: true };
	}
	return { value: "", isValid: false };
};

export default ageReducer;
