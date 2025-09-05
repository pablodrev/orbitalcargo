// store/slices/slotSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../shared/api/axios.ts";
import { AxiosError } from "axios";

export interface Slot {
  id: number;
  size: "Small" | "Medium" | "Large";
  cargoId: number | null;
}

export interface Cargo {
  id: number;
  name: string;
  size: "Small" | "Medium" | "Large";
  weight: number;
  status: string;
}

interface CargoState {
  small: Cargo[];
  medium: Cargo[];
  large: Cargo[];
}

interface SlotState {
  slots: Slot[];
  cargo: CargoState | null;
  loading: boolean;
  error: string | null;
}

const initialState: SlotState = {
  slots: [],
  cargo: null,
  loading: false,
  error: null,
};

// Получение слотов
export const fetchSlots = createAsyncThunk<
  Slot[],
  void,
  { rejectValue: string }
>("slots/fetchSlots", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Slot[]>("/api/slot/");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Ошибка при загрузке слотов"
    );
  }
});

// Получение списка товаров
export const fetchCargo = createAsyncThunk<
  CargoState,
  void,
  { rejectValue: string }
>("slots/fetchCargo", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<CargoState>("/api/cargos/");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Ошибка при загрузке товаров"
    );
  }
});

// Назначение / освобождение груза
export const assignCargo = createAsyncThunk<
  Slot,
  { slotId: number; cargoId: number | null },
  { rejectValue: string }
>("slots/assignCargo", async ({ slotId, cargoId }, { rejectWithValue }) => {
  try {
    const response = await api.patch<Slot>(
      `/api/slot/${slotId}/assign-cargo/${cargoId ?? 0}`
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Ошибка при назначении груза"
    );
  }
});

const slotSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
      })
      .addCase(fetchCargo.fulfilled, (state, action) => {
        state.cargo = action.payload;
      })
      .addCase(assignCargo.fulfilled, (state, action) => {
        const updatedSlot = action.payload;
        const index = state.slots.findIndex((s) => s.id === updatedSlot.id);
        if (index !== -1) {
          state.slots[index] = updatedSlot;
        }
        // список cargo не трогаем — он обновляется через fetchCargo
      });
  },
});

export default slotSlice.reducer;
