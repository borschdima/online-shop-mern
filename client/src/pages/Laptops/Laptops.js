import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdbreact";
import { fetchLaptops } from "../../redux/actions/laptop";
import { clearMessage } from "../../redux/actions/cart";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import LaptopCard from "../../components/LaptopCard/LaptopCard";
import { notify } from "../../utils/notify";
import { ToastContainer } from "react-toastify";

import "./Laptops.scss";

const Laptops = () => {
	const dispatch = useDispatch();
	const { laptops } = useSelector((state) => state.laptop);
	const { message } = useSelector((state) => state.cart);

	const dispatchLaptops = useCallback(() => dispatch(fetchLaptops()), [dispatch]);
	const dispatchClearMsg = useCallback(() => dispatch(clearMessage()), [dispatch]);

	useEffect(() => {
		if (!laptops.length) {
			dispatchLaptops();
		}
		if (message) {
			notify(message);
			dispatchClearMsg();
		}
	}, [dispatchLaptops, dispatchClearMsg, message, laptops.length]);

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
			</MDBContainer>
		</section>
	);
};

export default Laptops;
