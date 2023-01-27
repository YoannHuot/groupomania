import { useDispatch, useSelector } from "react-redux";
import { getActivity } from "./actions";
import axios from "axios";

const useActivity = () => {
	const dispatch = useDispatch();
	const activityStore = useSelector((state) => state.activity);

	const activities = async () => {
		const result = await axios.get("http://localhost:5000/activity/getActivity");
		dispatch(getActivity(result.data));
	};

	const deleteActivity = async (id) => {
		const result = await axios.delete("http://localhost:5000/activity/deleteActivity", {
			data: { activityId: id }
		});
		dispatch(getActivity(result.data));
	};

	const modifyActivity = async (data) => {
		const result = await axios.put("http://localhost:5000/activity/modifyActivity", data);
		dispatch(getActivity(result.data));
	};

	return {
		activityStore,
		deleteActivity,
		modifyActivity,
		activities
	};
};

export default useActivity;
