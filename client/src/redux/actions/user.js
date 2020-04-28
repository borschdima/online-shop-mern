import { CHANGE_DARKMODE, UPDATE_NAME, UPDATE_EMAIL, UPDATE_MAILING, UPDATE_INFO, USER_ERROR, USER_LOADING } from "./actionTypes";
import { request } from "../requestConfig";
import { prettifyName } from "../../utils/prettifyName";
import { toastMessage } from "./messager";

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
			dispatch(userError());
			dispatch(toastMessage(error.message));
		}
	};
}

export function updateUser(userInfo) {
	return {
		type: UPDATE_INFO,
		userInfo,
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

			dispatch(updateUser(user));
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(userError());
			dispatch(toastMessage(error.message));
		}
	};
}

// Sending request to server to change mailing option
export function changeMailing(value) {
	return async (dispatch) => {
		try {
			const { message } = await request("/api/user/me/mailing", { recieveEmails: value }, "PATCH");

			dispatch({ type: UPDATE_MAILING, recieveEmails: value });
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(userError());
			dispatch(toastMessage(error.message));
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

export function userError() {
	return {
		type: USER_ERROR,
	};
}

export function userLoading() {
	return {
		type: USER_LOADING,
	};
}
