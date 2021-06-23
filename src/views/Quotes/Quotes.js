import * as React from "react";

import { gql, useQuery } from "@apollo/client";
import { Quote } from "../../components/Quote/Quote";

export const Quotes = () => {
	const GET_QUOTES = gql`
		query {
			quotes {
				text
				author {
					name
				}
				createdAt
			}
		}
	`;

	const { data: { quotes } = {}, loading, error } = useQuery(GET_QUOTES);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <p>Error...</p>;

	return (
		<div className="quote-container">
			{quotes &&
				quotes.map((quote, index) => (
					<Quote key={index} quote={quote} />
				))}
		</div>
	);
};
