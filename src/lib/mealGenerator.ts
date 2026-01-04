import type { UserProfile, DailyMealPlan, FoodItem } from '../types';
import { FOOD_DATABASE } from './data';

export const generateDailyMealPlan = (user: UserProfile, date: string, previousPlan?: DailyMealPlan): DailyMealPlan => {
    // 1. Filter foods based on allergies
    let safeFoods = FOOD_DATABASE.filter(food => {
        const hasAllergy = food.allergens.some(allergen => user.allergies.includes(allergen));
        return !hasAllergy;
    });

    // 2. Filter foods based on contraindicated diseases
    safeFoods = safeFoods.filter(food => {
        const isContraindicated = food.contraindicatedFor.some(disease => user.diseases.includes(disease));
        return !isContraindicated;
    });

    // Helper to pick random item
    const pickRandom = (items: FoodItem[]): FoodItem => {
        if (items.length === 0) {
            return {
                id: 'safe-placeholder',
                name: 'Safe Meal Placeholder (No options found)',
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
                allergens: [],
                suitableFor: [],
                contraindicatedFor: [],
                mealType: []
            };
        }
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
    };

    const getRandomMeal = (mealType: string, excludeNames: string[] = []): FoodItem => {
        let options = safeFoods.filter(f => f.mealType.includes(mealType as any));

        // Filter exclusions (avoid repetition)
        const nonExcludedOptions = options.filter(f => !excludeNames.includes(f.name));

        // Only use filtered list if we still have options, otherwise fallback to full list
        if (nonExcludedOptions.length > 0) {
            options = nonExcludedOptions;
        }

        return pickRandom(options);
    };

    const prevBreakfast = previousPlan?.breakfast.name;
    const prevLunch = previousPlan?.lunch.name;
    const prevDinner = previousPlan?.dinner.name;
    const prevSnack = previousPlan?.snack?.name;

    const breakfast = getRandomMeal('breakfast', prevBreakfast ? [prevBreakfast] : []);
    const lunch = getRandomMeal('lunch', prevLunch ? [prevLunch] : []);
    const dinner = getRandomMeal('dinner', prevDinner ? [prevDinner] : []);
    const snack = getRandomMeal('snack', prevSnack ? [prevSnack] : []);

    const totalCalories = breakfast.calories + lunch.calories + dinner.calories + (snack ? snack.calories : 0);
    const totalProtein = breakfast.protein + lunch.protein + dinner.protein + (snack ? snack.protein : 0);
    const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + (snack ? snack.carbs : 0);
    const totalFats = breakfast.fats + lunch.fats + dinner.fats + (snack ? snack.fats : 0);

    return {
        date,
        breakfast,
        lunch,
        dinner,
        snack,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFats
    };
};
