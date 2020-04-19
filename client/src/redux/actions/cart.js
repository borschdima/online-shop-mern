import {
	CART_ADD_SUCCESS,
	CART_BUY_SUCCESS,
	CART_REMOVE_SUCCESS,
	CART_LOADING,
	CART_ERROR,
	CART_CLEAR_MESSAGE,
	CART_FETCH_SUCCESS,
	UPDATE_PURCHASES,
} from "../actions/actionTypes";
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

export function removeItem(id) {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const data = await request("/api/cart/remove", { id }, "DELETE");

			dispatch(cartRemoveSuccess(id, data.message));
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

			dispatch(cartFetchSuccess(data.cart));
			dispatch({ type: UPDATE_PURCHASES, purchasesNumber: data.purchasesNumber });
		} catch (error) {
			dispatch(cartError(error.message));
		}
	};
}

export function buy() {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const data = await request("/api/cart/buy", null, "POST");

			dispatch(cartBuySuccess(data.message));
			dispatch({ type: UPDATE_PURCHASES, purchasesNumber: data.user.purchasesNumber });
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

export function cartBuySuccess(message) {
	return {
		type: CART_BUY_SUCCESS,
		message,
	};
}

export function cartRemoveSuccess(itemId, message) {
	return {
		type: CART_REMOVE_SUCCESS,
		itemId,
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
