import React from "react";
import classes from "./UserBadge.module.css";

const UserBadge = (props) => {
	console.log(props);
	const LikesCase = (props) => {
		switch (true) {
			case props.likes === 0:
				return <div>Corenting</div>;
			case props.likes === 1:
				return <div>Fabieng</div>;
			case props.likes >= 2:
				return <div>Elon Musk</div>;
			default:
				return <div>You are a User</div>;
		}
	};

	const MessageCase = (props) => {
		switch (true) {
			case props.message <= 3:
				return <div className={classes.userBadge__card}>Stalkeur</div>;
			case props.message > 3:
				return <div className={classes.userBadge__card}>Coffee Machine</div>;
			case props.message > 5:
				return <div className={classes.userBadge__card}>Dev Fumeur</div>;
			default:
				return <div className={classes.userBadge__card}>Muet</div>;
		}
	};

	const CommentCase = (props) => {
		switch (true) {
			case props.comment === 0 && props.message >= 3:
				return <div className={classes.userBadge__card}>Egocentrique</div>;
			case props.comment >= 3 && props.message === 0:
				return <div className={classes.userBadge__card}>Altruiste</div>;
			case props.comment === 0 && props.message === 0:
				return <div className={classes.userBadge__card}>Casper</div>;
			case props.comment >= 3 && props.message >= 3:
				return <div>Toxicomania</div>;
			default:
				return <div className={classes.userBadge__card}>Associable</div>;
		}
	};

	return (
		<div className={classes.userBadge__container}>
			<LikesCase likes={props.likes} />
			<MessageCase message={props.message} />
			<CommentCase message={props.message} comment={props.comments} />
		</div>
	);
};

export default UserBadge;
