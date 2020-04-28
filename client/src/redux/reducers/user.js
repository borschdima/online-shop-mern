import {
	CHANGE_DARKMODE,
	UPDATE_PURCHASES,
	UPDATE_NAME,
	UPDATE_EMAIL,
	UPDATE_MAILING,
	UPDATE_INFO,
	USER_ERROR,
	USER_LOADING,
} from "../actions/actionTypes";

const initialState = {
	name: "",
	email: "",
	purchasesNumber: 0,
	recieveEmails: false,
	darkmode: false,
	role: "user",
	error: false,
	loading: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_DARKMODE:
			return { ...state, darkmode: action.darkmode };

		case UPDATE_INFO:
			return {
				...state,
				purchasesNumber: action.userInfo.purchasesNumber,
				name: action.userInfo.name,
				email: action.userInfo.email,
				recieveEmails: action.userInfo.recieveEmails,
				role: action.userInfo.role,
				loading: false,
			};

		case UPDATE_MAILING:
			return { ...state, recieveEmails: action.recieveEmails };

		case UPDATE_PURCHASES:
			return { ...state, purchasesNumber: action.purchasesNumber };

		case UPDATE_NAME:
			return { ...state, name: action.name };

		case UPDATE_EMAIL:
			return { ...state, email: action.email };

		case USER_LOADING:
			return { ...state, loading: true, error: false };

		case USER_ERROR:
			return { ...state, error: true, loading: false };

		default:
			return state;
	}
}
