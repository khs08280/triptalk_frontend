import api from "@/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  nickname: string;
  email?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: true,
  error: null,
};

export const checkSession = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/checkSession", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<User>("/auth/check");
    return res.data; // user 객체
  } catch (err) {
    return rejectWithValue("세션이 유효하지 않음");
  }
});

export const checkLogin = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/checkLogin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<User>("/auth/checkLogin");
      return res.data; // user 객체
    } catch (err) {
      return rejectWithValue("세션이 유효하지 않음");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    logoutState(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkSession
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload; // 서버에서 온 user 정보
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload || "로그인 안 됨";
      })
      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload; // 서버에서 온 user 정보
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload || "로그인 안 됨";
      });
  },
});

export const { loginSuccess, logoutState, endLoading } = authSlice.actions;
export default authSlice.reducer;
