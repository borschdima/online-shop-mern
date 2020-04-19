import React from "react";
import { SectionHeader, Toggle } from "../../ui";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { changeDarkMode } from "../../redux/actions/user";

import "./Profile.scss";

const Profile = () => {
	const dispatch = useDispatch();
	const { darkmode, purchasesNumber } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	return (
		<section className={`profile section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Мой профиль" THEME={THEME} />
				<MDBRow>
					<MDBCol xs="12" lg="6">
						<div className="profile__avatar avatar">
							<div className="avatar__back">
								<div className="avatar__front">
									<div className="avatar__face"></div>
									<div className="avatar__body"></div>
								</div>
							</div>
						</div>
					</MDBCol>
					<MDBCol xs="12" lg="6">
						<div className="profile__info info">
							<h4 className="text-center">Информация</h4>
							<h6 className="info__text">
								Количество купленных Вами товаров: <span className="info__text_bold">{purchasesNumber}</span>
							</h6>
						</div>
					</MDBCol>
				</MDBRow>
				<MDBRow>
					<MDBCol xl="12">
						<div className="profile__settings settings">
							<h4 className="text-center">Настройки</h4>
							<div className="settings__block">
								<div className="settings__name">Ночной режим: </div>
								<div className="settings__option">
									<Toggle onToggle={(value) => dispatch(changeDarkMode(value))} active={darkmode} THEME={THEME} />
								</div>
							</div>
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
};

export default Profile;
