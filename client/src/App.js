import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { autoLogin } from "./redux/actions/auth";
import { getItems } from "./redux/actions/cart";
import { Auth, Laptops, Home, Cart, AddLaptop, Profile } from "./pages";
import Navbar from "./components/Navbar/Navbar";
import LaptopDetails from "./pages/LatptopDetails/LaptopDetails";

const App = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.token);

	useEffect(() => {
		dispatch(autoLogin());
		dispatch(getItems());
	}, [dispatch]);

	if (isAuthenticated) {
		return (
			<Router>
				{isAuthenticated && <Navbar />}
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/laptops" exact component={Laptops} />
					<Route path="/laptops/:id" component={LaptopDetails} />
					<Route path="/cart" component={Cart} />
					<Route path="/add" component={AddLaptop} />
					<Route path="/profile" component={Profile} />
					<Redirect to="/" />
				</Switch>
			</Router>
		);
	}

	return (
		<Router>
			<Switch>
				<Route path="/auth" component={Auth} />
				<Redirect to="/auth" />
			</Switch>
		</Router>
	);
};

export default App;
