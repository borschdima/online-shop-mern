import React from "react";
import { useDispatch } from "react-redux";
import { MDBCol, MDBIcon } from "mdbreact";
import { addItem } from "../../redux/actions/cart";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useMessage } from "../../hooks/useMessage";

import "./LaptopCard.scss";

const LaptopCard = ({ laptop }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { notify } = useMessage("Ноутбук добавлен в корзину! Перейдите туда, чтобы посмотреть ");

	const addToCartHandler = e => {
		e.stopPropagation();
		notify();
		dispatch(addItem(laptop));
	};

	return (
		<MDBCol xs="12" md="6" lg="4">
			<div className="laptop-card" onClick={() => history.push("/laptops/" + laptop._id)}>
				<ToastContainer />
				<img className="laptop-card__img" src={laptop.img} alt="preview" />
				<div className="laptop-card__description">{laptop.description}</div>
				<div className="d-flex justify-content-between align-items-center mt-2">
					<div className="laptop-card__price">{laptop.price}</div>
					<MDBIcon icon="shopping-cart" className="laptop-card__add" onClick={addToCartHandler} />
				</div>
				<div className="laptop-card__presence">Есть в наличии</div>
			</div>
		</MDBCol>
	);
};

export default LaptopCard;
