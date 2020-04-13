import React, { useState } from "react";
import { Drawer as SideNav } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { Button, Checkbox } from "../../ui";

import "./Drawer.scss";

const Drawer = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const list = () => (
		<div role="presentation" className="drawer__list p-3">
			<h3>Фильтры</h3>
			<Divider />
			<h5>Производитель:</h5>
			<List>
				{["Asus", "Apple", "Lenovo", "Acer"].map((text, index) => (
					<ListItem className="drawer__list-item" button key={text}>
						<Checkbox label={text} />
					</ListItem>
				))}
			</List>
			<Divider />
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
