import { AUTH_LOADING, AUTH_SIGNUP, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CLEAR_MESSAGE, CHANGE_DARKMODE } from "./actionTypes";
import { request } from "../requestConfig";
import { prettifyName } from "../../utils/prettifyName";

export function auth(email, password, isLogin) {
	return async (dispatch) => {
		dispatch(authLoading());

		try {
			if (isLogin) {
				const { user, token, message, expiresIn } = await request("/api/auth/login", { email, password }, "POST", false);

				localStorage.setItem("token", token);
				localStorage.setItem("expirationDate", expiresIn);

				if (user.name) {
					const userName = prettifyName(user.name);
					localStorage.setItem("userName", userName);
				}

				dispatch(authLogin(token, message));
			} else {
				const data = await request("/api/auth/signup", { email, password }, "POST", false);

				dispatch(authSignup(data.message));
			}
		} catch (error) {
			dispatch(authError(error.message));
		}
	};
}

export function logout() {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem("token");
			let logoutMessage = "";

			if (token) {
				const data = await request("/api/auth/logout", null, "POST");
				logoutMessage = data.message;
			}

			localStorage.removeItem("token");
			localStorage.removeItem("userName");
			localStorage.removeItem("expirationDate");

			dispatch({ type: AUTH_LOGOUT, message: logoutMessage });
			dispatch(autoClearMessage(4000));
		} catch (e) {
			dispatch(authError(e.message));
		}
	};
}

export function autoLogin() {
	return (dispatch) => {
		const token = localStorage.getItem("token");

		if (localStorage.getItem("darkmode")) {
			const darkmode = JSON.parse(localStorage.getItem("darkmode"));
			dispatch({ type: CHANGE_DARKMODE, darkmode });
		}

		if (token) {
			const expirationDate = new Date(localStorage.getItem("expirationDate") * 1000);

			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userName = localStorage.getItem("userName") || "";
				dispatch(authLogin(token, `Здравствуйте ${userName}, Вы вошли в систему! ✌🏻😎`));
				dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
}

export function clearMessage() {
	return {
		type: AUTH_CLEAR_MESSAGE,
	};
}

export function authLoading() {
	return {
		type: AUTH_LOADING,
	};
}

export function authLogin(token, message) {
	return {
		type: AUTH_LOGIN,
		token,
		message,
	};
}

export function authSignup(message) {
	return {
		type: AUTH_SIGNUP,
		message,
	};
}

export function authError(errorMessage) {
	return {
		type: AUTH_ERROR,
		errorMessage,
	};
}

export function autoLogout(time) {
	return async (dispatch) => {
		// Выходим из системы если токен не актуальный
		// за одну минуту  до истечения токена, чтобы можно было выполнить запрос на сервер для logout, когда мы еще авторизованы
		setTimeout(() => dispatch(logout()), time * 1000 - 60000);
	};
}

export function autoClearMessage(time) {
	return async (dispatch) => {
		setTimeout(() => dispatch(clearMessage()), time);
	};
}
