import React from "react";
import App from "./views/App/App";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { UserProvider } from "./utils/AuthContext";

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/",
});

const authLink = setContext(async (_, { headers }) => {
	const user = JSON.parse(localStorage.getItem("user"));

	if (user !== null) {
		const token = user.token;
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	}
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				quotesByUser: {
					keyArgs: false,
					merge(incoming) {
						return incoming;
					},
				},
			},
		},
	}),
});

export default (
	<UserProvider>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</UserProvider>
);
