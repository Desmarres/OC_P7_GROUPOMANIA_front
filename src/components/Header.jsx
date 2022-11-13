import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LoginSVG, LogoutSVG, SignupSVG } from "./Icon";

export function Headers({ location, connected, onConnect }) {

    const navigate = useNavigate();

    const disconnect = async function () {
        localStorage.removeItem("tokens");
        onConnect("false");
        navigate("/login/");
    }

    return <header className="header" ><nav><h1>GROUPOMANIA</h1>
        {
            (connected === "true") ?
                <button className="btn btn_logout" onClick={disconnect} ><LogoutSVG /></button> :
                (
                    location === "login" ?
                        <button className="btn btn_signup"><NavLink to="signup"><SignupSVG /></NavLink></button> :
                        <button className="btn btn_login"><NavLink to="login"><LoginSVG /></NavLink></button>
                )
        }
    </nav>
    </header>
}

Headers.propTypes = {
    location: PropTypes.string,
    connected: PropTypes.string,
    onConnect: PropTypes.func.isRequired
}
