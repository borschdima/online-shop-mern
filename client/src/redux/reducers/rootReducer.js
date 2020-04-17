import { combineReducers } from "redux";
import authReducer from "./auth";
import laptopReducer from "./laptop";
import cartReducer from "./cart";
import filterReducer from "./filter";
import userReducer from "./user";

export default combineReducers({
	auth: authReducer,
	laptop: laptopReducer,
	cart: cartReducer,
	filter: filterReducer,
	user: userReducer,
});
