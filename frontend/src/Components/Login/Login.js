import React, { useState, useEffect, useReducer } from "react";
import classes from "./Login.module.css";
import emailReducer from "./reducers/emailReducer";
import firstNameReducer from "./reducers/firstNameReducer";
import lastNameReducer from "./reducers/lastNameReducer";
import passwordReducer from "./reducers/passwordReducer";
import Axios from "axios";

const Login = (props) => {
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

	const [errorMsg, seterrorMsg] = useState("");
	// EMAIL
	const emailChangeHandler = (event) => {
		console.log(emailIsValid);
		dispatchEmail({ type: "USER_EMAIL_INPUT", val: event.target.value });
	};
	const validateEmailHandler = () => {
		dispatchEmail({ type: "USE_EMAIL_INPUT_BLUR" });
	};

	// FIRST NAME
	const firstNameChangeHandler = (event) => {
		dispatchFirstName({ type: "USER_FIRST_NAME_INPUT", val: event.target.value });
	};
	const validateFirstNameHandler = () => {
		dispatchFirstName({ type: "USER_FIRST_NAME_INPUT_BLUR" });
	};

	// LAST NAME
	const lastNameChangeHandler = (event) => {
		dispatchLastName({ type: "USER_LAST_NAME_INPUT", val: event.target.value });
	};
	const validateLastNameHandler = () => {
		dispatchLastName({ type: "USER_LAST_NAME_INPUT_BLUR" });
	};

	// PASSWORD
	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: "USER_PASSWORD_INPUT", val: event.target.value });
	};
	const validatePasswordHandler = () => {
		dispatchPassword({ type: "USER_PASSWORD_INPUT_BLUR" });
	};

	// USEEFFECT
	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("Checking form validity!");
			setFormIsValid(
				emailState.isValid &&
					passwordState.isValid &&
					firstNameState.isValid &&
					lastNameState.isValid
			);
		}, 500);

		return () => {
			console.log("clear console");
			clearTimeout(identifier);
		};
	}, [
		emailIsValid,
		passwordIsValid,
		firstNameIsValid,
		emailState.isValid,
		passwordState.isValid,
		firstNameState.isValid,
		lastNameState.isValid
	]);

	// Props

	const onSubmit = (event) => {
		event.preventDefault();
		if (formIsValid) {
			Axios.post("http://localhost:5000/user/login", {
				mail: emailState.value,
				firstName: firstNameState.value,
				lastName: lastNameState.value,
				password: passwordState.value
			})
				.then((res) => {
					console.log(res);
					localStorage.setItem("user", res.data.token);
					props.onLogged(true);
				})
				.catch((error) => {
					console.log(error.response);
					seterrorMsg(error.response.data.error || "une erreure est survenue");
				});
		} else {
			console.log("invalide login");
		}
	};

	return (
		<>
			<form className={classes.login__form} onSubmit={onSubmit}>
				<h2>Register</h2>
				<div
					className={`${classes["form__module"]} ${
						emailIsValid === false && classes["invalid"]
					}`}
				>
					<label htmlFor="E-mail">Mail </label>
					<input
						type="email"
						id="email"
						isValid={emailIsValid}
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
						id="First name"
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
						id="Last name"
						value={lastNameState.value}
						onChange={lastNameChangeHandler}
						onBlur={validateLastNameHandler}
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
				<button
					type="submit"
					value="Welcome in the Matrix"
					className={classes.login__button}
				>
					Login
				</button>
				<p className={classes.errorMsg}>{errorMsg}</p>
			</form>
		</>
	);
};

export default Login;
