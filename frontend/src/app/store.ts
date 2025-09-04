import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/model/authSlice";
import orderReducer from "../features/order/model/orderSlice"; // ✅ импортируем orderSlice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,       // ✅ добавляем order в стор
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
