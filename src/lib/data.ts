import type { FoodItem } from '../types';

export const FOOD_DATABASE: FoodItem[] = [
    // Breakfast (Nashta)
    {
        id: '1',
        name: 'Anda Paratha (Egg & Flatbread)',
        calories: 450,
        protein: 12,
        carbs: 45,
        fats: 22,
        allergens: ['Egg', 'Wheat', 'Gluten'],
        suitableFor: [],
        contraindicatedFor: ['Heart Disease'], // High saturated fat
        mealType: ['breakfast']
    },
    {
        id: '2',
        name: 'Chai & Rusk',
        calories: 200,
        protein: 4,
        carbs: 35,
        fats: 5,
        allergens: ['Dairy', 'Wheat', 'Gluten'],
        suitableFor: [],
        contraindicatedFor: ['Diabetes'], // High sugar
        mealType: ['breakfast', 'snack']
    },
    {
        id: '3',
        name: 'Halwa Puri (Weekend Special)',
        calories: 600,
        protein: 8,
        carbs: 80,
        fats: 30,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: [],
        contraindicatedFor: ['Diabetes', 'Heart Disease', 'Hypertension'],
        mealType: ['breakfast']
    },
    {
        id: '4',
        name: 'Naan Channay (Chickpea Curry)',
        calories: 500,
        protein: 18,
        carbs: 75,
        fats: 15,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: ['Hypertension'],
        contraindicatedFor: ['Diabetes'], // High carb
        mealType: ['breakfast', 'lunch']
    },
    {
        id: '5',
        name: 'Yogurt & Roti',
        calories: 300,
        protein: 12,
        carbs: 40,
        fats: 8,
        allergens: ['Dairy', 'Wheat', 'Gluten'],
        suitableFor: ['Hypertension', 'Diabetes'],
        contraindicatedFor: [],
        mealType: ['breakfast']
    },
    {
        id: '6',
        name: 'Omelette & Bread Slice',
        calories: 300,
        protein: 14,
        carbs: 25,
        fats: 15,
        allergens: ['Egg', 'Wheat', 'Gluten'],
        suitableFor: ['Diabetes'],
        contraindicatedFor: [],
        mealType: ['breakfast']
    },
    {
        id: '19',
        name: 'Besan ki Roti (Gram Flour Bread) with Chutney',
        calories: 250,
        protein: 10,
        carbs: 35,
        fats: 8,
        allergens: ['Wheat', 'Gluten'], // Often mixed with wheat
        suitableFor: ['Diabetes', 'Hypertension'],
        contraindicatedFor: [],
        mealType: ['breakfast']
    },
    {
        id: '20',
        name: 'Daliya (Wheat Porridge)',
        calories: 200,
        protein: 6,
        carbs: 40,
        fats: 2,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: ['Diabetes', 'Heart Disease', 'Hypertension'],
        contraindicatedFor: [],
        mealType: ['breakfast']
    },

    // Lunch/Dinner (Khana)
    {
        id: '7',
        name: 'Daal Chawal (Lentils & Rice)',
        calories: 450,
        protein: 16,
        carbs: 70,
        fats: 10,
        allergens: [],
        suitableFor: ['Hypertension', 'Heart Disease'],
        contraindicatedFor: ['Diabetes'], // High carb (white rice)
        mealType: ['lunch', 'dinner']
    },
    {
        id: '8',
        name: 'Chicken Karahi with Roti',
        calories: 550,
        protein: 35,
        carbs: 40,
        fats: 25,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: ['Diabetes'],
        contraindicatedFor: ['Heart Disease'],
        mealType: ['lunch', 'dinner']
    },
    {
        id: '9',
        name: 'Aloo Gobi (Potato & Cauliflower) with Roti',
        calories: 350,
        protein: 8,
        carbs: 55,
        fats: 12,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: ['Hypertension'],
        contraindicatedFor: ['Diabetes'], // Potato
        mealType: ['lunch', 'dinner']
    },
    {
        id: '10',
        name: 'Beef Nihari with Naan',
        calories: 700,
        protein: 40,
        carbs: 60,
        fats: 35,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: [],
        contraindicatedFor: ['Heart Disease', 'Hypertension', 'Diabetes'],
        mealType: ['lunch', 'dinner']
    },
    {
        id: '11',
        name: 'Chicken Biryani',
        calories: 600,
        protein: 25,
        carbs: 80,
        fats: 20,
        allergens: [],
        suitableFor: [],
        contraindicatedFor: ['Diabetes'],
        mealType: ['lunch', 'dinner']
    },
    {
        id: '12',
        name: 'Mix Sabzi (Vegetables) with Roti',
        calories: 300,
        protein: 6,
        carbs: 45,
        fats: 10,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: ['Diabetes', 'Heart Disease', 'Hypertension'],
        contraindicatedFor: [],
        mealType: ['lunch', 'dinner']
    },
    {
        id: '13',
        name: 'Chapli Kabab with Naan',
        calories: 550,
        protein: 30,
        carbs: 40,
        fats: 30,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: [],
        contraindicatedFor: ['Heart Disease'],
        mealType: ['lunch', 'dinner']
    },
    {
        id: '14',
        name: 'Haleem (Meat & Lentil Stew)',
        calories: 500,
        protein: 30,
        carbs: 50,
        fats: 18,
        allergens: ['Wheat', 'Gluten'], // Often contains wheat/barley
        suitableFor: ['Diabetes'], // High fiber
        contraindicatedFor: [],
        mealType: ['lunch', 'dinner']
    },
    {
        id: '15',
        name: 'Bhindi (Okra) Masala with Roti',
        calories: 320,
        protein: 6,
        carbs: 40,
        fats: 14,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: ['Diabetes', 'Heart Disease'],
        contraindicatedFor: [],
        mealType: ['lunch', 'dinner']
    },

    // Snacks
    {
        id: '16',
        name: 'Fruit Chaat',
        calories: 150,
        protein: 2,
        carbs: 35,
        fats: 0,
        allergens: [],
        suitableFor: ['Heart Disease', 'Hypertension'],
        contraindicatedFor: ['Diabetes'], // High fruit sugar if excessive
        mealType: ['snack']
    },
    {
        id: '17',
        name: 'Roasted Chana (Chickpeas)',
        calories: 180,
        protein: 10,
        carbs: 25,
        fats: 3,
        allergens: [],
        suitableFor: ['Diabetes', 'Heart Disease', 'Hypertension'],
        contraindicatedFor: [],
        mealType: ['snack']
    },
    {
        id: '18',
        name: 'Samosa (Single)',
        calories: 250,
        protein: 4,
        carbs: 30,
        fats: 14,
        allergens: ['Wheat', 'Gluten'],
        suitableFor: [],
        contraindicatedFor: ['Heart Disease', 'Diabetes'],
        mealType: ['snack']
    }
];

export const ALLERGIES_LIST = [
    'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood',
    'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'
] as const;

export const DISEASES_LIST = [
    'Diabetes', 'Hypertension', 'Celiac Disease', 'Heart Disease', 'Kidney Disease'
] as const;
