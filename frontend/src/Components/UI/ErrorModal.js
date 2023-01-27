import React from "react";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
	const getOutHandler = () => {
		props.onModify(false);
	};
	return (
		<div>
			<div className={classes.backdrop} />
			<div className={classes.modal}>
				<header className={classes.header}>
					<h2>{props.title}</h2>
				</header>
				<div className={classes.content}>
					<p>{props.message}</p>
				</div>
				<footer classname={classes.actions}>
					<button onClick={getOutHandler}>Okay</button>
				</footer>
			</div>
		</div>
	);
};

export default ErrorModal;
