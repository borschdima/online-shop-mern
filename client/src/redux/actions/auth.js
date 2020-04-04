import { AUTH_LOADING, AUTH_SIGNUP, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CLEAR_MESSAGE } from "./actionTypes";

export function auth(email, password, isLogin) {
	return async dispatch => {
		dispatch(authLoading());
		const config = {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({ email, password })
		};
		let url = "/api/auth/login";

		try {
			if (isLogin) {
				const response = await fetch(url, config);
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message);
				}
				localStorage.setItem("token", data.token);
				dispatch(authLogin(data.token));
			} else {
				url = "/api/auth/signup";
				const response = await fetch(url, config);
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message);
				}
				dispatch(authSignup(data.message));
			}
		} catch (error) {
			dispatch(authError(error.message));
		}
	};
}

export function clearMessage() {
	return {
		type: AUTH_CLEAR_MESSAGE
	};
}

export function authLoading() {
	return {
		type: AUTH_LOADING
	};
}

export function authLogin(token) {
	return {
		type: AUTH_LOGIN,
		token
	};
}

export function authSignup(message) {
	return {
		type: AUTH_SIGNUP,
		message
	};
}

export function authError(errorMessage) {
	return {
		type: AUTH_ERROR,
		errorMessage
	};
}

// export function autoLogout(time) {
// 	return async dispatch => {
// 		setTimeout(() => dispatch(logout()), time * 1000 * 24);
// 	};
// }

export function logout(token) {
	return async dispatch => {
		const userToken = token || localStorage.getItem("token");
		localStorage.removeItem("token");
		dispatch({ type: AUTH_LOGOUT });

		if (userToken) {
			const config = {
				headers: { Authorization: `Bearer ${userToken}` },
				method: "POST"
			};
			try {
				const response = await fetch("/api/auth/logout", config);
				if (!response.ok) {
					throw new Error("Что-то пошло не так");
				}
			} catch (e) {
				dispatch(authError(e.message));
			}
		}
	};
}

export function autoLogin() {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout(token));
		} else {
			dispatch(authLogin(token));
		}
	};
}
