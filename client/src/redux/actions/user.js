import { CHANGE_DARKMODE, UPDATE_NAME, UPDATE_EMAIL, UPDATE_MAILING, UPDATE_INFO, USER_ERROR, USER_LOADING, USER_CLEAR_MESSAGE } from "./actionTypes";
import { request } from "../requestConfig";
import { prettifyName } from "../../utils/prettifyName";

// Receiving Data from server when app initialized
export function getUserData() {
	return async (dispatch) => {
		dispatch(userLoading());
		try {
			const data = await request("/api/user/me");
			const userInfo = { ...data };

			if (userInfo.name) {
				userInfo.name = prettifyName(userInfo.name);
			}
			if (!userInfo.recieveEmails) {
				userInfo.recieveEmails = false;
			}

			dispatch(updateUser(userInfo));
		} catch (error) {
			dispatch(userError(error.message));
		}
	};
}

export function updateUser(userInfo, message = "") {
	return {
		type: UPDATE_INFO,
		userInfo,
		message,
	};
}

// Send request to update name and email
export function updateInfo(name, email) {
	return async (dispatch) => {
		dispatch(userLoading());
		try {
			const { user, message } = await request("/api/user/me/info", { name, email }, "PATCH");
			user.name = prettifyName(user.name);
			localStorage.setItem("userName", user.name);

			dispatch(updateUser(user, message));
		} catch (error) {
			dispatch(userError(error.message));
		}
	};
}

// Sending request to server to change mailing option
export function changeMailing(value) {
	return async (dispatch) => {
		try {
			const data = await request("/api/user/me/mailing", { recieveEmails: value }, "PATCH");

			dispatch({ type: UPDATE_MAILING, recieveEmails: value, message: data.message });
		} catch (error) {
			dispatch(userError(error.message));
		}
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

export function clearMessage() {
	return {
		type: USER_CLEAR_MESSAGE,
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
