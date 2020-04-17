import { CHANGE_DARKMODE } from "./actionTypes";

export function changeDarkMode(value) {
	return (dispatch) => {
		localStorage.setItem("darkmode", value);

		dispatch({ type: CHANGE_DARKMODE, darkmode: value });
	};
}
