import React, { useState } from 'react'
import { useEffect } from 'react'
import { ConnectNav } from './page/ConnectNav';
import { Post } from './page/Post';
import { apiFetch } from './utils/api';

export default function App() {
    const [connected, setConnected] = useState('false');

    useEffect(function () {
        if (localStorage.tokens) {
            apiFetch('/auth/')
                .then(setConnected)
                .catch(() => setConnected('false'))
        }
    }, [])

    return (
        (connected === 'true') ? <Post /> : <ConnectNav onConnect={setConnected} />
    )
};