import { CHANGE_DARKMODE, UPDATE_PURCHASES } from "../actions/actionTypes";

const initialState = {
	name: "",
	lastname: "",
	purchasesNumber: 0,
	darkmode: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_DARKMODE:
			return { ...state, darkmode: action.darkmode };

		case UPDATE_PURCHASES:
			return { ...state, purchasesNumber: action.purchasesNumber };

		default:
			return state;
	}
}
