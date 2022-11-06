import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function Headers({ location, connected, onConnect }) {

    const navigate = useNavigate();

    const disconnect = async function () {
        localStorage.removeItem("tokens");
        onConnect("false");
        navigate("/login/");
    }

    return <nav>
        <h1>GROUPOMANIA</h1>
        {
            (connected === "true") ?
                <button onClick={disconnect} > Se déconnecter</button> :
                (
                    location === "login" ?
                        <button><NavLink to="signup"> SignUp </NavLink></button> :
                        <button><NavLink to="login"> Login </NavLink></button>
                )
        }
    </nav>
}

Headers.propTypes = {
    location: PropTypes.string,
    connected: PropTypes.string,
    onConnect: PropTypes.func.isRequired
}
