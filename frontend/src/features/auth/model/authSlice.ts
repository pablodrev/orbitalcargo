import { createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import api from '../../../shared/api/axios';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthSlice {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
};

const initialState: AuthSlice = {
  user: null,
  token: null,
  isAuth: false,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post<{ token: string; user: User }>('/auth/login', {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const initAuth = createAsyncThunk(
  'auth/initAuth',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) return thunkAPI.rejectWithValue(null);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await api.get<User>('auth/me');
      return { token, user: response.data };
    } catch (err) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
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
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
        state.loading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
      })
      .addCase(initAuth.fulfilled, (state, action: PayloadAction<{ token: string, user: User }>) => {
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(initAuth.rejected, (state) => {
        state.isAuth = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;