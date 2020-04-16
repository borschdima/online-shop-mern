import React, { useState, useCallback } from "react";
import { Drawer as SideNav, Slider, List, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox } from "../../ui";
import { MDBIcon } from "mdbreact";
import { toggleBrand, toggleCore, filterApply, filterReset } from "../../redux/actions/filter";
import { laptopChangeQuerySkip } from "../../redux/actions/laptop";

import "./Drawer.scss";

const Drawer = () => {
	const dispatch = useDispatch();

	//Global State (Redux)
	const { allBrands, filterBrands, resultBrands, allCores, filterCores, resultCores, priceRange } = useSelector((state) => state.filter);

	// Local State
	const [open, setOpen] = useState(false);
	const [priceValue, setPriceValue] = useState([5000, 300000]);

	// Open/Close Drawer menu
	const toggleDrawer = () => {
		setOpen(!open);
	};

	// Apply drawer filter and close Drawer
	const applyFilter = () => {
		dispatch(laptopChangeQuerySkip(0));
		dispatch(filterApply(priceValue));
		toggleDrawer();
	};

	// Reset drawer filter and close Drawer
	const resetFilter = () => {
		dispatch(laptopChangeQuerySkip(0));
		dispatch(filterReset());
		setPriceValue([5000, 300000]);
		toggleDrawer();
	};

	// Toggle Brand Checkbox and save it to temperary state field
	const onToggleBrand = useCallback((brandName) => dispatch(toggleBrand(filterBrands, brandName)), [dispatch, filterBrands]);

	// Toggle Core Checkbox and save it to temperary state field
	const onToggleCore = useCallback((coreName) => dispatch(toggleCore(filterCores, coreName)), [dispatch, filterCores]);

	// Create Brand Checkboxes List from State
	const generateBrandCheckboxes = useCallback(() => {
		return allBrands.map((text, index) => {
			const checked = !!filterBrands.find((brand) => brand === text);

			return (
				<ListItem className="drawer__list-item" button key={text + index}>
					<Checkbox label={text} onToggle={(brandName) => onToggleBrand(brandName)} active={checked} />
				</ListItem>
			);
		});
	}, [allBrands, filterBrands, onToggleBrand]);

	// Create Core Checkboxes List from State
	const generateCoreCheckboxes = useCallback(() => {
		return allCores.map((text, index) => {
			const checked = !!filterCores.find((core) => core === text);

			return (
				<ListItem className="drawer__list-item" button key={text + index}>
					<Checkbox label={text} lowercase onToggle={(coreName) => onToggleCore(coreName)} active={checked} />
				</ListItem>
			);
		});
	}, [allCores, filterCores, onToggleCore]);

	// Create Drawer Filter Groups
	const list = () => (
		<div role="presentation" className="drawer__list-group p-3">
			<h3 className="d-flex justify-content-between align-items-center">
				<span>Фильтры</span>
				{priceRange.length || resultBrands.length || resultCores.length ? (
					<span className="drawer__filter-reset" onClick={resetFilter}>
						Сбросить
					</span>
				) : null}
			</h3>

			{/* // Brand section */}
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
					<List className="drawer__list">{generateBrandCheckboxes()}</List>
				</ExpansionPanelDetails>
			</ExpansionPanel>

			{/* // Price section */}
			<ExpansionPanel className="expansion" TransitionProps={{ unmountOnExit: true }}>
				<ExpansionPanelSummary
					className="expansion__summary"
					expandIcon={<MDBIcon icon="angle-down" />}
					aria-controls="panel1a-content"
					id="price"
				>
					Цена:
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="expansion__details">
					<div className="drawer__price-labels d-flex align-items-center justify-content-center">
						<input className="drawer__price-label" type="text" value={priceValue[0]} readOnly />
						<span className="font-weight-bold">-</span>
						<input className="drawer__price-label" type="text" value={priceValue[1]} readOnly />
					</div>

					<Slider
						className="myslider"
						value={priceValue}
						onChange={(e, value) => setPriceValue(value)}
						valueLabelDisplay="off"
						aria-labelledby="range-slider"
						min={5000}
						max={300000}
					/>
				</ExpansionPanelDetails>
			</ExpansionPanel>

			{/* // Cores section  */}
			<ExpansionPanel className="expansion" TransitionProps={{ unmountOnExit: true }}>
				<ExpansionPanelSummary
					className="expansion__summary"
					expandIcon={<MDBIcon icon="angle-down" />}
					aria-controls="panel1a-content"
					id="cores"
				>
					Ядра:
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="expansion__details">
					<List className="drawer__list">{generateCoreCheckboxes()}</List>
				</ExpansionPanelDetails>
			</ExpansionPanel>

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
