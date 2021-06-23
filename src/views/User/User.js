import * as React from "react";
import "./User.css";

import { gql, useQuery, useMutation } from "@apollo/client";

export const User = () => {
	const [quoteId, setQuoteId] = React.useState("");

	const GET_USER_QUOTES = gql`
		query {
			quotesByUser {
				id
				text
				author {
					name
				}
			}
		}
	`;

	const {
		data: { quotesByUser } = {},
		loading,
		error,
	} = useQuery(GET_USER_QUOTES);

	const DELETE_QUOTE_MUTATION = gql`
		mutation deleteQuote($quoteId: ID!) {
			deleteQuote(quoteId: $quoteId)
		}
	`;

	const [deleteQuote] = useMutation(DELETE_QUOTE_MUTATION, {
		refetchQueries: [{ query: GET_USER_QUOTES }],
		onError(err) {
			console.log(err);
		},
		variables: { quoteId },
	});

	const handleDeleteQuote = async id => {
		await setQuoteId(id);
		deleteQuote();
	};

	if (loading) return <h1>Loading...</h1>;
	if (error) return <p>Error ocurred...</p>;

	if (quotesByUser.length !== 0) {
		return (
			<div className="user-page">
				{quotesByUser.map(quote => (
					<blockquote key={quote.id}>
						<p className="author">
							"{quote.text}"
							<br />
							<em>{quote.author.name}</em>
						</p>
						<button
							onClick={() =>
								// deleteQuote({ variables: { quoteId: quote.id } })
								handleDeleteQuote(quote.id)
							}
						>
							<span className="material-icons-outlined">
								cancel
							</span>
						</button>
					</blockquote>
				))}
			</div>
		);
	}

	return (
		<div className="user-page no-result">
			<p>No quote created yet!</p>
		</div>
	);
};
