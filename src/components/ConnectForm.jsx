import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiErrors, apiFetch } from "../utils/api";

export function LoginForm() {
    return <ConnectForm action="Login" />
}

export function SignupForm() {
    return <ConnectForm action="Sign Up" />
}

function ConnectForm({ action }) {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async function (e) {
        setError(null);
        setLoading(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const formData = {
            email: email,
            password: password
        };
        const method = {
            method: "POST",
            body: JSON.stringify(formData)
        }
        try {
            if (action === "Login") {
                const token = await apiFetch("/auth/login", method);
                localStorage.setItem("tokens", JSON.stringify(token.token));
                navigate("/site/");
            } else if (action === "Sign Up") {
                await apiFetch("/auth/signup", method);
                setLoading(false);
                navigate("/login/");
            }

        } catch (error) {
            if (error instanceof ApiErrors) {
                let errorList = "";
                error.errors.forEach(e => errorList += " " + (e.msg));
                setError(errorList);
                setLoading(false);
            }
        }
    }

    return <form className="form__connection" onSubmit={handleSubmit} >
        <h2 className="form__connection__title"> {action} </h2>
        {error && <Alert>{error}</Alert>}
        <div className="form__connection__group">
            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" id="email" required />
        </div>
        <div className="form__connection__group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
        </div>
        <button className="btn form__connection__btn" disabled={loading} type="submit" > {action} </button>
    </form>
}


function Alert({ children }) {
    return <div>{children}</div>
}

ConnectForm.propTypes = {
    action: PropTypes.string
}