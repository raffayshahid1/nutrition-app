export type Allergy =
    | 'Dairy'
    | 'Egg'
    | 'Gluten'
    | 'Grain'
    | 'Peanut'
    | 'Seafood'
    | 'Sesame'
    | 'Shellfish'
    | 'Soy'
    | 'Sulfite'
    | 'Tree Nut'
    | 'Wheat';

export type Disease =
    | 'Diabetes'
    | 'Hypertension'
    | 'Celiac Disease'
    | 'Heart Disease'
    | 'Kidney Disease';

export type SubscriptionType = 'weekly' | 'monthly';

export interface UserProfile {
    id: string;
    name: string;
    age: number;
    weight: number; // in kg
    height: number; // in cm
    gender: 'male' | 'female' | 'other';
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    allergies: Allergy[];
    diseases: Disease[];
    subscription: SubscriptionType;
    createdAt: string;
}

export interface FoodItem {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    allergens: Allergy[];
    suitableFor: Disease[]; // Explicitly good for these
    contraindicatedFor: Disease[]; // Bad for these
    mealType: ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
}

export interface DailyMealPlan {
    date: string;
    breakfast: FoodItem;
    lunch: FoodItem;
    dinner: FoodItem;
    snack?: FoodItem;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
}
