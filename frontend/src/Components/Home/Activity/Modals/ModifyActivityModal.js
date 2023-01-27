import React, { useState } from "react";
import classes from "./ModifyActivityModal.module.css";
import useActivity from "../../../../Store/activity/hook";

const ModifyActivityModal = (props) => {
	const previousContent = props.activity.content;
	const previousTitle = props.activity.title;

	const activity = useActivity();

	const [content, setContent] = useState(previousContent);
	const [title, setTitle] = useState(previousTitle);

	const getOutHandler = () => {
		props.modifyActivity();
	};
	const confirmHandler = () => {
		const newContent = {
			id: props.activity.id,
			title: title,
			content: content
		};
		activity.modifyActivity(newContent);
		props.modifyActivity();
	};

	const contentHandler = (e) => {
		e.preventDefault();
		setContent(e.target.value);
	};
	const titleHandler = (e) => {
		e.preventDefault();
		setTitle(e.target.value);
	};

	return (
		<div>
			<div className={classes.backdrop} />
			<div className={classes.modal}>
				<header className={classes.header}>
					<h2>Modifier votre publication</h2>
				</header>
				<div className={classes.input__title}>
					<h3>Titre</h3>
					<input
						onChange={titleHandler}
						value={title}
						placeholder={"Un nouveau titre pour votre publication ?"}
					></input>
				</div>
				<div className={classes.input__content}>
					<h3>Contenu</h3>
					<input
						onChange={contentHandler}
						value={content}
						placeholder={"Ce n'était pas si clair ? Pas de problème"}
					></input>
				</div>

				<footer classname={classes.actions}>
					<button type={"submit"} onClick={confirmHandler}>
						Confirmer
					</button>
					<button onClick={getOutHandler}>Annuler</button>
				</footer>
			</div>
		</div>
	);
};

export default ModifyActivityModal;
