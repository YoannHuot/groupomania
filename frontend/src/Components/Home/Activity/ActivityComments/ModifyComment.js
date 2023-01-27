import React, { useState } from "react";
import axios from "axios";

const ModifyComment = (props) => {
	const [commentValue, setCommentValue] = useState(props.previousContent);

	const activityId = props.activityId;
	const commentId = props.commentId;

	const commentValueHandler = (e) => {
		e.preventDefault();
		setCommentValue(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		props.comments
			.modifyComment(activityId, commentId, commentValue)
			.then(() => props.comments.getComment(activityId));
		props.modifyCommentHandler();
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				value={commentValue}
				onChange={commentValueHandler}
				placeholder={"Changer votre publication"}
			></input>
			<button type={"submit"}>Valider</button>
		</form>
	);
};

export default ModifyComment;
