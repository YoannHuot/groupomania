import React, { useState, useReducer, useEffect } from "react";
import classes from "./Signup.module.css";
import passwordReducer from "./reducers/passwordReducer";
import emailReducer from "./reducers/emailReducer";
import firstNameReducer from "./reducers/firstNameReducer";
import lastNameReducer from "./reducers/lastNameReducer";
import birthdayReducer from "./reducers/birthdayReducer";
import passwordMatchReducer from "./reducers/passwordMatchReducer";
import utilisateur from "../Assets/utilisateur.png";
import useUser from "../../Store/user/hook";

const Signup = (props) => {
	const onLogged = props.onLogged;
	const user = useUser();
	const userData = user.userStore.data;

	const [formIsValid, setFormIsValid] = useState(null);

	const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, {
		value: "",
		isValid: null
	});
	const { isValid: firstNameIsValid } = firstNameState;

	const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, {
		value: "",
		isValid: null
	});
	const { isValid: lastNameIsValid } = lastNameState;

	const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null });
	const { isValid: emailIsValid } = emailState;

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

	const [birthdayState, dispatchBirthday] = useReducer(birthdayReducer, {
		age: "",
		value: "",
		isValid: null
	});

	const [errorMsg, seterrorMsg] = useState("");

	// Gestionnaire d'évenement pour les changements de value

	// EMAIL
	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_EMAIL_INPUT", val: event.target.value });
	};
	const validateEmailHandler = () => {
		dispatchEmail({ type: "USE_EMAIL_INPUT_BLUR" });
	};

	// FIRST NAME
	const firstNameChangeHandler = (event) => {
		dispatchFirstName({ type: "USER_FIRST_NAME_INPUT", val: event.target.value });
	};
	const validateFirstNameHandler = (event) => {
		dispatchFirstName({ type: "USER_FIRST_NAME_INPUT_BLUR" });
	};

	// LAST NAME
	const lastNameChangeHandler = (event) => {
		dispatchLastName({ type: "USER_LAST_NAME_INPUT", val: event.target.value });
	};
	const validateLastNameHandler = (event) => {
		dispatchLastName({ type: "USER_LAST_NAME_INPUT_BLUR" });
	};

	// PASSWORD
	const passwordChangeHandler = (event) => {
		dispatchPassword({
			type: "USER_PASSWORD_INPUT",
			val: event.target.value
		});
	};
	const validatePasswordHandler = (event) => {
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

	// BIRTHDAY
	const birthdayHandler = (event) => {
		dispatchBirthday({ type: "USER_BIRTHDAY_INPUT", val: event.target.value });
	};
	const validateBirthdayHandler = (event) => {
		dispatchBirthday({ type: "USER_BIRTHDAY_INPUT_BLUR", val: event.target.value });
	};

	// USEEFFECT
	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(
				emailState.isValid &&
					passwordState.isValid &&
					firstNameState.isValid &&
					lastNameState.isValid &&
					passwordMatchState.isValid &&
					birthdayState.isValid
			);
		}, 500);

		return () => {
			clearTimeout(identifier);
		};
	}, [
		emailIsValid,
		emailState.isValid,
		passwordIsValid,
		firstNameIsValid,
		lastNameIsValid,
		passwordMatchState,
		passwordState.isValid,
		firstNameState.isValid,
		passwordMatchState.isValid,
		birthdayState.isValid,
		lastNameState.isValid
	]);

	// PROPS

	const onSubmit = (event) => {
		event.preventDefault();
		let inscription = new Date();
		if (formIsValid) {
			user.signup({
				mail: emailState.value,
				firstname: firstNameState.value,
				lastname: lastNameState.value,
				password: passwordState.value,
				confirmPassword: passwordMatchState.valueConfirmPassword,
				birthday: birthdayState.value,
				inscription: inscription,
				age: birthdayState.age,
				imageUrl: utilisateur
			})
				.then(() => {
					localStorage.setItem("user", userData.token);
					onLogged(true);
				})
				.catch((err) => {
					seterrorMsg(err.response.data.error || "une erreure est survenue");
				});
		} else {
			console.log("invalide signup");
		}
	};

	useEffect(() => {
		if (!userData.token) return;
		localStorage.setItem("user", userData.token);
		onLogged(true);
	}, [userData, onLogged]);

	return (
		<>
			<form className={classes.signup__form} onSubmit={onSubmit}>
				<h2>Create your account</h2>
				<div
					className={`${classes["form__module"]} ${
						emailIsValid === false && classes["invalid"]
					}`}
				>
					<label htmlFor="E-mail">Mail </label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes["form__module"]} ${
						firstNameIsValid === false && classes["invalid"]
					}`}
				>
					<label htmlFor="first name">First Name </label>
					<input
						type="text"
						id="first name"
						value={firstNameState.value}
						onChange={firstNameChangeHandler}
						onBlur={validateFirstNameHandler}
					/>
				</div>

				<div
					className={`${classes["form__module"]} ${
						lastNameIsValid === false && classes["invalid"]
					}`}
				>
					<label htmlFor="last name">Last Name </label>
					<input
						type="text"
						id="last name"
						value={lastNameState.value}
						onChange={lastNameChangeHandler}
						onBlur={validateLastNameHandler}
					/>
				</div>

				<div
					className={`${classes["form__module"]} ${
						birthdayState.isValid === false && classes["invalid"]
					}`}
				>
					<label htmlFor="birthday">Birthday </label>
					<input
						type="date"
						value={birthdayState.value}
						onChange={birthdayHandler}
						onBlur={validateBirthdayHandler}
					/>
				</div>

				<div
					className={`${classes["form__module"]} ${
						passwordIsValid === false && classes["invalid"]
					}`}
				>
					<label htmlFor="password">Password </label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
						autoComplete="on"
					/>
				</div>
				<div
					className={`${classes["form__module"]} ${
						passwordMatchState.isValid === false && classes["invalid"]
					}`}
				>
					<label htmlFor="confirm-password">Confirm Password </label>
					<input
						type="password"
						id="confirm-password"
						value={passwordMatchState.value}
						onChange={passwordMatchChangeHandler}
					/>
				</div>
				{!formIsValid && (
					<button className={classes.signup__button__invalid}>Signup</button>
				)}
				{formIsValid && (
					<button
						type="submit"
						value="Welcome in the Matrix"
						className={classes.signup__button}
					>
						Signup
					</button>
				)}
				<p className={classes.errorMsg}>{errorMsg}</p>
			</form>
		</>
	);
};

export default Signup;
