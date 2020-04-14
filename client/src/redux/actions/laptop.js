import {
	LAPTOP_ERROR,
	LAPTOP_CHANGE_SKIP,
	LAPTOP_CHANGE_SORT,
	LAPTOP_CHANGE_GRID_SIZE,
	LAPTOP_LOADING,
	LAPTOP_FETCH,
	LAPTOP_FETCH_ONE,
} from "../actions/actionTypes";
import { request } from "../requestConfig";

export function fetchLaptops(skip, sortBy = null, brands = []) {
	return async (dispatch) => {
		dispatch(laptopLoading());

		let sortQuery = "";
		let brandsQuery = "";

		if (sortBy) {
			sortQuery += `&sortBy=${sortBy.field}:${sortBy.order}`;
		}

		if (brands.length) {
			brandsQuery += `&brand=${brands.toString()}`;
		}

		try {
			const { laptops, allLaptopsCount } = await request(`/api/laptops?skip=${skip}${sortQuery}${brandsQuery}`);

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

export function laptopChangeGridSize(size) {
	return {
		type: LAPTOP_CHANGE_GRID_SIZE,
		size,
	};
}

export function laptopChangeQuerySkip(skip) {
	return {
		type: LAPTOP_CHANGE_SKIP,
		skip,
	};
}

export function laptopChangeQuerySort(sortBy) {
	return {
		type: LAPTOP_CHANGE_SORT,
		sortBy,
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
