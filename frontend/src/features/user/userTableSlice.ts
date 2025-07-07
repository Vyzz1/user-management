import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TableParams } from "../../components/UserTable";

export interface UserTableState {
  sortField?: string | undefined;
  sortOrder?: "ascend" | "descend" | undefined;
  filters: Record<string, any>;
  currentPage: number;
  pageSize: number;
  inputSearch?: string | undefined;
}

const initialState: UserTableState = {
  sortField: undefined,
  sortOrder: undefined,
  filters: {},
  currentPage: 1,
  pageSize: 10,
  inputSearch: undefined,
};
export const userTableSlice = createSlice({
  name: "userTable",
  initialState,
  reducers: {
    setUserTableState: (state, action: PayloadAction<TableParams>) => {
      state.sortField = action.payload.sortField
        ? String(action.payload.sortField)
        : undefined;
      state.sortOrder = action.payload.sortOrder || undefined;

      state.filters = action.payload.filters || {};

      state.currentPage = action.payload.pagination?.current || 1;

      state.pageSize = action.payload.pagination?.pageSize || 10;

      state.inputSearch = action.payload.inputSearch;
    },

    setInputSearch: (state, action: PayloadAction<string | undefined>) => {
      state.inputSearch = action.payload;
    },

    removeInputSearch: (state) => {
      state.inputSearch = undefined;
    },

    resetUserTableState: (state) => {
      state.sortField = initialState.sortField;
      state.sortOrder = initialState.sortOrder;
      state.filters = initialState.filters;
    },
  },
});

export const {
  setUserTableState,
  resetUserTableState,
  setInputSearch,
  removeInputSearch,
} = userTableSlice.actions;

export default userTableSlice.reducer;
