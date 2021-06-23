import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./AddQuote.css";

dayjs.extend(relativeTime);

export const AddQuote = () => {
	const [errors, setErrors] = React.useState({});
	const [newQuote, setNewQuote] = React.useState({
		text: "",
		author: "",
	});

	const ADD_QUOTE = gql`
		mutation createQuote($text: String!, $author: String!) {
			createQuote(text: $text, author: $author) {
				text
				author {
					name
				}
			}
		}
	`;

	const [addQuote, { data, loading }] = useMutation(ADD_QUOTE, {
		update(cache, { data: { addQuote } }) {
			cache.modify({
				fields: {
					quotes(existingQuotes = []) {
						const newQuoteRef = cache.writeQuery({
							query: gql`
								query WriteQuote {
									quote {
										text
										author {
											name
										}
										createdAt
									}
								}
							`,
							data: addQuote,
						});
						return [...existingQuotes, newQuoteRef];
					},
					quotesByUser(existingQuotes = []) {
						const newQuoteRef = cache.writeQuery({
							query: gql`
								query WriteQuote {
									quoteByUser {
										text
										author {
											name
										}
									}
								}
							`,
							data: addQuote,
						});
						return [...existingQuotes, newQuoteRef];
					},
				},
			});
		},
		onCompleted() {
			setErrors("");
		},
		onError(err) {
			let errors = err.graphQLErrors[0].extensions.exception.errors;
			setErrors(errors);
		},
		variables: newQuote,
	});

	const onChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		setNewQuote({ ...newQuote, [name]: value });
	};

	const onSubmit = event => {
		event.preventDefault();
		addQuote();
	};
	return (
		<form className="form" onSubmit={onSubmit}>
			<h2>Add a New Quote</h2>
			<div className="field">
				<label htmlFor="text">Quote:</label>
				<input
					autoComplete="off"
					name="text"
					id="text"
					value={newQuote.text}
					className={errors.text && "error"}
					onChange={event => onChange(event)}
				/>
			</div>
			<div className="field">
				<label htmlFor="author">Author:</label>
				<input
					autoComplete="off"
					name="author"
					id="author"
					value={newQuote.author}
					className={errors.author && "error"}
					onChange={event => onChange(event)}
				/>
			</div>

			{errors &&
				Object.values(errors).map((error, idx) => {
					return (
						<p key={idx} className="text error">
							{error}
						</p>
					);
				})}

			<div className="field">
				<button className="button">Submit Your Quote</button>
			</div>
			{loading && <p>Adding quote...</p>}
			{data && (
				<div className="created-quote">
					<h3>Congrats, your quote was added!</h3>
					<p className="created-quote__text">
						{data.createQuote.text} <br /> -
						{data.createQuote.author.name}
					</p>
					<p>{dayjs(data.createQuote.createdAt).fromNow()}</p>
					<Link to="/">Go to the home page to view all quotes.</Link>
				</div>
			)}
		</form>
	);
};
