import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  language: LanguageKey;
}

const key = "language";
const getLanguageFromLocalStorage = (): LanguageKey => {
  const storedLanguage = localStorage.getItem(key);
  if (storedLanguage) {
    return storedLanguage as LanguageKey;
  }
  return "en";
};

const initialState: LanguageState = {
  language: getLanguageFromLocalStorage(),
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageKey>) => {
      state.language = action.payload;
      localStorage.setItem(key, action.payload);
    },
    resetLanguage: (state) => {
      state.language = "en";
      localStorage.removeItem(key);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
