import React, { useState, useEffect } from "react";
import { MDBNavbar, MDBIcon, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBHamburgerToggler } from "mdbreact";
import { logout } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/actions/cart";
import { notify } from "../../utils/notify";

import "./Navbar.scss";

const Navbar = () => {
	const [collapse, setCollapse] = useState(false);
	const dispatch = useDispatch();
	const { itemsCount: cartItemsCount, message } = useSelector((state) => state.cart);
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	useEffect(() => {
		if (message) {
			notify(message);
			dispatch(clearMessage());
		}
	}, [message, dispatch]);

	const onLinkClick = () => {
		const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

		if (isSmallScreen) {
			document.querySelector("#hamburger").checked = !collapse;
			setCollapse(!collapse);
		}
	};

	const toggleSingleCollapse = () => {
		setCollapse(!collapse);
	};

	return (
		<MDBNavbar dark expand="md" className={THEME}>
			<MDBNavLink to="/" className="navbar-brand" onClick={onLinkClick}>
				ROZETKA
			</MDBNavLink>

			<MDBHamburgerToggler className="d-inline d-md-none" color="#fff" id="hamburger" onClick={toggleSingleCollapse} />
			<MDBCollapse isOpen={collapse} navbar>
				<MDBNavbarNav left>
					<MDBNavItem>
						<MDBNavLink to="/laptops" exact onClick={onLinkClick}>
							<MDBIcon icon="laptop" className="mr-1" />
							Ноутбуки
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						<MDBNavLink to="/add" exact onClick={onLinkClick}>
							<MDBIcon icon="plus-circle" className="mr-1" />
							Добавить товар
						</MDBNavLink>
					</MDBNavItem>
				</MDBNavbarNav>
				<MDBNavbarNav right>
					<MDBNavItem>
						<MDBNavLink to="/profile" onClick={onLinkClick}>
							<MDBIcon icon="user-alt" className="mr-1" />
							Мой профиль
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						<MDBNavLink className="waves-effect waves-light d-flex align-items-center mr-3" to="/cart" onClick={onLinkClick}>
							{cartItemsCount > 0 ? (
								<span id="cart-number" className={THEME}>
									{cartItemsCount}
								</span>
							) : null}
							<MDBIcon icon="shopping-cart" className="ml-1" />
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem onClick={() => dispatch(logout())}>
						<div className="nav-link Ripple-parent waves-effect waves-light d-flex align-items-center mr-3">
							<MDBIcon icon="sign-out-alt" className="mr-1" />
							Выйти
						</div>
					</MDBNavItem>
				</MDBNavbarNav>
			</MDBCollapse>
		</MDBNavbar>
	);
};

export default Navbar;
