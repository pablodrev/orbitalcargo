import { createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import api from '../../../shared/api/axios';

interface AuthSlice {
  token: string | null;
  role: string | null;
  isAuth: boolean;
  loading: boolean;
}

const initialState: AuthSlice = {
  token: null,
  role: null,
  isAuth: false,
  loading: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post<{ access_token: string; role: string }>('/api/auth/login', {
        username,
        password,
      });

      const { access_token, role } = response.data;

      localStorage.setItem('token', access_token);

      return { access_token, role };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.role = null;
      state.isAuth = false;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ access_token: string, role: string }>) => {
        state.loading = false;
        state.isAuth = true;
        state.token = action.payload.access_token;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;