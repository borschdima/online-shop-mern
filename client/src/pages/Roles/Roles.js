import React from "react";
import { SectionHeader } from "../../ui";
import { MDBContainer } from "mdbreact";
import { useSelector } from "react-redux";

import "./Roles.scss";

const Roles = () => {
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	return (
		<section className={`roles section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Админка" />
				<p>Здесь будет распределение прав пользователям</p>
			</MDBContainer>
		</section>
	);
};

export default Roles;
