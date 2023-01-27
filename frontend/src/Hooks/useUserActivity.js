import { useState } from "react";
import axios from "axios";

const useUserActivity = () => {
	const [userActivity, setUserActivity] = useState({ message: "", likes: "", comments: "" });
	const [userAllActivity, setUserAllActiviy] = useState([]);

	const getUserAtivity = async (id) => {
		const result = await axios.get(
			`${"http://localhost:5000/activity/getActivityByUser"}${id}`
		);
		setUserActivity({
			message: result.data.message,
			likes: result.data.likes,
			comments: result.data.comments
		});
	};
	console.log("dans le back");
	console.log(userActivity);

	const getAllActivityByUser = async (id) => {
		const result = await axios.get(
			`${"http://localhost:5000/activity/getAllActivityByUser"}${id}`
		);
		setUserAllActiviy(result.data);
	};

	return {
		getUserAtivity,
		getAllActivityByUser,
		userActivity,
		userAllActivity
	};
};

export default useUserActivity;
