import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserColumnsState {
  columns?: string[];
}

const initialState: UserColumnsState = {
  columns: ["name", "gender", "city", "createdAt", "actions"],
};

export const userColumnsSlice = createSlice({
  name: "userColumns",
  initialState,
  reducers: {
    setUserColumns: (state, action: PayloadAction<string[]>) => {
      state.columns = action.payload;
    },
  },
});

export const { setUserColumns } = userColumnsSlice.actions;
