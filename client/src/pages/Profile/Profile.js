import React from "react";
import { SectionHeader } from "../../ui";
import { MDBContainer } from "mdbreact";

import "./Profile.scss";

const Profile = () => {
	return (
		<section className="profile">
			<MDBContainer>
				<SectionHeader title="Мой профиль" />
				<p>Здесь будут настройки и сведения о профиле</p>
			</MDBContainer>
		</section>
	);
};

export default Profile;
