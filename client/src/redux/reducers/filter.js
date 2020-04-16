import { FILTER_TOGGLE_BRAND, FILTER_TOGGLE_CORE, FILTER_APPLY, FILTER_RESET } from "../actions/actionTypes";

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
	allCores: ["2 ядра", "4 ядра", "6 ядер", "8 ядер"],
	filterCores: [],
	resultCores: [],
	priceRange: [],
};

export default function filterReducer(state = initialState, action) {
	switch (action.type) {
		case FILTER_APPLY:
			return { ...state, resultBrands: state.filterBrands, resultCores: state.filterCores, priceRange: action.priceRange };

		case FILTER_RESET:
			return { ...state, resultBrands: [], filterBrands: [], resultCores: [], filterCores: [], priceRange: [] };

		case FILTER_TOGGLE_BRAND:
			return { ...state, filterBrands: action.brands };

		case FILTER_TOGGLE_CORE:
			return { ...state, filterCores: action.cores };

		default:
			return state;
	}
}
