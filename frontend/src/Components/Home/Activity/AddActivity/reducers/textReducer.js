const textReducer = (state, action) => {
	if (action.type === "TEXT_ADD") {
		return { value: action.val, isValid: action.val.length > 0 };
	}
	if (action.type === "END_TEXT") {
		return { value: "" };
	}
	return { value: "", isValid: false };
};

export default textReducer;
