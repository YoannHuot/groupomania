import React, { useState } from "react";
import classes from "./ModifyBio.module.css";
import Axios from "axios";
import useUser from "../../Store/user/hook";

const ModifyBio = (props) => {
	const user = useUser();
	const userData = user.userStore.data;

	const age = userData.age;
	const email = userData.email;

	const [bio, setBio] = useState("");

	const onChange = (e) => {
		setBio(e.target.value);
	};
	const updateBio = (e) => {
		e.preventDefault();
		Axios.put("http://localhost:5000/user/profil/modify", {
			...userData,
			bio,
			age,
			email
		})
			.then((response) => {
				console.log("ça marche youpi");
				props.onModify(false);
				user.auth();
			})
			.catch((error) => {
				return console.log(error.response.data.error);
			});
	};

	return (
		<>
			<div className={classes.backdrop} />
			<div className={classes.modal}>
				<div className={classes.card__change}>
					<textarea
						className={classes.card__change__inside}
						onChange={onChange}
					></textarea>
				</div>
				<footer className={classes.actions}>
					<button onClick={updateBio}>Valider</button>
				</footer>
			</div>
		</>
	);
};

export default ModifyBio;
