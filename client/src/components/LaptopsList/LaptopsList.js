import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBRow } from "mdbreact";
import { Spinner, LaptopCard } from "../";
import { fetchLaptops } from "../../redux/actions/laptop";

import "./LaptopsList.scss";

const LaptopsList = () => {
	const dispatch = useDispatch();
	const { laptops, querySkip, sortBy, gridSize, loading } = useSelector((state) => state.laptop);
	const { resultBrands } = useSelector((state) => state.filter);

	const dispatchLaptops = useCallback(() => dispatch(fetchLaptops(querySkip, sortBy, resultBrands)), [dispatch, sortBy, querySkip, resultBrands]);

	useEffect(() => {
		dispatchLaptops();
	}, [dispatchLaptops]);

	if (!laptops.length) return <div>Нет товаров, соответствующих критериям :(</div>;

	return (
		<MDBRow className={`laptops__list ${loading ? "laptops__list_loading" : ""}`}>
			{loading ? <Spinner /> : laptops.map((laptop) => <LaptopCard key={laptop._id} laptop={laptop} size={gridSize} />)}
		</MDBRow>
	);
};

export default LaptopsList;
