import React from "react";
import { apiFetch } from "../utils/api";
import { Navigate, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

export async function loaderAuth() {

    let user = {};
    let users = [];

    await apiFetch("/auth/")
        .then(res => user.connected = res)
        .catch(() => user.connected = "false");

    if (user.connected === "true") {
        await apiFetch("/post/me")
            .then(res => user = { ...user, ...res });
        await apiFetch("/auth/mail")
            .then(res => { users = res });
    }



    return { user, users };
}

export function Auth({ children }) {

    const { user } = useLoaderData();

    if (user.connected === "false") {
        return <Navigate to="/login/" replace />;
    }
    return children;
}

Auth.propTypes = {
    children: PropTypes.node
}