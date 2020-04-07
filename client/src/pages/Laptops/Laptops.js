import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdbreact";
import { fetchLaptops } from "../../redux/actions/laptop";
import { clearMessage } from "../../redux/actions/cart";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import LaptopCard from "../../components/LaptopCard/LaptopCard";
import { useMessage } from "../../hooks/useMessage";

import "./Laptops.scss";

const Laptops = () => {
	const dispatch = useDispatch();
	const laptops = useSelector((state) => state.laptop.laptops);
	const message = useSelector((state) => state.cart.message);
	const { notify } = useMessage(message);

	const dispatchLaptops = useCallback(() => dispatch(fetchLaptops()), [dispatch]);
	const dispatchClearMsg = useCallback(() => dispatch(clearMessage()), [dispatch]);

	useEffect(() => {
		if (!laptops.length) {
			dispatchLaptops();
		}
		if (message) {
			notify();
		}

		return () => dispatchClearMsg();
	}, [dispatchLaptops, dispatchClearMsg, notify, message, laptops.length]);

	return (
		<section className="laptops">
			<MDBContainer>
				<SectionHeader title="Ноутбуки" />
				<MDBRow className="laptops__list">
					{laptops.map((laptop) => (
						<LaptopCard key={laptop._id} laptop={laptop} />
					))}
				</MDBRow>
			</MDBContainer>
		</section>
	);
};

export default Laptops;
