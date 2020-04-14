import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBIcon } from "mdbreact";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../../redux/actions/auth";
import { notify } from "../../utils/notify";
import { ToastContainer } from "react-toastify";
import { Button } from "../../ui";

import "./Form.scss";

const Form = () => {
	const dispatch = useDispatch();

	// Local State
	const [showPass, setShowPass] = useState(false);

	// Global State
	const { error, loading, formMessage } = useSelector((state) => state.auth);

	useEffect(() => {
		if (formMessage) {
			notify(formMessage);
		}
	}, [formMessage]);

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			// Define which button User has pressed
			onSubmit={(values) => {
				if (values.isSignup) {
					dispatch(auth(values.email, values.password, false));
				} else {
					dispatch(auth(values.email, values.password, true));
				}
			}}
			validationSchema={Yup.object().shape({
				email: Yup.string().email("Введите корректный email").required("Это поле обязательно"),
				password: Yup.string().required("Это поле обязательно").min(6, "Должно быть не меньше 6 символов"),
			})}
		>
			{(props) => {
				const { touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

				return (
					<form className="auth__form form" onSubmit={(e) => e.preventDefault()}>
						<div className="form__logo"></div>
						<div className="form__text form__title">Онлайн магазин</div>
						<div className="form__text form__subtitle">BETA</div>
						<div className="form__fields">
							<div className="form__field">
								<MDBIcon className="form__icon" icon="envelope" />
								<input
									className="form__input"
									id="email"
									onChange={handleChange}
									onBlur={handleBlur}
									type="text"
									name="email"
									placeholder="Ваш email"
								/>
							</div>
							{errors.email && touched.email ? <div className="form__text form__error-message">{errors.email}</div> : null}

							<div className="form__field">
								<MDBIcon className="form__icon" icon="unlock" />
								<input
									className="form__input"
									id="password"
									onChange={handleChange}
									onBlur={handleBlur}
									type={showPass ? "text" : "password"}
									name="password"
									placeholder="Пароль"
								/>
								{showPass ? (
									<MDBIcon className="form__toggle-password " icon="eye" onClick={() => setShowPass(!showPass)} />
								) : (
									<MDBIcon className="form__toggle-password " icon="eye-slash" onClick={() => setShowPass(!showPass)} />
								)}
							</div>
							{errors.password && touched.password ? <div className="form__text form__error-message">{errors.password}</div> : null}
						</div>

						{error ? (
							<div className="form__text form__error-message">{formMessage}</div>
						) : (
							<div className="form__text form__success-message">{formMessage}</div>
						)}

						<Button
							label="Войти"
							disabled={loading}
							clickHandler={(e) => {
								setFieldValue("isSignup", false);
								handleSubmit(e);
							}}
						/>
						<div className="form__signup form__text">
							Нет аккаунта?{" "}
							<button
								className="form__btn-reg"
								type="submit"
								disabled={loading}
								onClick={(e) => {
									setFieldValue("isSignup", true);
									handleSubmit(e);
								}}
							>
								Зарегистрируйтесь
							</button>
						</div>
						<ToastContainer />
					</form>
				);
			}}
		</Formik>
	);
};

export default Form;
