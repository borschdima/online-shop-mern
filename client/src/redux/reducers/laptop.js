import { LAPTOP_ERROR, LAPTOP_LOADING, LAPTOP_FETCH } from "../actions/actionTypes";

const initialState = {
	laptops: [],
	loading: false,
	error: false,
	errorMessage: ""
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case LAPTOP_FETCH:
			return {
				...state,
				loading: false,
				laptops: action.laptops
			};
		case LAPTOP_LOADING:
			return {
				...state,
				loading: true,
				error: false
			};
		case LAPTOP_ERROR:
			return {
				...state,
				error: true,
				loading: false,
				errorMessage: action.errorMessage
			};
		default:
			return state;
	}
}
