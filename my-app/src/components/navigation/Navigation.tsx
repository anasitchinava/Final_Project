'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navigation = () => {
    const router = useRouter();
    const path = usePathname();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    const isLoginPage = path === '/login';

    if (isLoginPage) {
        return null;
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('searchTerm');
        router.push('/login');
    };

    return (
        <nav className="flex justify-between items-center bg-cyan-950 text-white p-4">
            <p>Hello, {username}!</p>
            <div>
                <Link href="/home" className="mr-4">Home</Link>
                <Link href="/favourites" className="mr-4">Favourites</Link>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navigation;