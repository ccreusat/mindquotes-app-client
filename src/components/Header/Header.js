import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../utils/AuthContext";
import "./Header.css";
import logo from "./mindquotes.svg";

export const Header = () => {
	let history = useHistory();

	const { user, authLogout } = React.useContext(UserContext);

	const handleSignOut = () => {
		authLogout();
		history.push("/");
	};

	return (
		<header className="header">
			<Link to="/" className="logo">
				<img src={logo} alt="mind quotes" />
			</Link>
			<nav className="nav left">
				<Link to="/" className="link">
					Home
				</Link>
				{user.auth && (
					<Link to="/add" className="link">
						Add a quote
					</Link>
				)}
			</nav>
			<nav className="nav right">
				{user.auth ? (
					<div>
						<Link to="/user" className="link">
							{user.username.toUpperCase()}
						</Link>
						<button
							onClick={() => handleSignOut()}
							type="button"
							className="button small"
						>
							Sign Out
						</button>
					</div>
				) : (
					<Link to="/login" className="link">
						Login
					</Link>
				)}
			</nav>
		</header>
	);
};
