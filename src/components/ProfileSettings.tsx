import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { User, Settings, LogOut, ChevronRight, Edit2 } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
    const { currentUser, setCurrentUser } = useAppStore();
    const navigate = useNavigate();

    if (!currentUser) return null;

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/');
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                <Settings className="w-6 h-6 text-slate-400" />
            </header>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                    <User className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>
                <p className="text-slate-500 text-sm mb-6">
                    {currentUser.age} years • {currentUser.gender}
                </p>

                <div className="grid grid-cols-3 gap-4 w-full mb-6">
                    <div className="bg-slate-50 p-3 rounded-xl">
                        <div className="text-xs text-slate-400 uppercase font-bold mb-1">Weight</div>
                        <div className="font-bold text-slate-900">{currentUser.weight} kg</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                        <div className="text-xs text-slate-400 uppercase font-bold mb-1">Height</div>
                        <div className="font-bold text-slate-900">{currentUser.height} cm</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                        <div className="text-xs text-slate-400 uppercase font-bold mb-1">Activity</div>
                        <div className="font-bold text-slate-900 capitalize">{currentUser.activityLevel}</div>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/edit-profile')}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-semibold active:scale-[0.98] transition-all"
                >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                </button>
            </div>

            {/* Settings Options */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                >
                    <div className="flex items-center gap-3 text-slate-700">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                            <LogOut className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Switch User</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
            </div>
        </div>
    );
};
