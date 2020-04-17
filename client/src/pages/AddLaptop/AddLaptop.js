import React from "react";
import { SectionHeader } from "../../ui";
import { MDBContainer } from "mdbreact";
import { useSelector } from "react-redux";

import "./AddLaptop.scss";

const AddLaptop = () => {
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	return (
		<section className={`add-laptop section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Добавить ноутбук" />
				<p>Здесь будет форма добавления</p>
			</MDBContainer>
		</section>
	);
};

export default AddLaptop;
