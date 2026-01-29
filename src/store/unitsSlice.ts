import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TemperatureUnit } from '../types/weather';
//Funkcja do wczytywania zapisanego stanu z localStorage
const loadState = (key: string) => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) { return undefined; } // W przypadku błędu zwracamy undefined
};

const saveState = (key: string, state: any) => { //Funkcja zapisująca aktualny stan do localStorage
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {} //Ignorujemy błędy zapisu
};

interface UnitState { //Interfejs opisujący strukturę stanu jednostki temperatury w Redux
    unit: TemperatureUnit;
}
 //Stan początkowy Redux slice
const initialState: UnitState = {
    unit: (loadState('weather_unit') as TemperatureUnit) || 'celsius',
};

const unitsSlice = createSlice({ //Redux slice odpowiedzialny za globalne ustawienia jednostki temperatury
    name: 'settings',
    initialState,
    reducers: { //Akcja zmieniająca aktualną jednostkę temperatury
        setUnit: (state, action: PayloadAction<TemperatureUnit>) => { //Redux Toolkit używa Immer więc możemy "mutować" stan w bezpieczny sposób
            state.unit = action.payload;
            saveState('weather_unit', state.unit); //Zapis nowej jednostki temperatury do localStorage
        },
    },
});

export const { setUnit } = unitsSlice.actions; //Eksport akcji Redux 
export default unitsSlice.reducer; //Eksport reducera do konfiguracji Redux store