import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { LoginForm, SignupForm } from "../components/ConnectForm";

export function Connect({ onConnect }) {

    const [page, setPage] = useState("login");
    const [message, setMessage] = useState(null);

    useEffect(function () {
        if (message !== null) {
            setPage("login");
        }
    }, [message])

    let content = null;
    if (page === "login") {
        content = <LoginForm onRequest={onConnect} message={message} />
    } else if (page === "signup") {
        content = <SignupForm onRequest={setMessage} />
    }

    return (<>
        <NavBar currentPage={page} onClick={setPage} />
        {content}
    </>
    )
}

Connect.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function NavBar({ currentPage, onClick }) {

    const navDisplay = function (page) {
        let display = 'block'
        if (page === currentPage) {
            display = 'none'
        }
        return display;
    }

    return <nav>
        <div>Groupomania</div>
        <ul>
            <li style={{ display: navDisplay('signup') }}>
                <a href="#signup" onClick={() => onClick('signup')}>SignUp</a>
            </li>
            <li style={{ display: navDisplay('login') }}>
                <a href="#login" onClick={() => onClick('login')}>Login</a>
            </li>
        </ul>
    </nav>
}
