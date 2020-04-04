import { combineReducers } from "redux";
import authReducer from "./auth";
import laptopReducer from "./laptop";
import cartReducer from "./cart";

export default combineReducers({
	auth: authReducer,
	laptop: laptopReducer,
	cart: cartReducer
});
