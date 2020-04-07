import { CART_ADD_SUCCESS, CART_LOADING, CART_ERROR, CART_CLEAR_MESSAGE, CART_FETCH_SUCCESS } from "../actions/actionTypes";
import { request } from "../requestConfig";

export function addItem(item) {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const data = await request("/api/cart/add", { id: item._id }, "POST");

			dispatch(cartAddSuccess(data.laptop, data.message));
		} catch (error) {
			dispatch(cartError(error.message));
		}
	};
}

export function getItems() {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const data = await request("/api/cart");

			dispatch(cartFetchSuccess(data));
		} catch (error) {
			dispatch(cartError(error.message));
		}
	};
}

export function cartError(errorMessage) {
	return {
		type: CART_ERROR,
		errorMessage,
	};
}

export function cartLoading() {
	return {
		type: CART_LOADING,
	};
}

export function cartAddSuccess(item, message) {
	return {
		type: CART_ADD_SUCCESS,
		item,
		message,
	};
}

export function cartFetchSuccess(items) {
	return {
		type: CART_FETCH_SUCCESS,
		items,
	};
}

export function clearMessage() {
	return {
		type: CART_CLEAR_MESSAGE,
	};
}
