import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";
import { MDBContainer, MDBDataTable } from "mdbreact";
import { useHistory } from "react-router-dom";
import { removeItem, clearMessage } from "../../redux/actions/cart";
import { useMessage } from "../../hooks/useMessage";
import { ToastContainer } from "react-toastify";

import "./Cart.scss";

const Cart = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.items);
	const message = useSelector((state) => state.cart.message);
	const loading = useSelector((state) => state.cart.loading);
	const { notify } = useMessage(message);

	useEffect(() => {
		if (message) {
			notify();
			dispatch(clearMessage());
		}
	}, [message, notify, dispatch]);

	const rowItems = cartItems.map((item) => ({
		...item,
		remove: (
			<button className="remove-item" disabled={loading} onClick={(e) => removeItemHandler(e, item._id)}>
				Убрать
			</button>
		),
		clickEvent() {
			history.push("/laptops/" + item._id);
		},
	}));

	const removeItemHandler = (e, id) => {
		e.stopPropagation();
		dispatch(removeItem(id));
	};

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
			{
				label: "Действия",
				field: "remove",
			},
		],
		rows: rowItems,
	};
	return (
		<section className="cart">
			<MDBContainer>
				<ToastContainer />
				<SectionHeader title="Корзина" />
				<p>Здесь будут добавленные товары</p>

				<MDBDataTable
					striped
					bordered
					responsive
					small
					btn
					hover
					data={data}
					infoLabel={["Показывается", "до", "из", "товаров"]}
					paginationLabel={["Назад", "Вперед"]}
					searchLabel="Поиск"
					noBottomColumns
					displayEntries={false}
					noRecordsFoundLabel="В вашей корзине пусто 😔"
				/>
			</MDBContainer>
		</section>
	);
};

export default Cart;
