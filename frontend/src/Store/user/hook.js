import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { getUser, postUser, getOtherUser } from "./actions";

const useUser = () => {
	const dispatch = useDispatch();
	const userStore = useSelector((state) => state.user);

	const auth = async () => {
		const result = await axios.get("http://localhost:5000/user/profil");
		dispatch(getUser(result.data));
	};

	const signup = async (e) => {
		const post = await axios.post("http://localhost:5000/user/signup", { payload: e });
		dispatch(postUser(post.data));
	};

	const otherUser = async (id) => {
		const get = await axios.get(`${"http://localhost:5000/user/"}${id}`);
		dispatch(getOtherUser(get.data));
	};

	return {
		userStore,
		auth,
		signup,
		otherUser
	};
};

export default useUser;
