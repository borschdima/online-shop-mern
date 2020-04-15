import React, { useState, useCallback } from "react";
import { Drawer as SideNav, List, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox } from "../../ui";
import { MDBIcon } from "mdbreact";
import { toggleBrand, filterApply } from "../../redux/actions/filter";
import { laptopChangeQuerySkip } from "../../redux/actions/laptop";

import "./Drawer.scss";

const Drawer = () => {
	const dispatch = useDispatch();

	//Global State (Redux)
	const { allBrands, filterBrands } = useSelector((state) => state.filter);

	// Local State
	const [open, setOpen] = useState(false);
	// const [priceValue, setPriceValue] = useState([20, 37]);

	// Open/Close Drawer menu
	const toggleDrawer = () => {
		setOpen(!open);
	};

	// Apply drawer filter and close Drawer
	const applyFilter = () => {
		dispatch(laptopChangeQuerySkip(0));
		dispatch(filterApply());
		toggleDrawer();
	};

	// Toggle Checkbox and save it to temperary state field
	const onToggleBrand = useCallback((brandName) => dispatch(toggleBrand(filterBrands, brandName)), [dispatch, filterBrands]);

	// Create Checkboxes List from State
	const generateCheckboxes = useCallback(() => {
		return allBrands.map((text, index) => {
			const checked = !!filterBrands.find((brand) => brand === text);

			return (
				<ListItem className="drawer__list-item" button key={text + index}>
					<Checkbox label={text} onToggle={(brandName) => onToggleBrand(brandName)} active={checked} />
				</ListItem>
			);
		});
	}, [allBrands, filterBrands, onToggleBrand]);

	// Create Drawer Filter Groups
	const list = () => (
		<div role="presentation" className="drawer__list-group p-3">
			<h3>Фильтры</h3>

			<ExpansionPanel className="expansion" defaultExpanded TransitionProps={{ unmountOnExit: true }}>
				<ExpansionPanelSummary
					className="expansion__summary"
					expandIcon={<MDBIcon icon="angle-down" />}
					aria-controls="panel1a-content"
					id="brand"
				>
					Производитель:
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="expansion__details">
					<List className="drawer__list">{generateCheckboxes()}</List>
				</ExpansionPanelDetails>
			</ExpansionPanel>

			{/* <ExpansionPanel className="expansion" TransitionProps={{ unmountOnExit: true }}>
				<ExpansionPanelSummary
					className="expansion__summary"
					expandIcon={<MDBIcon icon="angle-down" />}
					aria-controls="panel1a-content"
					id="price"
				>
					Цена:
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="expansion__details">
					<Slider
						className="myslider"
						value={priceValue}
						onChange={(e, value) => setPriceValue(value)}
						valueLabelDisplay="off"
						aria-labelledby="range-slider"
					/>
				</ExpansionPanelDetails>
			</ExpansionPanel> */}

			<Button type="submit" classes="center mt-4" labelShow clickHandler={applyFilter} label="Применить" xs />
		</div>
	);

	return (
		<>
			<Button type="button" classes="left" clickHandler={toggleDrawer} label="Фильтры" icon="sliders-h" xs />
			<SideNav className="drawer" anchor="left" open={open} onClose={toggleDrawer}>
				{list()}
			</SideNav>
		</>
	);
};

export default Drawer;
