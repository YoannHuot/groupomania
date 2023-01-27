import { createStore, combineReducers } from "redux";
import user from "./user/reducer";
import activity from "./activity/reducer";

export const store = createStore(
	combineReducers({
		user,
		activity
	})
);
