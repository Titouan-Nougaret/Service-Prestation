import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPreferencesState {
  theme: "light" | "dark" | "system";
  sidebarCollapsed: boolean;
  savedEmail: string | null;
}

const initialState: UserPreferencesState = {
  theme: "system",
  sidebarCollapsed: false,
  savedEmail: null,
};

export const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<UserPreferencesState["theme"]>) => {
      state.theme = action.payload;
    },
    setSavedEmail: (state, action: PayloadAction<string | null>) => {
      state.savedEmail = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { setTheme, setSavedEmail, toggleSidebar, setSidebarCollapsed } = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
