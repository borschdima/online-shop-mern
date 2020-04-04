import { CART_ADD } from "../actions/actionTypes";

const initialState = {
	itemsCount: 0,
	items: []
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case CART_ADD:
			let itemsCount = state.itemsCount;
			itemsCount += 1;
			let items = [...state.items];
			items.push(action.item);
			return { ...state, itemsCount, items };

		default:
			return state;
	}
}
