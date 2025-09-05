import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios.ts"; // Adjust path to your api.ts

export interface Cargo {
    id: number;
    name: string;
    size: "Small" | "Medium" | "Large";
    weight: number;
    order_id: number;
}

export interface Order {
    id: number;
    direction: "To Orbit" | "To Earth";
    sender: string;
    phoneNumber: string;
    status: string;
    cargos: Cargo[];
}

interface OrdersState {
    orders: Order[];
    loading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
};

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async () => {
        const response = await api.get("/api/order/");
        return response.data as Order[];
    }
);

const getOrdersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            });
    },
});

export default getOrdersSlice.reducer;