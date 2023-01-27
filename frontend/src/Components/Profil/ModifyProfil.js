import React, { useState, useReducer } from "react";
import Axios from "axios";
import classes from "./ModifyProfil.module.css";
import passwordReducer from "./ModifyProfilReducer/passwordReducer";
import emailReducer from "./ModifyProfilReducer/emailReducer";
import passwordMatchReducer from "./ModifyProfilReducer/passwordMatchReducer";
import jobReducer from "./ModifyProfilReducer/jobReducer";
import birthdayReducer from "./ModifyProfilReducer/birthdayReducer";
import useUser from "../../Store/user/hook";

const ModifyProfil = (props) => {
	const user = useUser();
	const userData = user.userStore.data;

	console.log(userData.birthday);
	const birthdayInitalValue = userData.birthday.split("T")[0];
	console.log(new Date(userData.birthday).toLocaleString("eng"));

	const [submitIsDone, setSubmitIsDone] = useState(false);
	const [errorMsg, seterrorMsg] = useState("");
	const getOutHandler = () => {
		props.onModify(false);
	};

	// VALUES

	const [formIsValid, setFormIsValid] = useState(null);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: props.mail,
		isValid: null
	});
	const { isValid: emailIsValid } = emailState;

	const [birthdayState, dispatchBirthday] = useReducer(birthdayReducer, {
		age: "",
		value: birthdayInitalValue,
		isValid: null
	});

	const [jobState, dispatchJob] = useReducer(jobReducer, { value: props.job, isValid: null });
	const { isValid: jobIsValid } = jobState;

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null
	});
	const { isValid: passwordIsValid } = passwordState;

	const [passwordMatchState, dispatchPasswordMatch] = useReducer(passwordMatchReducer, {
		valuePassword: "",
		valueConfirmPassword: "",
		isValid: null
	});

	// HANDLER

	// EMAIL
	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_EMAIL_INPUT", val: event.target.value });
	};
	const validateEmailHandler = () => {
		dispatchEmail({ type: "USE_EMAIL_INPUT_BLUR" });
	};
	// BIRTHDAY
	const birthdayHandler = (event) => {
		dispatchBirthday({ type: "USER_BIRTHDAY_INPUT", val: event.target.value });
	};

	const validateBirthdayHandler = () => {
		dispatchBirthday({ type: "USER_BIRTHDAY_INPUT_BLUR" });
	};
	// JOB
	const jobHandler = (event) => {
		dispatchJob({ type: "USER_JOB_INPUT", val: event.target.value });
	};
	const validateJobHandler = () => {
		dispatchJob({ type: "USER_JOB_INPUT_BLUR" });
	};
	// PASSWORD
	const passwordChangeHandler = (event) => {
		dispatchPassword({
			type: "USER_PASSWORD_INPUT",
			val: event.target.value
		});
	};
	const validatePasswordHandler = () => {
		dispatchPassword({ type: "USER_PASSWORD_INPUT_BLUR" });
	};
	// CONFIRMED PASSWORD

	const passwordMatchChangeHandler = (event) => {
		dispatchPasswordMatch({
			type: "USER_PASSWORD_MATCH_INPUT",
			val: event.target.value,
			val2: passwordState.value
		});
	};
	const validatepasswordMatchChange = () => {};

	const submitHandler = (e) => {
		e.preventDefault();
		Axios.put("http://localhost:5000/user/profil/modify", {
			email: emailState.value,
			birthday: birthdayState.value,
			age: birthdayState.age,
			job: jobState.value,
			password: passwordState.value,
			confirmPassword: passwordMatchState.valueConfirmPassword
		})
			.then(() => {
				user.auth();
				setSubmitIsDone(true);
			})
			.catch((error) => {
				return seterrorMsg(error.response.data.error);
			});
	};

	return (
		<div>
			<div className={classes.backdrop} />
			<div className={classes.modal}>
				<header className={classes.header}>
					<h2>{props.title}</h2>
				</header>
				{submitIsDone && <p>Vos données ont bien été prises en compte</p>}
				{!submitIsDone && (
					<form className={classes.content} onSubmit={submitHandler}>
						<div
							className={`${classes["form__module"]} ${
								emailIsValid === false && classes["invalid"]
							}`}
						>
							<label>Mail </label>
							<input
								value={emailState.value}
								onChange={emailChangeHandler}
								onBlur={validateEmailHandler}
							></input>
						</div>
						<div
							className={`${classes["form__module"]} ${
								birthdayState.isValid === false && classes["invalid"]
							}`}
						>
							<label>Anniversaire </label>
							<input
								type="date"
								value={birthdayState.value}
								onChange={birthdayHandler}
								onBlur={validateBirthdayHandler}
							></input>
						</div>
						<div
							className={`${classes["form__module"]} ${
								jobIsValid === false && classes["invalid"]
							}`}
						>
							<label>Job </label>
							<input
								value={jobState.value}
								onChange={jobHandler}
								onBlur={validateJobHandler}
							></input>
						</div>
						<div
							className={`${classes["form__module"]} ${
								passwordIsValid === false && classes["invalid"]
							}`}
						>
							<label>New Password </label>
							<input
								type="password"
								id="password"
								value={passwordState.value}
								onChange={passwordChangeHandler}
								onBlur={validatePasswordHandler}
								autoComplete="on"
							></input>
						</div>
						<div
							className={`${classes["form__module"]} ${
								passwordMatchState.isValid === false && classes["invalid"]
							}`}
						>
							<label>Confirm New Password</label>
							<input
								type="password"
								id="confirm-password"
								value={passwordMatchState.value}
								onChange={passwordMatchChangeHandler}
								onBlur={validatepasswordMatchChange}
							></input>
						</div>
						<p>{errorMsg}</p>
						{!formIsValid && (
							<button
								type="submit"
								value="Welcome in the Matrix"
								className={classes.modify__button}
							>
								Valider
							</button>
						)}
					</form>
				)}

				<footer className={classes.actions}>
					{submitIsDone && <button onClick={getOutHandler}>Ok</button>}
					{!submitIsDone && <button onClick={getOutHandler}>Quitter</button>}
				</footer>
			</div>
		</div>
	);
};

export default ModifyProfil;
