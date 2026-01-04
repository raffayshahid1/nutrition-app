import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { ALLERGIES_LIST, DISEASES_LIST } from '../lib/data';
import type { Allergy, Disease, SubscriptionType } from '../types';
import { ChevronLeft, Save, Check } from 'lucide-react';
import clsx from 'clsx';



export const ProfileForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addUser, updateUser, currentUser } = useAppStore();

    const isEditing = location.pathname === '/edit-profile' && currentUser;

    const [formData, setFormData] = useState({
        name: isEditing ? currentUser.name : '',
        age: isEditing ? String(currentUser.age) : '',
        weight: isEditing ? String(currentUser.weight) : '',
        height: isEditing ? String(currentUser.height) : '',
        gender: isEditing ? currentUser.gender : 'male',
        activityLevel: isEditing ? currentUser.activityLevel : 'moderate',
        allergies: isEditing ? currentUser.allergies : [] as Allergy[],
        diseases: isEditing ? currentUser.diseases : [] as Disease[],
        subscription: isEditing ? (currentUser.subscription || 'weekly') : 'weekly' as SubscriptionType,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userData = {
            name: formData.name,
            age: Number(formData.age),
            weight: Number(formData.weight),
            height: Number(formData.height),
            gender: formData.gender as any,
            activityLevel: formData.activityLevel as any,
            allergies: formData.allergies,
            diseases: formData.diseases,
            subscription: formData.subscription,
        };

        if (isEditing && currentUser) {
            updateUser(currentUser.id, userData);
            navigate('/settings');
        } else {
            addUser(userData);
            navigate('/dashboard');
        }
    };

    const toggleAllergy = (allergy: Allergy) => {
        setFormData(prev => ({
            ...prev,
            allergies: prev.allergies.includes(allergy)
                ? prev.allergies.filter(a => a !== allergy)
                : [...prev.allergies, allergy]
        }));
    };

    const toggleDisease = (disease: Disease) => {
        setFormData(prev => ({
            ...prev,
            diseases: prev.diseases.includes(disease)
                ? prev.diseases.filter(d => d !== disease)
                : [...prev.diseases, disease]
        }));
    };

    return (
        <div className="pb-8">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-slate-900">{isEditing ? 'Edit Profile' : 'New Profile'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Personal Details</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1.5">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                placeholder="e.g. Ali Khan"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Age</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Gender</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium appearance-none"
                                    value={formData.gender}
                                    onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Weight (kg)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                    value={formData.weight}
                                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Height (cm)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                    value={formData.height}
                                    onChange={e => setFormData({ ...formData, height: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-1.5">Activity Level</label>
                            <select
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium appearance-none"
                                value={formData.activityLevel}
                                onChange={e => setFormData({ ...formData, activityLevel: e.target.value as any })}
                            >
                                <option value="sedentary">Sedentary (Little to no exercise)</option>
                                <option value="light">Lightly Active (1-3 days/week)</option>
                                <option value="moderate">Moderately Active (3-5 days/week)</option>
                                <option value="active">Active (6-7 days/week)</option>
                                <option value="very_active">Very Active (Physical job/training)</option>
                            </select>
                        </div>

                        {/* Subscription Plan */}
                        <div>
                            <label className="block text-sm font-medium text-slate-500 mb-3">Choose Your Plan</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, subscription: 'weekly' })}
                                    className={clsx(
                                        "p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                                        formData.subscription === 'weekly'
                                            ? "border-emerald-600 bg-emerald-50"
                                            : "border-slate-200 bg-white hover:border-emerald-200"
                                    )}
                                >
                                    <div className="font-bold text-slate-900 mb-1">Weekly</div>
                                    <div className="text-xs text-slate-500">7 Days Plan</div>
                                    {formData.subscription === 'weekly' && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, subscription: 'monthly' })}
                                    className={clsx(
                                        "p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                                        formData.subscription === 'monthly'
                                            ? "border-emerald-600 bg-emerald-50"
                                            : "border-slate-200 bg-white hover:border-emerald-200"
                                    )}
                                >
                                    <div className="font-bold text-slate-900 mb-1">Monthly</div>
                                    <div className="text-xs text-slate-500">30 Days Plan</div>
                                    {formData.subscription === 'monthly' && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Allergies */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Allergies</h3>
                    <div className="flex flex-wrap gap-2">
                        {ALLERGIES_LIST.map(allergy => {
                            const isSelected = formData.allergies.includes(allergy);
                            return (
                                <button
                                    key={allergy}
                                    type="button"
                                    onClick={() => toggleAllergy(allergy)}
                                    className={clsx(
                                        "px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-2",
                                        isSelected
                                            ? "bg-rose-500 text-white border-rose-600 shadow-sm"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                    )}
                                >
                                    {isSelected && <Check className="w-3 h-3" />}
                                    {allergy}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Medical History */}
                <section className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Medical Conditions</h3>
                    <div className="flex flex-wrap gap-2">
                        {DISEASES_LIST.map(disease => {
                            const isSelected = formData.diseases.includes(disease);
                            return (
                                <button
                                    key={disease}
                                    type="button"
                                    onClick={() => toggleDisease(disease)}
                                    className={clsx(
                                        "px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-2",
                                        isSelected
                                            ? "bg-amber-500 text-white border-amber-600 shadow-sm"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                    )}
                                >
                                    {isSelected && <Check className="w-3 h-3" />}
                                    {disease}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <div className="pt-4 sticky bottom-4">
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg shadow-slate-200 active:scale-[0.98] transition-all"
                    >
                        <Save className="w-5 h-5" />
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};
