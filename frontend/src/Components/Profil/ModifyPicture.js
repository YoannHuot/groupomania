import React, { useEffect, useState } from "react";
import classes from "./ModifyPicture.module.css";
import Axios from "axios";
import useUser from "../../Store/user/hook";

const ModifyPicture = (props) => {
	const [file, setFile] = useState("");
	const [pictureSelected, setPictureSelected] = useState(null);

	const user = useUser();
	const userData = user.userStore.data;

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setPictureSelected(e.target.files[0]);
	};

	useEffect(() => {
		user.auth();
	}, [pictureSelected]);

	const addPicture = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);

		await Axios.put("http://localhost:5000/user/profil/modify/picture", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
			.then(() => {
				user.auth();
				props.onModify(false);
			})
			.catch((error) => {
				console.log(error.response.data.err || "une erreure est survenue");
			});
	};

	const closePictureHandler = () => {
		props.onModify(false);
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
						<p className={classes.card__text}>Modifier votre photo de profil</p>
						<img
							alt="frfr"
							src={
								pictureSelected
									? URL.createObjectURL(pictureSelected)
									: userData.imageUrl
							}
							className={classes.card__image}
						></img>
					</label>
				</div>

				<footer className={classes.actions}>
					<button onClick={closePictureHandler}>Retour </button>
					<button onClick={addPicture}>Ajouter </button>
				</footer>
			</div>
		</>
	);
};

export default ModifyPicture;
