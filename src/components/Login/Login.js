import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../../utils/AuthContext";
import "./Login.css";

export const Login = () => {
	let history = useHistory();
	const { authLogin } = React.useContext(UserContext);

	const [form, setForm] = React.useState({
		username: "",
		password: "",
	});

	const [errors, setErrors] = React.useState({});

	const onChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		setForm({ ...form, [name]: value });
	};

	const GET_LOGIN_MUTATION = gql`
		mutation login($username: String!, $password: String!) {
			login(username: $username, password: $password) {
				id
				username
				token
			}
		}
	`;
	const [loginUser] = useMutation(GET_LOGIN_MUTATION, {
		variables: form,
		update(proxy, { data }) {
			const id = data.login.id;
			const token = data.login.token;
			const username = data.login.username;
			const user = { id, token, username };
			return localStorage.setItem("user", JSON.stringify(user));
		},
		onCompleted({ login }) {
			const id = login.id;
			const token = login.token;
			const username = login.username;
			if (token && username) {
				authLogin(id, username, token);
				history.push("/");
			}
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	const onSubmit = event => {
		event.preventDefault();
		loginUser();
	};

	return (
		<div>
			<form className="form" onSubmit={onSubmit}>
				<h2>Login</h2>
				<div className="field">
					<label>Username</label>
					<input
						autoComplete="off"
						className={errors.username && "error"}
						name="username"
						id="username"
						type="text"
						value={form.username}
						onChange={event => onChange(event)}
					/>
				</div>
				<div className="field">
					<label>Password</label>
					<input
						className={errors.password && "error"}
						name="password"
						id="password"
						type="password"
						value={form.password}
						onChange={event => onChange(event)}
					/>
				</div>

				{Object.values(errors).map((error, idx) => {
					return (
						<p key={idx} className="text error">
							{error}
						</p>
					);
				})}

				<button type="submit" className="button">
					Login
				</button>

				<div className="field">
					<Link to="/register">
						Not have an account ? Register here
					</Link>
				</div>
			</form>
		</div>
	);
};
