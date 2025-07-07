import { configureStore } from "@reduxjs/toolkit";
import { languageSlice } from "./features/language/languageSlice";
import { userApiSlice } from "./features/user/userApiSlice";
import { userTableSlice } from "./features/user/userTableSlice";
import { userColumnsSlice } from "./features/user/userColumnsSlice";

export const store = configureStore({
  reducer: {
    userColumns: userColumnsSlice.reducer,
    language: languageSlice.reducer,
    userTable: userTableSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
