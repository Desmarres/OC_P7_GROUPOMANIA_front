import React from "react";
import { apiFetch } from "../utils/api";
import { Navigate, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

export async function loaderAuth() {

    let connected = "false";

    await apiFetch("/auth/")
        .then(res => connected = res)
        .catch(() => connected = "false");

    return connected;
}

export function Auth({ children }) {

    const connected = useLoaderData();

    if (connected === "false") {
        return <Navigate to="/login/" replace />;
    }
    return children;
}

Auth.propTypes = {
    children: PropTypes.node
}