import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { BottomNav } from './BottomNav';

export const Layout: React.FC = () => {
    const { currentUser } = useAppStore();
    const location = useLocation();

    // Allow access to create-profile even without a user
    if (!currentUser && location.pathname !== '/' && location.pathname !== '/create-profile') {
        return null;
    }

    const showBottomNav = currentUser && location.pathname === '/dashboard';

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 pb-24">
                <Outlet />
            </main>

            {showBottomNav && <BottomNav />}
        </div>
    );
};
