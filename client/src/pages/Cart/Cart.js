import React from "react";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import { MDBContainer } from "mdbreact";

import "./Cart.scss";

const Cart = () => {
	return (
		<section className="cart">
			<MDBContainer>
				<SectionHeader title="Корзина" />
				<p>Здесь будут добавленные товары</p>
			</MDBContainer>
		</section>
	);
};

export default Cart;
