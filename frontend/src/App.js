import React, { useState, useEffect } from "react";
import "./App.css";
import Authentification from "./Components/Authentification/Authentification";
import Header from "./Components/UI/Header";
import Home from "./Components/Home/Home";
import Profil from "./Components/Profil/Profil";
import NotFound from "./Components/NotFound/NotFound";
import User from "./Components/Users/User";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyPosts from "./Components/Profil/MyPosts";

function App() {
	const [loginOrSignup, setLoginOrSignup] = useState(false);
	const [isLogged, setIsLogged] = useState(false);

	const changeModule = (e) => {
		setLoginOrSignup(e);
	};

	const changePage = (e) => {
		setIsLogged(e);
	};

	const logoutHandler = (e) => {
		setIsLogged(e);
	};

	useEffect(() => {
		const storedUserLocal = localStorage.getItem("user");
		if (storedUserLocal) {
			setIsLogged(true);
		}
	}, [isLogged]);

	return (
		<Router>
			<Header onChange={changeModule} isLogged={isLogged} onLogout={logoutHandler} />
			<main>
				<Route exact path="/">
					{!isLogged && <Authentification onLogged={changePage} data={loginOrSignup} />}
					{isLogged && <Home />}
				</Route>
				<Route exact path="/profil">
					<Profil />
				</Route>
				<Route exact path="/notfound">
					<NotFound />
				</Route>
				<Route exact path="/user/:id">
					<User />
				</Route>
				<Route exact path="/posts/:id">
					<MyPosts />
				</Route>
			</main>
		</Router>
	);
}

export default App;
