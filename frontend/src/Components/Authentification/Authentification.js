import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import classes from "./Authentification.module.css";
import building from "../Assets/building.jpg";

const Authentification = (props) => {
	return (
		<>
			<div className={classes.auth__card}>
				{props.data && <Login onLogged={props.onLogged} />}
				{!props.data && <Signup onLogged={props.onLogged} />}
				<img className={classes.circle} src={building} alt="building"></img>
			</div>
		</>
	);
};

export default Authentification;
