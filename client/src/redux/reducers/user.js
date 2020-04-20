import {
	CHANGE_DARKMODE,
	UPDATE_PURCHASES,
	UPDATE_NAME,
	UPDATE_EMAIL,
	UPDATE_MAILING,
	UPDATE_INFO,
	USER_ERROR,
	USER_LOADING,
	USER_CLEAR_MESSAGE,
} from "../actions/actionTypes";

const initialState = {
	name: "",
	email: "",
	purchasesNumber: 0,
	recieveEmails: false,
	darkmode: false,
	error: false,
	loading: false,
	message: "",
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
				loading: false,
			};

		case UPDATE_MAILING:
			return { ...state, recieveEmails: action.recieveEmails, message: action.message };

		case UPDATE_PURCHASES:
			return { ...state, purchasesNumber: action.purchasesNumber };

		case UPDATE_NAME:
			return { ...state, name: action.name };

		case UPDATE_EMAIL:
			return { ...state, email: action.email };

		case USER_CLEAR_MESSAGE:
			return { ...state, message: "" };

		case USER_LOADING:
			return { ...state, loading: true, error: false };

		case USER_ERROR:
			return { ...state, error: true, loading: false, message: action.errorMessage };

		default:
			return state;
	}
}
