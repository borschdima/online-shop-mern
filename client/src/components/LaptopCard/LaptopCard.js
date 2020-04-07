import React from "react";
import { useDispatch } from "react-redux";
import { MDBCol, MDBIcon } from "mdbreact";
import { addItem } from "../../redux/actions/cart";
import { useHistory } from "react-router-dom";

import "./LaptopCard.scss";

const LaptopCard = ({ laptop }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const addToCartHandler = (e) => {
		e.stopPropagation();
		dispatch(addItem(laptop));
	};

	return (
		<MDBCol xs="12" md="6" lg="4" className="mt-4">
			<div className="laptop-card" onClick={() => history.push("/laptops/" + laptop._id)}>
				<img className="laptop-card__img" src={laptop.img} alt="preview" />
				<div className="laptop-card__name">{laptop.name}</div>
				<div className="laptop-card__description">{laptop.description}</div>
				<div className="d-flex justify-content-between align-items-center mt-3">
					<div className="laptop-card__price">{laptop.price}</div>
					<MDBIcon icon="shopping-cart" className="laptop-card__add" onClick={addToCartHandler} />
				</div>
				<div className="laptop-card__presence">Есть в наличии</div>
			</div>
		</MDBCol>
	);
};

export default LaptopCard;
