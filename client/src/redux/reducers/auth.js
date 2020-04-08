import { AUTH_LOADING, AUTH_SIGNUP, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CLEAR_MESSAGE } from "../actions/actionTypes";

const initialState = {
	token: null,
	formMessage: "",
	loading: false,
	error: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_LOADING:
			return { ...state, loading: true, error: false, formMessage: "" };

		case AUTH_SIGNUP:
			return { ...state, loading: false, formMessage: action.message };

		case AUTH_LOGIN:
			return { ...state, loading: false, token: action.token, formMessage: action.message };

		case AUTH_ERROR:
			return { ...state, error: true, loading: false, formMessage: action.errorMessage };

		case AUTH_LOGOUT:
			return { ...state, token: null, formMessage: action.message };

		case AUTH_CLEAR_MESSAGE:
			return { ...state, formMessage: "" };
		default:
			return state;
	}
}
