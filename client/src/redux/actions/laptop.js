import { LAPTOP_ERROR, LAPTOP_CHANGE_SKIP, LAPTOP_LOADING, LAPTOP_FETCH, LAPTOP_FETCH_ONE } from "../actions/actionTypes";
import { request } from "../requestConfig";

export function fetchLaptops(skip) {
	return async (dispatch) => {
		dispatch(laptopLoading());

		try {
			const { laptops, allLaptopsCount } = await request(`/api/laptops?skip=${skip}`);

			dispatch(laptopFetch(laptops, allLaptopsCount));
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

export function laptopChangeQuerySkip(skip) {
	return {
		type: LAPTOP_CHANGE_SKIP,
		skip,
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

export function laptopFetch(laptops, allLaptopsCount) {
	return {
		type: LAPTOP_FETCH,
		laptops,
		allLaptopsCount,
	};
}

export function laptopFetchOne(laptop) {
	return {
		type: LAPTOP_FETCH_ONE,
		laptop,
	};
}
