import React from "react";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import { MDBContainer } from "mdbreact";

import "./LaptopDetails.scss";

const LaptopDetails = () => {
	return (
		<section className="details">
			<MDBContainer>
				<SectionHeader title="Детальная информация" />
				<p>Здесь будет детальная информация ноутбука из карточки</p>
			</MDBContainer>
		</section>
	);
};

export default LaptopDetails;
