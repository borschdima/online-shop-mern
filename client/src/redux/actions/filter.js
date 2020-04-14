import { FILTER_TOGGLE_BRAND, FILTER_APPLY } from "../actions/actionTypes";

export function toggleBrand(filterBrands, brandName) {
	return (dispatch) => {
		const brands = [...filterBrands];
		const index = brands.findIndex((item) => item === brandName);

		if (index === -1) {
			brands.push(brandName);
		} else {
			brands.splice(index, 1);
		}

		dispatch(filterToggleBrand(brands));
	};
}

export function filterToggleBrand(brands) {
	return {
		type: FILTER_TOGGLE_BRAND,
		brands,
	};
}

export function filterApply() {
	return {
		type: FILTER_APPLY,
	};
}
