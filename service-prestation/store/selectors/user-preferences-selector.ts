import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserPreferencesState } from "../slices/user-preferences-slice";

export const selectUserPreferences = (state: RootState) => state.userPreferences;

export const selectTheme = createSelector(
  selectUserPreferences,
  (userPreferences: UserPreferencesState) => userPreferences.theme
);

export const selectSavedEmail = createSelector(
  selectUserPreferences,
  (userPreferences: UserPreferencesState) => userPreferences.savedEmail
);

export const selectSidebarCollapsed = createSelector(
  selectUserPreferences,
  (userPreferences: UserPreferencesState) => userPreferences.sidebarCollapsed
);