import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users } from 'lucide-react';
import clsx from 'clsx';

export const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center h-16">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => clsx(
                        "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                        isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Home</span>
                </NavLink>

                <NavLink
                    to="/"
                    className={({ isActive }) => clsx(
                        "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                        isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                    )}
                >
                    <Users className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Switch User</span>
                </NavLink>
            </div>
        </nav>
    );
};
