import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TemperatureUnit } from '../types/weather';

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

interface UnitState {
    unit: TemperatureUnit;
}

const initialState: UnitState = {
    unit: (loadState('weather_unit') as TemperatureUnit) || 'celsius',
};

const unitsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUnit: (state, action: PayloadAction<TemperatureUnit>) => {
            state.unit = action.payload;
            saveState('weather_unit', state.unit);
        },
    },
});

export const { setUnit } = unitsSlice.actions;
export default unitsSlice.reducer;