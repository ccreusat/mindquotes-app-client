import * as React from "react";
import { BrowserRouter as Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated === true ? (
					<Component />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { location },
						}}
					/>
				)
			}
		/>
	);
};
