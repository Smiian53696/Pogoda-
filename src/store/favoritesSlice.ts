import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WeatherData } from '../types/weather';

const loadState = (key: string) => { //Funkcja do wczytywania stanu z localStorage
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) { return undefined; } //W przypadku błędu zwracamy undefined
};

const saveState = (key: string, state: any) => { //Funkcja zapisująca stan do localStorage
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {}
};

interface FavoritesState { //Interfejs opisujący strukturę stanu ulubionych miast
    list: WeatherData[];
}

const initialState: FavoritesState = { //Stan początkowy Redux slice
    list: (loadState('weather_favorites') as WeatherData[]) || [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: { //Dodawanie miasta do ulubionych
        addFavorite: (state, action: PayloadAction<WeatherData>) => {
            if (!state.list.find(city => city.id === action.payload.id)) {
                state.list.push(action.payload);
                saveState('weather_favorites', state.list); //Zapis aktualnego stanu do localStorage
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(city => city.id !== action.payload);
            saveState('weather_favorites', state.list); //Aktualizacja zapisu w localStorage
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions; //Eksport akcji Redux do użycia w komponentach React
export default favoritesSlice.reducer; //Eksport reducera do konfiguracji Redux store