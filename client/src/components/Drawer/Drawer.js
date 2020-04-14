import React, { useState } from "react";
import { Drawer as SideNav, List, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox } from "../../ui";
import { MDBIcon } from "mdbreact";

import "./Drawer.scss";

const Drawer = () => {
	const dispatch = useDispatch();

	// Local State
	const [open, setOpen] = useState(false);

	//Global State (Redux)
	const { allBrands } = useSelector((state) => state.filter);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const onToggleBrand = (brandName) => console.log(brandName);

	const list = () => (
		<div role="presentation" className="drawer__list-group p-3">
			<h3>Фильтры</h3>

			<ExpansionPanel className="expansion">
				<ExpansionPanelSummary
					className="expansion__summary"
					expandIcon={<MDBIcon icon="angle-down" />}
					aria-controls="panel1a-content"
					id="brand"
				>
					Производитель:
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="expansion__details">
					<List className="drawer__list">
						{allBrands.map((text, index) => (
							<ListItem className="drawer__list-item" button key={text + index}>
								<Checkbox label={text} onToggle={(brandName) => onToggleBrand(brandName)} />
							</ListItem>
						))}
					</List>
				</ExpansionPanelDetails>
			</ExpansionPanel>

			<Button type="submit" classes="center mt-4" labelShow clickHandler={toggleDrawer} label="Применить" xs />
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
