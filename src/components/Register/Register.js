import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import "./Register.css";

export const Register = () => {
	let history = useHistory();

	const [success, setSuccess] = React.useState("");
	const [errors, setErrors] = React.useState({});
	const [form, setForm] = React.useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const ADD_USER = gql`
		mutation register(
			$username: String!
			$email: String!
			$password: String!
			$confirmPassword: String!
		) {
			register(
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			) {
				email
				username
				createdAt
				token
			}
		}
	`;

	const [registerUser] = useMutation(ADD_USER, {
		variables: form,
		onCompleted() {
			setSuccess("User created!");
			setErrors("");
			history.push("/login");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
	});

	const onChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		setForm({ ...form, [name]: value });
	};

	const onSubmit = event => {
		event.preventDefault();
		registerUser();
	};

	return (
		<div>
			<form className="form" onSubmit={onSubmit}>
				<h2>Register</h2>
				<div className="field">
					<label>Username</label>
					<input
						className={errors.username && "error"}
						name="username"
						id="username"
						type="text"
						value={form.username}
						onChange={event => onChange(event)}
					/>
				</div>
				<div className="field">
					<label>Email</label>
					<input
						className={errors.email && "error"}
						name="email"
						id="email"
						value={form.email}
						type="text"
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
				<div className="field">
					<label>Confirm Password</label>
					<input
						className={errors.confirmPassword && "error"}
						name="confirmPassword"
						id="confirmPassword"
						type="password"
						value={form.confirmPassword}
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

				{success && <p>{success}</p>}

				<button type="submit" className="button">
					Register
				</button>

				<div className="field">
					<Link to="/login">
						Already have an account ? Login here
					</Link>
				</div>
			</form>
		</div>
	);
};
