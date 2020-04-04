import { LAPTOP_ERROR, LAPTOP_LOADING, LAPTOP_FETCH } from "../actions/actionTypes";

export function fetchLaptops() {
	return async dispatch => {
		dispatch(laptopLoading());
		const token = localStorage.getItem("token");
		const config = {
			headers: { Authorization: `Bearer ${token}` },
			method: "GET"
		};

		try {
			const response = await fetch("/api/laptops/", config);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			dispatch(laptopFetch(data));
		} catch (error) {
			dispatch(laptopError(error.message));
		}
	};
}

export function laptopLoading() {
	return {
		type: LAPTOP_LOADING
	};
}

export function laptopError(errorMessage) {
	return {
		type: LAPTOP_ERROR,
		errorMessage
	};
}

export function laptopFetch(laptops) {
	return {
		type: LAPTOP_FETCH,
		laptops
	};
}
