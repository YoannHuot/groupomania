import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./Store/store";

axios.interceptors.request.use(
	(request) => {
		if (localStorage.getItem("user") !== null) {
			const token = localStorage.getItem("user");
			if (token) {
				request.headers.Authorization = "Bearer " + token;
			}
		}
		// console.log(request);
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use((response) => {
	// console.log(response);
	return response;
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
