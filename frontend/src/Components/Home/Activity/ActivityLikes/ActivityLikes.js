import React, { useState, useEffect } from "react";
import { MdThumbUp } from "react-icons/md";
import classes from "./ActivityLikes.module.css";
import Axios from "axios";
import useActivity from "../../../../Store/activity/hook";

const ActivityLikes = (props) => {
	const userIdProps = props.user.id;
	const activityId = props.activity.id;
	const activity = useActivity();

	const [countLikes, setCountLikes] = useState(0);
	const [id, setId] = useState();
	const [userId, setUserId] = useState();

	useEffect(() => {
		activity.activities();
	}, []);

	useEffect(() => {
		setUserId(userIdProps);
		setId(activityId);
	}, [countLikes, activityId, userIdProps]);

	const likesHandler = () => {
		setId(props.activity.id);
		setCountLikes(countLikes + 1);
		setUserId(props.user.id);

		const likesData = {
			id: id,
			userId: userId,
			likes: countLikes
		};

		Axios.post("http://localhost:5000/likes", likesData).then(() => activity.activities());
	};

	return (
		<>
			<div onClick={likesHandler} className={classes.likes__card}>
				<button className={classes.likes__icon}>
					<MdThumbUp />
				</button>
				<p>{props.activity.like}</p>
			</div>
		</>
	);
};

export default ActivityLikes;
