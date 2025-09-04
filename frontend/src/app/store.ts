import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/model/authSlice";
import orderReducer from "../features/order/model/orderSlice";
import ordersReducer from "../features/orders/model/getOrdersSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;