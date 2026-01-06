import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { generateDailyMealPlan } from '../lib/mealGenerator';
import { DailyPlan } from './DailyPlan';
import { RefreshCw, Scale, Ruler } from 'lucide-react';
import clsx from 'clsx';
import type { DailyMealPlan } from '../types';

export const Dashboard: React.FC = () => {
    const { currentUser, getMealPlan, setMealPlan } = useAppStore();
    const [currentPlan, setCurrentPlan] = useState<DailyMealPlan | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Generate current week (Mon-Sun)
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        const currentDay = d.getDay(); // 0 = Sun, 1 = Mon, ...
        const diff = d.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust to Monday
        d.setDate(diff + i);
        return d;
    });

    const formatDateKey = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (currentUser) {
            const dateKey = formatDateKey(selectedDate);
            let plan = getMealPlan(currentUser.id, dateKey);

            if (!plan) {
                // Get previous day's plan to avoid repetition
                const prevDate = new Date(selectedDate);
                prevDate.setDate(prevDate.getDate() - 1);
                const prevDateKey = formatDateKey(prevDate);
                const previousPlan = getMealPlan(currentUser.id, prevDateKey);

                plan = generateDailyMealPlan(currentUser, dateKey, previousPlan);
                setMealPlan(currentUser.id, dateKey, plan);
            }

            setCurrentPlan(plan || null);
        }
    }, [currentUser, getMealPlan, setMealPlan, selectedDate]);

    const handleRegenerate = () => {
        if (currentUser) {
            const dateKey = formatDateKey(selectedDate);

            // Get previous day's plan
            const prevDate = new Date(selectedDate);
            prevDate.setDate(prevDate.getDate() - 1);
            const prevDateKey = formatDateKey(prevDate);
            const previousPlan = getMealPlan(currentUser.id, prevDateKey);

            const newPlan = generateDailyMealPlan(currentUser, dateKey, previousPlan);
            setMealPlan(currentUser.id, dateKey, newPlan);
            setCurrentPlan(newPlan);
        }
    };

    if (!currentUser) return null;

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Hello, {currentUser.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-500 text-sm">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className={clsx(
                            "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                            currentUser.subscription === 'monthly'
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                        )}>
                            {currentUser.subscription || 'Weekly'} Plan
                        </span>
                    </div>
                    <Link to="/settings" className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold hover:bg-emerald-200 transition-colors">
                        {currentUser.name[0]}
                    </Link>
                </div>
            </header>

            {/* Week Calendar */}
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 touch-pan-x">
                {weekDays.map((date) => {
                    const isSelected = formatDateKey(date) === formatDateKey(selectedDate);
                    const isToday = formatDateKey(date) === formatDateKey(new Date());

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => setSelectedDate(date)}
                            className={clsx(
                                "flex flex-col items-center justify-center min-w-[60px] h-[70px] rounded-2xl transition-all flex-shrink-0 border",
                                isSelected
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200"
                                    : "bg-white text-slate-500 border-slate-100"
                            )}
                        >
                            <span className="text-xs font-medium uppercase">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span className={clsx("text-lg font-bold", isSelected ? "text-white" : "text-slate-900")}>
                                {date.getDate()}
                            </span>
                            {isToday && !isSelected && (
                                <span className="w-1 h-1 bg-emerald-500 rounded-full mt-1" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Scale className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase">Weight</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900">{currentUser.weight} <span className="text-sm font-normal text-slate-400">kg</span></div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Ruler className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase">Height</span>
                    </div>
                    <div className="text-xl font-bold text-slate-900">{currentUser.height} <span className="text-sm font-normal text-slate-400">cm</span></div>
                </div>
            </div>

            {/* Health Tags */}
            <div className="flex flex-wrap gap-2">
                {currentUser.allergies.map(allergy => (
                    <span key={allergy} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-medium border border-rose-100">
                        No {allergy}
                    </span>
                ))}
                {currentUser.diseases.map(disease => (
                    <span key={disease} className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium border border-amber-100">
                        {disease}
                    </span>
                ))}
            </div>

            {/* Today's Plan */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">
                        {formatDateKey(selectedDate) === formatDateKey(new Date()) ? "Today's Plan" : "Meal Plan"}
                    </h2>
                    <button
                        onClick={handleRegenerate}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                {currentPlan ? (
                    <DailyPlan plan={currentPlan} />
                ) : (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
                        Generating plan...
                    </div>
                )}
            </section>
        </div>
    );
};
