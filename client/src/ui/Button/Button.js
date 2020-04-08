import React from "react";

import "./Button.scss";

const Button = ({ type = "submit", label, disabled = false, clickHandler, small = false }) => {
	let classNames = "mybtn";
	classNames += small ? " small" : "";

	return (
		<button type={type} className={classNames} disabled={disabled} onClick={clickHandler}>
			{label}
		</button>
	);
};

export default Button;
