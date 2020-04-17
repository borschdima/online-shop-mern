import { CHANGE_DARKMODE } from "./actionTypes";

export function changeDarkMode(value) {
	return (dispatch) => {
		localStorage.setItem("darmode", value);

		dispatch({ type: CHANGE_DARKMODE });
	};
}
