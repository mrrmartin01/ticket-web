import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/types/auth";

interface AuthState {
  user: UserProfile | null;
  isAuthInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.isAuthInitialized = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthInitialized = true;
    },
    markAuthInitialized(state) {
      state.isAuthInitialized = true;
    },
  },
});

export const { setUser, clearUser, markAuthInitialized } =
  authSlice.actions;

export default authSlice.reducer;
