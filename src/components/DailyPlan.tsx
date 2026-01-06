import React from 'react';
import type { DailyMealPlan } from '../types';
import { MealCard } from './MealCard';
import { PieChart } from 'lucide-react';

interface DailyPlanProps {
    plan: DailyMealPlan;
}

export const DailyPlan: React.FC<DailyPlanProps> = ({ plan }) => {
    const mealTypeLabels: Record<string, string> = {
        breakfast: 'Breakfast (Nashta)',
        lunch: 'Lunch (Dopahar ka Khana)',
        dinner: 'Dinner (Raat ka Khana)',
        snack: 'Snack (Halka Phulka)',
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                <MealCard title={mealTypeLabels.breakfast} food={plan.breakfast} />
                <MealCard title={mealTypeLabels.lunch} food={plan.lunch} />
                <MealCard title={mealTypeLabels.dinner} food={plan.dinner} />
                {plan.snack && <MealCard title={mealTypeLabels.snack} food={plan.snack} />}
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                        <PieChart className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">Daily Summary</h3>
                        <p className="text-sm text-slate-500">Total nutritional intake</p>
                    </div>
                </div>
                <div className="flex gap-4 sm:gap-6 text-sm overflow-x-auto pb-1 no-scrollbar">
                    <div className="text-center min-w-fit">
                        <div className="font-bold text-slate-900">{plan.totalCalories}</div>
                        <div className="text-xs text-slate-500">Calories</div>
                    </div>
                    <div className="text-center min-w-fit">
                        <div className="font-bold text-slate-900">{plan.totalProtein}g</div>
                        <div className="text-xs text-slate-500">Protein</div>
                    </div>
                    <div className="text-center min-w-fit">
                        <div className="font-bold text-slate-900">{plan.totalCarbs}g</div>
                        <div className="text-xs text-slate-500">Carbs</div>
                    </div>
                    <div className="text-center min-w-fit">
                        <div className="font-bold text-slate-900">{plan.totalFats}g</div>
                        <div className="text-xs text-slate-500">Fats</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
