import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: "user" | "manager" | "admin";
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setStatus: (state, action: PayloadAction<UserState["status"]>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setStatus, setError } = userSlice.actions;

export default userSlice.reducer;
