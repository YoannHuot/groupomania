import classes from "./Header.module.css";
import logo from "../Assets/logo.png";
import { useHistory } from "react-router-dom";
import useUser from "../../Store/user/hook";

const Header = (props) => {
	const user = useUser();

	const history = useHistory();
	const changeToLoginHandler = (e) => {
		e.preventDefault();
		props.onChange(true);
	};

	const changeToSignupHandler = (e) => {
		e.preventDefault();
		props.onChange(false);
	};

	const logoutHandler = () => {
		props.onLogout(false);
		localStorage.clear();
		history.push("/");
	};

	const profilHandler = () => {
		if (props.isLogged === true) {
			user.auth();
			history.push("/profil");
		} else history.push("/");
	};

	const homeHandler = () => {
		history.push("/");
	};

	const searchHandler = () => {
		console.log("coucou");
	};

	return (
		<div className={classes.header}>
			<img
				src={logo}
				alt="logo groupomania"
				onClick={homeHandler}
				className={classes.header__logo}
			></img>
			{!props.isLogged && (
				<div className={classes.header__buttons}>
					<button onClick={changeToLoginHandler} className={classes.header__button}>
						Login
					</button>
					<button onClick={changeToSignupHandler} className={classes.header__button}>
						Signup
					</button>
				</div>
			)}
			{props.isLogged && (
				<div className={classes.header__buttons}>
					<button onClick={profilHandler} className={classes.header__button}>
						Profil
					</button>
					<button onClick={logoutHandler} className={classes.header__button}>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
