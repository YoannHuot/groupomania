const titleReducer = (state, action) => {
	if (action.type === "TITLE_ADD") {
		return { value: action.val, isValid: action.val.length > 0 };
	}
	if (action.type === "END_TITLE") {
		return { value: "" };
	}
	return { value: "", isValid: false };
};

export default titleReducer;
