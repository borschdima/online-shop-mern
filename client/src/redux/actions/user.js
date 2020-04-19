import { CHANGE_DARKMODE, UPDATE_NAME, UPDATE_EMAIL, UPDATE_INFO, USER_ERROR, USER_LOADING } from "./actionTypes";
import { request } from "../requestConfig";

export function getUserData() {
	return async (dispatch) => {
		dispatch(userLoading());
		try {
			const data = await request("/api/user/me");
			const userInfo = { ...data };

			if (userInfo.name) {
				userInfo.name = userInfo.name[0].toUpperCase() + userInfo.name.slice(1);
			}

			dispatch(updateUser(userInfo));
		} catch (error) {
			dispatch(userError(error.message));
		}
	};
}

export function updateUser(userInfo) {
	return {
		type: UPDATE_INFO,
		userInfo,
	};
}

export function changeDarkMode(value) {
	return (dispatch) => {
		localStorage.setItem("darkmode", value);

		dispatch({ type: CHANGE_DARKMODE, darkmode: value });
	};
}

export function changeName(name) {
	return (dispatch) => {
		dispatch({ type: UPDATE_NAME, name });
	};
}

export function changeEmail(email) {
	return (dispatch) => {
		dispatch({ type: UPDATE_EMAIL, email });
	};
}

export function userError(errorMessage) {
	return {
		type: USER_ERROR,
		errorMessage,
	};
}

export function userLoading() {
	return {
		type: USER_LOADING,
	};
}
