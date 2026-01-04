import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { UserPlus, User as UserIcon, ChevronRight, Utensils } from 'lucide-react';

export const UserSelector: React.FC = () => {
    const { users, setCurrentUser } = useAppStore();
    const navigate = useNavigate();

    const handleSelectUser = (id: string) => {
        setCurrentUser(id);
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col min-h-[80vh] justify-center">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4 text-emerald-600">
                    <Utensils className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">NutriTrack</h1>
                <p className="text-slate-500">Your personal health companion</p>
            </div>

            <div className="space-y-4 mb-8">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-1">Select Profile</h2>

                {users.length === 0 ? (
                    <div className="text-center py-8 bg-slate-100 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 text-sm">No profiles found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => handleSelectUser(user.id)}
                                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100">
                                        <UserIcon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-slate-900">{user.name}</h3>
                                        <p className="text-xs text-slate-500">{user.age} yrs • {user.weight} kg</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={() => navigate('/create-profile')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-lg shadow-slate-200 active:scale-[0.98] transition-all mt-auto"
            >
                <UserPlus className="w-5 h-5" />
                Create New Profile
            </button>
        </div>
    );
};
