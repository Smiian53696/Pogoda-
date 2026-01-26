import { configureStore } from "@reduxjs/toolkit";
import unitsReducer from "./unitsSlice";
import favoritesReducer from "./favoritesSlice";


export const store = configureStore({ // Tworzymy store i rejestrujemy reducery
  reducer: {
    settings: unitsReducer, 
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;