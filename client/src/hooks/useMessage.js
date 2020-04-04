import { useCallback } from "react";
import { toast } from "react-toastify";

export const useMessage = message => {
	const notify = useCallback(
		() =>
			toast(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			}),
		[message]
	);

	return { notify };
};
