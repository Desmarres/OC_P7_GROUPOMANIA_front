import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Headers } from "./components/Header";
import { apiFetch } from "./utils/api";


export function Main() {

    const [connected, setConnected] = useState("false");

    let location = useLocation().pathname.split("/")[1];

    useEffect(function () {
        if (localStorage.tokens) {
            apiFetch("/auth/")
                .then(setConnected)
                .catch(() => setConnected("false"))
        }
    }, [location])

    return (<>
        <Headers location={location} connected={connected} onConnect={setConnected} />
        <Outlet />
    </>
    )
};