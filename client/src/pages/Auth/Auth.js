import React from "react";
import { MDBContainer } from "mdbreact";
import { Form } from "../../components";

import "./Auth.scss";

const Auth = () => {
	return (
		<section className="auth">
			<MDBContainer className="d-flex justify-content-center">
				<Form />
			</MDBContainer>
		</section>
	);
};

export default Auth;
