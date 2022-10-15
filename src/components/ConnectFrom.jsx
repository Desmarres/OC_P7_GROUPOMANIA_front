import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { ApiErrors, apiFetch } from "../utils/api";


export function LoginForm({ onConnect, message }) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async function (e) {
        setError(null);
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const loginData = {
            email: email,
            password: password
        };
        try {
            const token = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify(loginData)
            });

            localStorage.setItem('tokens', JSON.stringify(token.token));
            onConnect('true');
        } catch (error) {
            if (error instanceof ApiErrors) {
                let errorList = "";
                error.errors.forEach(e => errorList += " " + (e.msg));
                setError(errorList);
                setLoading(false);
            }
        }
    }

    return <ConnectForm action="Login" onSubmit={handleSubmit} error={error} loading={loading} message={message} />
}

export function SignupForm({ onRegistered }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async function (e) {
        setError(null);
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const signUpData = {
            email: email,
            password: password
        };
        try {
            const message = await apiFetch("/auth/signup", {
                method: "POST",
                body: JSON.stringify(signUpData)
            });
            setLoading(false);
            onRegistered(JSON.stringify(message.message));

        } catch (error) {
            if (error instanceof ApiErrors) {
                let errorList = "";
                error.errors.forEach(e => errorList += " " + (e.msg));
                setError(errorList);
                setLoading(false);
            }
        }
    }
    return <ConnectForm action="Sign Up" onSubmit={handleSubmit} error={error} loading={loading} />
}



function ConnectForm({ action, onSubmit, error, loading, message }) {
    return <form onSubmit={onSubmit}>
        <h2> {action} </h2>
        {error && <Alert>{error}</Alert>}
        {message && <Alert>{message}</Alert>}
        <div>
            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" id="email" required />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
        </div>
        <button disabled={loading} type="submit" > {action} </button>
    </form>
}

LoginForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function Alert({ children }) {
    return <div>{children}</div>
}