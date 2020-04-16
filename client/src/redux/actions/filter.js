import { FILTER_TOGGLE_BRAND, FILTER_TOGGLE_CORE, FILTER_APPLY, FILTER_RESET } from "../actions/actionTypes";

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

export function toggleCore(filterCores, coreName) {
	return (dispatch) => {
		const cores = [...filterCores];
		const index = cores.findIndex((item) => item === coreName);

		if (index === -1) {
			cores.push(coreName);
		} else {
			cores.splice(index, 1);
		}

		dispatch(filterToggleCore(cores));
	};
}

export function filterToggleBrand(brands) {
	return {
		type: FILTER_TOGGLE_BRAND,
		brands,
	};
}

export function filterToggleCore(cores) {
	return {
		type: FILTER_TOGGLE_CORE,
		cores,
	};
}

export function filterApply(priceRange) {
	return {
		type: FILTER_APPLY,
		priceRange,
	};
}

export function filterReset() {
	return {
		type: FILTER_RESET,
	};
}
