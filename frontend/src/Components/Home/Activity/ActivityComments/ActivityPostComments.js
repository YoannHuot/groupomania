import React, { useState, useEffect } from "react";
import classes from "./ActivityPostComments.module.css";
import axios from "axios";
import useActivity from "../../../../Store/activity/hook";
import useComments from "../../../../Hooks/useComments";

const ActivityComments = (props) => {
	const activity = useActivity();
	const commentStore = useComments();

	const [comments, setComments] = useState("");

	const addCommentText = (e) => {
		setComments(e.target.value);
	};

	useEffect(() => {
		activity.activities();
	}, []);

	const submitComment = (e) => {
		e.preventDefault();
		setComments("");

		const commentsData = {
			content: comments,
			activityId: props.activity.id
		};
		axios.post("http://localhost:5000/comments", commentsData).then(() => props.lastComment());
	};

	return (
		<>
			<form className={classes.add__comment} onSubmit={submitComment}>
				<div className={classes.add__comment__form}>
					<img src={props.user.imageUrl} />
					<input
						value={comments}
						onChange={addCommentText}
						placeholder="Ecrivez un commentaire"
						// className={classes.add__comment__input}
					></input>
					<button type="submit">Valider</button>
				</div>
			</form>
		</>
	);
};

export default ActivityComments;
