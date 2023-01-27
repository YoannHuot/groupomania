import React from "react";
import { MdComment } from "react-icons/md";
import classes from "./ActivityCommentsHandler.module.css";

const ActivityComments = (props) => {
	const comments = () => {
		props.showActivity();
	};

	return (
		<>
			<div className={classes.comments__card} onClick={comments}>
				<button className={classes.comments__count}>
					<MdComment />
				</button>
			</div>
		</>
	);
};

export default ActivityComments;
