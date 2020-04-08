import { toast } from "react-toastify";

export const notify = (message) => {
	toast(message, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
};
