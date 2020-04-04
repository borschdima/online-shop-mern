import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "../../hooks/useMessage";
import { clearMessage } from "../../redux/actions/auth";
import { MDBContainer } from "mdbreact";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";

import "./Home.scss";

const Home = () => {
	const formMessage = useSelector(state => state.auth.formMessage);
	const { notify } = useMessage(formMessage);
	const dispatch = useDispatch();

	useEffect(() => {
		if (formMessage) {
			notify();
		}

		return () => dispatch(clearMessage());
	}, [notify, dispatch, formMessage]);

	return (
		<section className="home">
			<MDBContainer>
				<SectionHeader title="Главная страница" />
				<p>Перейдите на страницу "Ноутбуки". Там можно взаимодействовать с карточками</p>
				<ToastContainer />
			</MDBContainer>
		</section>
	);
};

export default Home;
