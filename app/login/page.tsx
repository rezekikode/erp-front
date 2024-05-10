'use client'

import { useState } from 'react';
import { redirect } from 'next/navigation'

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            setError('Failed to log in');
            return;
        }

        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        redirect('/user');
    };

    return (
        <form onSubmit={handleLogin}>
            <div>{error}</div>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}