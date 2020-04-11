import { LAPTOP_ERROR, LAPTOP_LOADING, LAPTOP_FETCH, LAPTOP_FETCH_ONE, LAPTOP_CHANGE_SKIP } from "../actions/actionTypes";

const initialState = {
	laptops: [],
	allLaptopsCount: 0,
	querySkip: 0,
	laptopDetails: null,
	loading: false,
	error: false,
	errorMessage: "",
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case LAPTOP_FETCH_ONE:
			return { ...state, loading: false, error: false, laptopDetails: action.laptop };

		case LAPTOP_CHANGE_SKIP:
			return { ...state, querySkip: action.skip };

		case LAPTOP_FETCH:
			return { ...state, loading: false, laptops: action.laptops, allLaptopsCount: action.allLaptopsCount, error: false };

		case LAPTOP_LOADING:
			return { ...state, loading: true, error: false };

		case LAPTOP_ERROR:
			return { ...state, error: true, loading: false, errorMessage: action.errorMessage };

		default:
			return state;
	}
}
