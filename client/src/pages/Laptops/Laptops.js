import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdbreact";
import { fetchLaptops, laptopChangeQuerySkip } from "../../redux/actions/laptop";
import { clearMessage } from "../../redux/actions/cart";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import LaptopCard from "../../components/LaptopCard/LaptopCard";
import { ToastContainer } from "react-toastify";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";

import "./Laptops.scss";

const Laptops = () => {
	const dispatch = useDispatch();
	const { laptops, allLaptopsCount, querySkip, loading } = useSelector((state) => state.laptop);

	const dispatchLaptops = useCallback(() => dispatch(fetchLaptops(querySkip)), [dispatch, querySkip]);
	const dispatchClearMsg = useCallback(() => dispatch(clearMessage()), [dispatch]);

	useEffect(() => {
		dispatchLaptops();
	}, [dispatchLaptops, dispatchClearMsg]);

	const onChangePage = (skip) => dispatch(laptopChangeQuerySkip(skip));

	if (loading) return <Spinner />;

	return (
		<section className="laptops">
			<MDBContainer>
				<ToastContainer />
				<SectionHeader title="Ноутбуки" />
				<MDBRow className="laptops__list">
					{laptops.map((laptop) => (
						<LaptopCard key={laptop._id} laptop={laptop} />
					))}
				</MDBRow>
				<Pagination
					skip={12}
					initialPage={querySkip > 0 ? querySkip / 12 : querySkip}
					arrayLength={allLaptopsCount}
					onChangePage={(page) => onChangePage(page)}
				/>
			</MDBContainer>
		</section>
	);
};

export default Laptops;
