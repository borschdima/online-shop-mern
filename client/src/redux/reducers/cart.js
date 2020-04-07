import { CART_ADD_SUCCESS, CART_ERROR, CART_LOADING, CART_CLEAR_MESSAGE, CART_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = {
	itemsCount: 0,
	items: [],
	loading: false,
	error: false,
	message: "",
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case CART_ADD_SUCCESS:
			let itemsCount = state.itemsCount;
			itemsCount += 1;
			let items = [...state.items];
			items.push(action.item);
			return { ...state, itemsCount, items, message: action.message };
		case CART_FETCH_SUCCESS:
			return { ...state, items: action.items, itemsCount: action.items.length, loading: false, error: false };
		case CART_LOADING:
			return { ...state, loading: true, error: false };
		case CART_ERROR:
			return { ...state, error: true, loading: false, message: action.errorMessage };
		case CART_CLEAR_MESSAGE:
			return { ...state, message: "" };
		default:
			return state;
	}
}
