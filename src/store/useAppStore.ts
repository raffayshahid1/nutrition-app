import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, DailyMealPlan } from '../types';

interface AppState {
    users: UserProfile[];
    currentUser: UserProfile | null;
    mealPlans: Record<string, Record<string, DailyMealPlan>>; // userId -> date -> plan

    addUser: (user: Omit<UserProfile, 'id' | 'createdAt'>) => void;
    updateUser: (id: string, user: Partial<UserProfile>) => void;
    deleteUser: (id: string) => void;
    setCurrentUser: (id: string | null) => void;
    setMealPlan: (userId: string, date: string, plan: DailyMealPlan) => void;
    getMealPlan: (userId: string, date: string) => DailyMealPlan | undefined;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            users: [],
            currentUser: null,
            mealPlans: {},

            addUser: (userData) => {
                const newUser: UserProfile = {
                    ...userData,
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                };
                set((state) => ({
                    users: [...state.users, newUser],
                    currentUser: newUser, // Auto select new user
                }));
            },

            updateUser: (id, userData) => {
                set((state) => ({
                    users: state.users.map((u) => (u.id === id ? { ...u, ...userData } : u)),
                    currentUser: state.currentUser?.id === id ? { ...state.currentUser, ...userData } : state.currentUser,
                }));
            },

            deleteUser: (id) => {
                set((state) => ({
                    users: state.users.filter((u) => u.id !== id),
                    currentUser: state.currentUser?.id === id ? null : state.currentUser,
                }));
            },

            setCurrentUser: (id) => {
                const user = get().users.find((u) => u.id === id) || null;
                set({ currentUser: user });
            },

            setMealPlan: (userId, date, plan) => {
                set((state) => ({
                    mealPlans: {
                        ...state.mealPlans,
                        [userId]: {
                            ...(state.mealPlans[userId] || {}),
                            [date]: plan,
                        },
                    },
                }));
            },

            getMealPlan: (userId, date) => {
                return get().mealPlans[userId]?.[date];
            },
        }),
        {
            name: 'nutrition-app-storage',
        }
    )
);
