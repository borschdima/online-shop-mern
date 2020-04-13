import React from "react";
import { MDBIcon } from "mdbreact";

import "./Button.scss";

const Button = ({
	classes = "",
	type = "submit",
	label,
	disabled = false,
	clickHandler,
	xs = false,
	small = false,
	icon = null,
	labelShow = false,
}) => {
	let classNames = "mybtn";
	classNames += small ? " small " : "";
	classNames += xs ? " xs " : "";
	classNames += classes ? ` ${classes} ` : "";

	return (
		<button type={type} className={classNames} disabled={disabled} onClick={clickHandler}>
			{icon ? <MDBIcon icon={icon} /> : null}
			<span className={`mybtn__label d-none d-md-block ${icon ? "ml-2" : ""} ${labelShow ? "label-show" : ""}`}>{label}</span>
		</button>
	);
};

export default Button;
