import { CART_ADD } from "../actions/actionTypes";

export function addItem(item) {
	return {
		type: CART_ADD,
		item
	};
}
