'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const path = usePathname();
    const isLoginPage = path === '/login';

    if (isLoginPage) {
        return null;
    }

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-cyan-950 text-white p-4">
            <div className="text-sm text-gray-500 text-center mt-2">
                © 2024 All Rights Reserved.
            </div>
        </footer>
    );
};

export default Navigation;