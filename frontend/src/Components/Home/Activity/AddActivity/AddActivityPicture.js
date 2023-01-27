import React from "react";
import { useState } from "react";
import classes from "./AddActivityPicture.module.css";
import pictoPhoto from "../../../Assets/appareil-photo.png";

const AddActivityPicture = (props) => {
	const [file, setFile] = useState(null);
	const [pictureSelected, setPictureSelected] = useState(null);

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setPictureSelected(e.target.files[0]);
	};

	const pictureHandler = () => {
		props.pictureHandler(false);
	};

	const updatePicture = async (e) => {
		e.preventDefault();
		props.pictureActivity(file);
		props.pictureHandler(false);
	};

	return (
		<>
			<div className={classes.backdrop} />
			<div className={classes.modal}>
				<div className={classes.card__change}>
					<label className={classes.card__change__label}>
						<input
							className={classes.card__change__inside}
							type="file"
							onChange={onChange}
						></input>
						<p>Ajouter une photo</p>
						<img
							className={classes.card__image}
							alt="sélection"
							src={
								pictureSelected ? URL.createObjectURL(pictureSelected) : pictoPhoto
							}
						></img>
					</label>
				</div>
				<footer className={classes.actions}>
					<button onClick={pictureHandler}>Retour</button>
					<button onClick={updatePicture}>Valider</button>
				</footer>
			</div>
		</>
	);
};

export default AddActivityPicture;
