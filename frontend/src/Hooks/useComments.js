import { useState } from "react";
import axios from "axios";

const useComments = () => {
	const [comments, setComments] = useState([]);

	const getComment = async (id) => {
		const result = await axios.get(`${"http://localhost:5000/getComments?id="}${id}`);
		setComments(result.data);
	};

	const deleteComment = async (activityId, commentId) => {
		const result = await axios.delete(
			`${"http://localhost:5000/deleteComments?id="}${activityId}${"?commentId="}${commentId}`,
			{ data: { activityId: activityId, commentId: commentId } }
		);
		// setComments(result.data);
		// marche pas, fait planter le Map dans Activity pour une raison inconnue alors que le setComments marche, je suis donc passé par un .then(() => getComment() pour rafraichir le component...)
	};

	const modifyComment = async (activityId, commentId, content) => {
		await axios.put("http://localhost:5000/modifyComments", {
			data: { activityId: activityId, commentId: commentId, content: content }
		});
		// setComments(result.data)
		// marche pas, fait planter le Map dans Activity pour une raison inconnue alors que le setComments marche, je suis donc passé par un .then(() => getComment() pour rafraichir le component...)
	};

	return {
		getComment,
		deleteComment,
		modifyComment,
		comments
	};
};

export default useComments;
