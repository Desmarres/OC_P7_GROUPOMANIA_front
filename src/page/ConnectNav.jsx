import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { LoginForm, SignupForm } from "../components/ConnectFrom";

export function ConnectNav({ onConnect }) {

    const [page, setPage] = useState('login');
    const [message, setMessage] = useState(null);

    useEffect(function () {
        if (message !== null) {
            setPage('login');
        }
    }, [message])

    let content = null;
    if (page === 'login') {
        content = <LoginForm onConnect={onConnect} message={message} />
    } else if (page === 'signup') {
        content = <SignupForm onRegistered={setMessage} />
    }

    return (<>
        <NavBar currentPage={page} onClick={setPage} />
        {content}
    </>
    )
}

ConnectNav.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function NavBar({ currentPage, onClick }) {
    return <nav>
        <div>Groupomania</div>
        <ul>
            <li>
                <a href="#signup" onClick={() => onClick('signup')}>SignUp</a>
            </li>
            <li>
                <a href="#login" onClick={() => onClick('login')}>Login</a>
            </li>
        </ul>
    </nav>
}
