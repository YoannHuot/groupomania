import axios from "axios";
import react, { useEffect, useState } from "react";

const useActivity = () => {
	const [activity, setActivity] = useState([]);

	const getActivities = async () => {
		const result = await axios.get("http://localhost:5000/activity/getActivity");
		setActivity(result);
	};

	const deleteActivity = async (id) => {
		const result = await axios.delete("http://localhost:5000/activity/deleteActivity", {
			data: { activityId: id }
		});
		setActivity(result);
	};

	return {
		activity,
		deleteActivity,
		getActivities
	};
};

export default useActivity;
