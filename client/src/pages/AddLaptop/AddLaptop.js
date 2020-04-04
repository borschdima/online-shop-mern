import React from "react";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import { MDBContainer } from "mdbreact";

import "./AddLaptop.scss";

const AddLaptop = () => {
	return (
		<section className="add-laptop">
			<MDBContainer>
				<SectionHeader title="Добавить ноутбук" />
				<p>Здесь будет форма добавления</p>
			</MDBContainer>
		</section>
	);
};

export default AddLaptop;
