import React, { useReducer, useState, useEffect } from "react";
import classes from "./AddActivity.module.css";
import { FaCaretUp } from "react-icons/fa";
import titleReducer from "./reducers/titleReducer";
import textReducer from "./reducers/textReducer";
import Axios from "axios";
import useUser from "../../../../Store/user/hook";
import useActivity from "../../../../Store/activity/hook";
import AddActivityPicture from "./AddActivityPicture";
import pictoPhoto from "../../../Assets/appareil-photo.png";

const AddActivity = (props) => {
	const user = useUser();
	const userData = user.userStore.data;

	const activity = useActivity();

	const [formIsValid, setFormIsValid] = useState(false);
	const [closeAdd, setCloseAdd] = useState(false);
	const [activityFocus, setActivityFocus] = useState(false);

	const [titleState, dispatchTitle] = useReducer(titleReducer, { value: "", isValid: null });
	const { isValid: titleIsValid } = titleState;

	const [textState, dispatchText] = useReducer(textReducer, { value: "", isValid: null });
	const { isValid: textIsValid } = textState;

	const [addPicture, setAddPicture] = useState(false);
	const [file, setFile] = useState(null);

	const pictureActivityHandler = (e) => {
		setFile(e);
	};
	const showAddHandler = () => {
		setCloseAdd(false);
	};

	const unshowAddHandler = () => {
		setCloseAdd(true);
	};

	const addActivityTextHandler = (event) => {
		dispatchText({ type: "TEXT_ADD", val: event.target.value });
	};
	const endTextHandler = () => {
		dispatchText({ type: "END_TEXT", val: "" });
	};
	const addActivityNameHandler = (event) => {
		dispatchTitle({ type: "TITLE_ADD", val: event.target.value });
	};
	const endTitleHandler = () => {
		dispatchTitle({ type: "TITLE_END", val: "" });
	};

	const focusActivity = () => {
		setActivityFocus(true);
	};

	const unfocusActivity = () => {
		setActivityFocus(false);
	};

	const openPictureHandler = () => {
		setAddPicture(true);
	};
	const closePictureHandler = (e) => {
		setAddPicture(e);
	};

	useEffect(() => {
		const checkValidity = setTimeout(() => {
			console.log("Checking input add validity");
			setFormIsValid(titleIsValid && textIsValid);
		}, 500);
		return () => {
			console.log("Refresh consol");
			clearTimeout(checkValidity);
		};
	}, [textIsValid, titleIsValid]);

	useEffect(() => {
		user.auth();
	}, []);

	const submitActivity = async (event) => {
		event.preventDefault();
		if (formIsValid) {
			const activityData = {
				title: titleState.value,
				content: textState.value,
				user_id: userData.id,
				firstName: userData.firstName,
				lastName: userData.lastName,
				imageUrl: userData.imageUrl
			};
			if (file == null) {
				Axios.post("http://localhost:5000/activity/addActivity", activityData)

					.then(() => activity.activities())
					// .then(() => props.onAdd(activity.activityStore))
					.then(() => endTitleHandler(), endTextHandler())
					.catch((err) => console.log(err));
			} else if (file !== null) {
				const formData = new FormData();
				formData.append("image", file);
				Axios.post("http://localhost:5000/activity/addActivity", activityData)
					.then(() =>
						Axios.put("http://localhost:5000/activity/uploadPicture", formData, {
							headers: {
								activityid: activityData.id
							}
						})
					)
					.then(() => activity.activities())
					.then(() => endTitleHandler(), endTextHandler())
					.catch((err) => console.log(err));

				setFile(null);
				endTitleHandler();
				endTextHandler();
			} else {
				console.log("pas de fichier téléchargé");
			}
		} else {
			console.log("form invalide");
		}
	};

	return (
		<div className={classes.add}>
			{closeAdd && (
				<div className={classes.unShowActivity}>
					<div className={classes.unShowActivity__content}>
						<img alt="profil" src={userData.imageUrl}></img>
						<button className={classes.show} onClick={showAddHandler}>
							<p>Quoi de neuf {userData.firstName} ?</p>
						</button>
					</div>
				</div>
			)}
			{!closeAdd && (
				<div className={classes.showActivity}>
					<button className={classes.unshow} onClick={unshowAddHandler}>
						<FaCaretUp />
					</button>
				</div>
			)}
			{!closeAdd && (
				<form className={classes.add__activity} onSubmit={submitActivity}>
					<h2>Créer une publication</h2>
					<div className={classes.add__activity__form}>
						<input
							value={titleState.value}
							onChange={addActivityNameHandler}
							placeholder="Titre"
							className={classes.add__activity__name}
						></input>
						<input
							value={textState.value}
							onChange={addActivityTextHandler}
							placeholder={`${"Bonjour,"} ${
								userData.firstName
							}${". Une nouvelle à nous annoncer ?"}`}
							onFocus={focusActivity}
							className={`${classes["add__activity__input"]} ${
								activityFocus === true && classes["focus"]
							}`}
							onBlur={unfocusActivity}
						></input>
						<div className={classes.add__activity__picture}>
							<img
								alt="update"
								src={file ? URL.createObjectURL(file) : pictoPhoto}
							></img>
						</div>
						<div className={classes.add__activity__container}>
							<button
								type="button"
								className={classes.add__activity__button}
								onClick={openPictureHandler}
							>
								Ajouter une photo
							</button>
							{addPicture && (
								<AddActivityPicture
									pictureHandler={closePictureHandler}
									pictureActivity={pictureActivityHandler}
								/>
							)}
							{formIsValid && (
								<button type="submit" className={classes.add__activity__button}>
									Publier
								</button>
							)}
							{!formIsValid && (
								<button className={classes.add__activity__button__invalid}>
									Publier
								</button>
							)}
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default AddActivity;
