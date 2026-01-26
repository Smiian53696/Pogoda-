import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WeatherData } from '../types/weather';

const loadState = (key: string) => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) { return undefined; }
};

const saveState = (key: string, state: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {}
};

interface FavoritesState {
    list: WeatherData[];
}

const initialState: FavoritesState = {
    list: (loadState('weather_favorites') as WeatherData[]) || [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<WeatherData>) => {
            if (!state.list.find(city => city.id === action.payload.id)) {
                state.list.push(action.payload);
                saveState('weather_favorites', state.list);
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(city => city.id !== action.payload);
            saveState('weather_favorites', state.list);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;