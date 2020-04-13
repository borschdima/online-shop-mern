import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBRow, MDBIcon } from "mdbreact";
import { fetchLaptops, laptopChangeQuerySkip, laptopChangeGridSize, laptopChangeQuerySort } from "../../redux/actions/laptop";
import { ToastContainer } from "react-toastify";
import { Spinner, LaptopCard, Pagination, Drawer } from "../../components";
import { DropDown, SectionHeader } from "../../ui";

import "./Laptops.scss";

const Laptops = () => {
	const dispatch = useDispatch();
	const { laptops, allLaptopsCount, querySkip, sortBy, gridSize, loading } = useSelector((state) => state.laptop);

	const dispatchLaptops = useCallback(() => dispatch(fetchLaptops(querySkip, sortBy)), [dispatch, sortBy, querySkip]);

	useEffect(() => {
		dispatchLaptops();
	}, [dispatchLaptops]);

	const onChangePage = (skip) => dispatch(laptopChangeQuerySkip(skip));

	const sortByClickHandler = (item) => dispatch(laptopChangeQuerySort(item));

	const onChangeGridSize = () => {
		gridSize === "big" ? dispatch(laptopChangeGridSize("small")) : dispatch(laptopChangeGridSize("big"));
	};

	const sortItems = [
		{ label: "От дорогих к дешевым", field: "price", order: "desc" },
		{ label: "От дешевых к дорогим", field: "price", order: "asc" },
		{ label: "По дате(сначала новые)", field: "createdAt", order: "desc" },
		{ label: "По дате(сначала старые)", field: "createdAt", order: "asc" },
	];

	if (loading) return <Spinner />;

	return (
		<section className="laptops">
			<MDBContainer>
				<ToastContainer />
				<SectionHeader title="Ноутбуки" />

				<div className="laptops__display-mode d-flex align-items-center">
					<Drawer />
					<DropDown items={sortItems} active={sortBy} clickHandler={(item) => sortByClickHandler(item)} />
					<MDBIcon
						title="Большая плитка"
						icon="th-large"
						className={`d-none d-md-block laptops__mode-icon ${gridSize === "big" ? "laptops__mode-icon_active" : ""}`}
						onClick={onChangeGridSize.bind(null)}
					/>
					<MDBIcon
						title="Маленькая плитка"
						icon="th"
						className={`d-none d-md-block laptops__mode-icon ${gridSize === "small" ? "laptops__mode-icon_active" : ""}`}
						onClick={onChangeGridSize.bind(null)}
					/>
				</div>
				<MDBRow className="laptops__list">
					{laptops.map((laptop) => (
						<LaptopCard key={laptop._id} laptop={laptop} size={gridSize} />
					))}
				</MDBRow>

				<Pagination
					skip={12}
					initialPage={querySkip > 0 ? querySkip / 12 : querySkip}
					arrayLength={allLaptopsCount}
					onChangePage={(page) => onChangePage(page)}
				/>
			</MDBContainer>
		</section>
	);
};

export default Laptops;
