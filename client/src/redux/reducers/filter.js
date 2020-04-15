import { FILTER_TOGGLE_BRAND, FILTER_APPLY, FILTER_RESET } from "../actions/actionTypes";

const initialState = {
	allBrands: [
		"Apple",
		"Acer",
		"Asus",
		"Dell",
		"Digma",
		"Honor",
		"HP",
		"Huawei",
		"Lenovo",
		"Microsoft",
		"MSI",
		"Prestigo",
		"Razer",
		"Samsung",
		"Sony",
		"Toshiba",
		"Xiaomi",
		"AlienWare",
		"Fujitsu",
		"Haier",
		"Hasee",
		"Mainbenben",
		"Thunderobot",
	],
	filterBrands: [],
	resultBrands: [],
	priceRange: [],
};

export default function filterReducer(state = initialState, action) {
	switch (action.type) {
		case FILTER_APPLY:
			return { ...state, resultBrands: state.filterBrands, priceRange: action.priceRange };

		case FILTER_RESET:
			return { ...state, resultBrands: [], filterBrands: [], priceRange: [] };

		case FILTER_TOGGLE_BRAND:
			return { ...state, filterBrands: action.brands };

		default:
			return state;
	}
}
