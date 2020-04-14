import {} from "../actions/actionTypes";

const initialState = {
	allBrands: [
		"Apple",
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
	loading: false,
	error: false,
};

export default function filterReducer(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
