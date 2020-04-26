import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../../utils/notify";
import { clearMessage } from "../../redux/actions/auth";
import { MDBContainer } from "mdbreact";
import { SectionHeader } from "../../ui";

import "./Home.scss";

const Home = () => {
	const dispatch = useDispatch();
	const formMessage = useSelector((state) => state.auth.formMessage);
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	useEffect(() => {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		if (formMessage) {
			notify(formMessage);
			dispatch(clearMessage());
		}

		// return () => dispatch(clearMessage());
	}, [dispatch, formMessage]);

	return (
		<section className={`home section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Главная страница" THEME={THEME} />
				<p>Перейдите на страницу "Ноутбуки". Там можно взаимодействовать с карточками</p>
				<h5>На данный момент реализовано:</h5>
				<ul style={{ listStyle: "none", padding: 0 }}>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлена возможность редактирования данных пользователя
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлена функция рассылки на почту (визуально и частично на сервере)
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлен рейтинг ноутбуков и сортировка по нему
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлена черная тема. В настройках акааунта
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Реализована сортировка по фильтру ОЗУ из бокового меню (синхронизировано с сервером)
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Реализована сортировка по фильтру ядра из бокового меню (синхронизировано с сервером)
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Реализована сортировка по фильтру цена из бокового меню (синхронизировано с сервером)
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Реализована сортировка по фильтру производителя из бокового меню (синхронизировано с сервером)
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлено боковое меню с фильтрами (только фронтенд)
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Реализована сортировка товара по нескольким критериям
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлен режим отображения товаров GridSize"
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлена пагинация на странице "Ноутбуки"
					</li>
					<li>
						<span role="img" aria-label="cart emoji">
							✅
						</span>{" "}
						Добавлен индикатор загрузки страницы
					</li>
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
