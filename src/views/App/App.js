import * as React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";
import { Header } from "../../components/Header/Header";
import { Quotes } from "../Quotes/Quotes";
import { AddQuote } from "../../components/AddQuote/AddQuote";
import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";
import { User } from "../User/User";

import { UserContext } from "../../utils/AuthContext";

const App = () => {
	const { user } = React.useContext(UserContext);

	return (
		<Router>
			<div className="app">
				<Header />

				<div className="container">
					<Switch>
						<Route exact path="/">
							<Quotes />
						</Route>
						{!user.auth && (
							<Route exact path="/login">
								<Login />
							</Route>
						)}
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/user">
							<User />
						</Route>
						<Route exact path="/add">
							{user.auth ? (
								<AddQuote />
							) : (
								<Redirect to="/login" />
							)}
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
