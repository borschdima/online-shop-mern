import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../../utils/notify";
import { clearMessage } from "../../redux/actions/auth";
import { MDBContainer } from "mdbreact";
import SectionHeader from "../../ui/SectionHeader/SectionHeader";

import "./Home.scss";

const Home = () => {
	const formMessage = useSelector((state) => state.auth.formMessage);
	const dispatch = useDispatch();

	useEffect(() => {
		if (formMessage) {
			notify(formMessage);
			dispatch(clearMessage());
		}
	}, [dispatch, formMessage]);

	return (
		<section className="home">
			<MDBContainer>
				<SectionHeader title="Главная страница" />
				<p>Перейдите на страницу "Ноутбуки". Там можно взаимодействовать с карточками</p>
				<h5>На данный момент реализовано:</h5>
				<ul>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Авторизация
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Подключена база данных
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Все действия синхронизированы с базой данных
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавление товара в корзину со страницы "Ноутбуки"
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Просмотр детальной информации о ноутбуке
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Полностью завершена страница "Корзина"
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Реализованы действия на странице "Корзина"
					</li>
				</ul>
				<ToastContainer />
			</MDBContainer>
		</section>
	);
};

export default Home;
