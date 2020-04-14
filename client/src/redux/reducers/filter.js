import { FILTER_TOGGLE_BRAND, FILTER_APPLY } from "../actions/actionTypes";

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
};

export default function filterReducer(state = initialState, action) {
	switch (action.type) {
		case FILTER_APPLY:
			return { ...state, resultBrands: state.filterBrands };

		case FILTER_TOGGLE_BRAND:
			return { ...state, filterBrands: action.brands };

		default:
			return state;
	}
}
