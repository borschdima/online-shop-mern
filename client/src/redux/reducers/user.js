import { CHANGE_DARKMODE } from "../actions/actionTypes";

const initialState = {
	name: "",
	lastname: "",

	darkmode: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_DARKMODE:
			return { ...state, darkmode: action.darkmode };

		default:
			return state;
	}
}
