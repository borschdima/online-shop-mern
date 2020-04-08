import { LAPTOP_ERROR, LAPTOP_LOADING, LAPTOP_FETCH, LAPTOP_FETCH_ONE } from "../actions/actionTypes";
import { request } from "../requestConfig";

export function fetchLaptops() {
	return async (dispatch) => {
		dispatch(laptopLoading());

		try {
			const data = await request("/api/laptops/");

			dispatch(laptopFetch(data));
		} catch (error) {
			dispatch(laptopError(error.message));
		}
	};
}

export function fetchOneLaptop(id) {
	return async (dispatch) => {
		dispatch(laptopLoading());

		try {
			const data = await request(`/api/laptops/${id}`);

			dispatch(laptopFetchOne(data));
		} catch (error) {
			dispatch(laptopError(error.message));
		}
	};
}

export function laptopLoading() {
	return {
		type: LAPTOP_LOADING,
	};
}

export function laptopError(errorMessage) {
	return {
		type: LAPTOP_ERROR,
		errorMessage,
	};
}

export function laptopFetch(laptops) {
	return {
		type: LAPTOP_FETCH,
		laptops,
	};
}

export function laptopFetchOne(laptop) {
	return {
		type: LAPTOP_FETCH_ONE,
		laptop,
	};
}
