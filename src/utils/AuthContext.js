import * as React from "react";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
	const [user, setUser] = React.useState({
		id: null,
		username: "",
		auth: false,
		token: "",
	});

	React.useEffect(() => {
		const userObject = JSON.parse(localStorage.getItem("user")) || "";
		setUser(user => ({
			id: userObject.id || null,
			username: userObject.username || "",
			auth: userObject.token ? true : false || false,
			token: userObject.token || "",
		}));
	}, []);

	// Login updates the user data with a name parameter
	const authLogin = (id, username, token) => {
		setUser(user => ({
			id: id,
			username: username,
			auth: token ? true : false,
			token: token,
		}));
	};

	// Logout updates the user data to default
	const authLogout = () => {
		setUser(user => ({
			id: null,
			username: "",
			auth: false,
			token: "",
		}));
		localStorage.removeItem("user");
	};

	const value = { user, authLogin, authLogout };

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};
