import React from "react";
import classes from "./DeleteModal.module.css";
import useActivity from "../../../../Store/activity/hook";

const DeleteModal = (props) => {
	const activity = useActivity();

	const getOutHandler = async () => {
		activity.deleteActivity(props.activityId);
		props.deleteHandler();
	};

	const confirmHandler = () => {
		props.deleteHandler();
	};
	return (
		<div>
			<div className={classes.backdrop} />
			<div className={classes.modal}>
				<header className={classes.header}>
					<h2>Sohaitez-vous supprimer ce post ?</h2>
				</header>

				<footer classname={classes.actions}>
					<button onClick={getOutHandler}>Supprimer</button>
					<button onClick={confirmHandler}>Annuler</button>
				</footer>
			</div>
		</div>
	);
};

export default DeleteModal;
