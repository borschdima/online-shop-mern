import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow } from "mdbreact";
import { fetchLaptops } from "../../redux/actions/laptop";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import LaptopCard from "../../components/LaptopCard/LaptopCard";

import "./Laptops.scss";

const Laptops = () => {
	const dispatch = useDispatch();
	const laptops = useSelector(state => state.laptop.laptops);

	useEffect(() => {
		dispatch(fetchLaptops());
	}, [dispatch]);

	return (
		<section className="laptops">
			<MDBContainer>
				<SectionHeader title="Ноутбуки" />
				<MDBRow className="laptops__list">
					{laptops.map(laptop => (
						<LaptopCard key={laptop._id} laptop={laptop} />
					))}
				</MDBRow>
			</MDBContainer>
		</section>
	);
};

export default Laptops;
