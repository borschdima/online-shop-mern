import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionHeader } from "../../ui";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

import "./ProfileSettings.scss";

const ProfileSettings = () => {
	const dispatch = useDispatch();
	const { darkmode, purchasesNumber, name, email } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	return (
		<section className={`profile section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Редактировать" THEME={THEME} />
			</MDBContainer>
		</section>
	);
};

export default ProfileSettings;
