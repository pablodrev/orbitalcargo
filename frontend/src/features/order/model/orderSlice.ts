import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios.ts"; // Adjust path to your api.ts

export type CargoSize = "Small" | "Medium" | "Large";

export interface Cargo {
    name: string;
    size: CargoSize;
    weight: number;
}

interface OrderState {
    sender: string;
    phoneNumber: string;
    direction: "To Orbit" | "To Earth" | "";
    cargos: Cargo[];
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
    sender: "",
    phoneNumber: "",
    direction: "",
    cargos: [],
    loading: false,
    error: null,
};

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { order: OrderState };
            const orderData = {
                sender: state.order.sender,
                phoneNumber: state.order.phoneNumber,
                direction: state.order.direction,
                cargos: state.order.cargos,
            };

            // Validate required fields
            if (!orderData.sender || !orderData.phoneNumber || !orderData.direction || orderData.cargos.length === 0) {
                return rejectWithValue("Все поля должны быть заполнены, и должен быть добавлен хотя бы один груз");
            }

            // Ensure direction and cargo sizes match schema enums
            if (!["To Orbit", "To Earth"].includes(orderData.direction)) {
                return rejectWithValue("Недопустимое направление");
            }
            for (const cargo of orderData.cargos) {
                if (!["Small", "Medium", "Large"].includes(cargo.size)) {
                    return rejectWithValue(`Недопустимый размер груза: ${cargo.size}`);
                }
                if (cargo.weight <= 0) {
                    return rejectWithValue(`Вес груза должен быть больше 0: ${cargo.name}`);
                }
            }

            const response = await api.post("/api/order/", orderData);
            return response.data;
        } catch (error) {
            // Simplified error handling: always return a string
            return error;
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setSender(state, action: PayloadAction<string>) {
            state.sender = action.payload;
        },
        setPhoneNumber(state, action: PayloadAction<string>) {
            state.phoneNumber = action.payload;
        },
        setDirection(state, action: PayloadAction<"To Orbit" | "To Earth" | "">) {
            state.direction = action.payload;
        },
        addCargo(state, action: PayloadAction<Cargo>) {
            state.cargos = [...state.cargos, action.payload];
        },
        updateCargo(state, action: PayloadAction<{ index: number; cargo: Cargo }>) {
            const { index, cargo } = action.payload;
            if (index >= 0 && index < state.cargos.length) {
                state.cargos = state.cargos.map((c, i) => (i === index ? cargo : c));
            }
        },
        removeCargo(state, action: PayloadAction<number>) {
            state.cargos = state.cargos.filter((_, i) => i !== action.payload);
        },
        resetOrder() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                // Reset form on success
                state.sender = "";
                state.phoneNumber = "";
                state.direction = "";
                state.cargos = [];
                // Success feedback
                alert("Заказ успешно создан!");
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setSender,
    setPhoneNumber,
    setDirection,
    addCargo,
    updateCargo,
    removeCargo,
    resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;