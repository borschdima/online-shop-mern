import React from "react";
import { useSelector } from "react-redux";
import { SectionHeader } from "../../ui";
import { MDBContainer } from "mdbreact";

import "./ProfileSettings.scss";

const ProfileSettings = () => {
	// const dispatch = useDispatch();
	const { darkmode } = useSelector((state) => state.user);

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
