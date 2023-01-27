import React from "react";
import classes from "./DeleteCommentModal.module.css";

const DeleteCommentModal = (data) => {
	const getOutHandler = async () => {
		data.comments
			.deleteComment(data.id, data.commentId)
			.then(() => data.comments.getComment(data.id));
		data.deleteCommentHandler();
	};

	const confirmHandler = () => {
		data.deleteCommentHandler();
	};

	return (
		<div>
			<div className={classes.backdrop} />
			<div className={classes.modal}>
				<header className={classes.header}>
					<h2>Sohaitez-vous supprimer ce commentaire ?</h2>
				</header>

				<footer classname={classes.actions}>
					<button onClick={getOutHandler}>Supprimer</button>
					<button onClick={confirmHandler}>Annuler</button>
				</footer>
			</div>
		</div>
	);
};

export default DeleteCommentModal;
