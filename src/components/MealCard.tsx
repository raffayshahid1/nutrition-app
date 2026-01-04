import React from 'react';
import type { FoodItem } from '../types';
import { Flame } from 'lucide-react';

interface MealCardProps {
    title: string;
    food: FoodItem;
}

export const MealCard: React.FC<MealCardProps> = ({ title, food }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-4">
            <div className="bg-emerald-50/50 px-4 py-3 border-b border-emerald-100/50 flex justify-between items-center">
                <h3 className="font-bold text-emerald-800 uppercase text-xs tracking-wider">{title}</h3>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-white px-2 py-1 rounded-full shadow-sm">
                    <Flame className="w-3 h-3 fill-emerald-600" />
                    <span>{food.calories} kcal</span>
                </div>
            </div>

            <div className="p-4">
                <h4 className="font-bold text-slate-900 text-lg mb-3 leading-tight">{food.name}</h4>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                        <span className="block text-[10px] uppercase text-slate-400 font-bold mb-0.5">Protein</span>
                        <span className="block font-bold text-slate-700">{food.protein}g</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                        <span className="block text-[10px] uppercase text-slate-400 font-bold mb-0.5">Carbs</span>
                        <span className="block font-bold text-slate-700">{food.carbs}g</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                        <span className="block text-[10px] uppercase text-slate-400 font-bold mb-0.5">Fats</span>
                        <span className="block font-bold text-slate-700">{food.fats}g</span>
                    </div>
                </div>

                {(food.allergens.length > 0 || food.suitableFor.length > 0) && (
                    <div className="flex flex-wrap gap-1.5">
                        {food.allergens.map(a => (
                            <span key={a} className="px-2 py-1 bg-rose-50 text-rose-600 text-[10px] font-medium rounded-lg border border-rose-100">
                                Contains {a}
                            </span>
                        ))}
                        {food.suitableFor.map(d => (
                            <span key={d} className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-lg border border-blue-100">
                                Good for {d}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
