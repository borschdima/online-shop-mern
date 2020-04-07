import React from "react";
import { useSelector } from "react-redux";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import { MDBContainer, MDBDataTable } from "mdbreact";
import { useHistory } from "react-router-dom";

import "./Cart.scss";

const Cart = () => {
	const history = useHistory();
	const cartItems = useSelector((state) => state.cart.items);

	const rowItems = cartItems.map((item) => ({
		...item,
		clickEvent() {
			history.push("/laptops/" + item._id);
		},
	}));

	const data = {
		columns: [
			{
				label: "Название",
				field: "name",
				sort: "asc",
			},
			{
				label: "Цена",
				field: "price",
				sort: "asc",
			},
		],
		rows: rowItems,
	};
	return (
		<section className="cart">
			<MDBContainer>
				<SectionHeader title="Корзина" />
				<p>Здесь будут добавленные товары</p>

				<MDBDataTable
					striped
					bordered
					responsive
					small
					btn
					data={data}
					infoLabel={["Показывается", "до", "из", "товаров"]}
					paginationLabel={["Назад", "Вперед"]}
					searchLabel="Поиск"
				/>
			</MDBContainer>
		</section>
	);
};

export default Cart;
