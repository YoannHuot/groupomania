const birthdayReducer = (state, action) => {
	const calculateDate = () => {
		var diff = Math.abs(new Date() - new Date(action.val));
		let diffMilli = diff / 60000 / 60 / 24 / 365.25;
		return Math.floor(diffMilli);
	};
	if (action.type === "USER_BIRTHDAY_INPUT") {
		let result = calculateDate();
		return { age: result, value: action.val, isValid: result > 0 };
	}
	if (action.type === "USER_BIRTHDAY_INPUT_BLUR") {
		return { age: state.age, value: state.value, isValid: state.age > 0 };
	}
	return { value: "", isValid: false };
};

export default birthdayReducer;
