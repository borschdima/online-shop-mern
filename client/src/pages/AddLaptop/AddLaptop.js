import React from "react";
import { SectionHeader } from "../../ui";
import { MDBContainer } from "mdbreact";

import "./AddLaptop.scss";

const AddLaptop = () => {
	return (
		<section className="add-laptop section_page">
			<MDBContainer>
				<SectionHeader title="Добавить ноутбук" />
				<p>Здесь будет форма добавления</p>
			</MDBContainer>
		</section>
	);
};

export default AddLaptop;
