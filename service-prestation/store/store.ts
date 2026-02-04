import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import userPreferencesReducer from "./slices/user-preferences-slice";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Solution pour éviter les erreurs d'hydratation avec Next.js
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" 
  ? createWebStorage("local") 
  : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "userPreferences"], // Nom de la clé dans le combineReducers
  debug: true, // Active les logs de redux-persist
};

const rootReducer = combineReducers({
  user: userReducer,
  userPreferences: userPreferencesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // On ignore les actions de redux-persist pour éviter les erreurs de sérialisation
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Types dérivés du rootReducer pour éviter la circularité
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

// On exporte le persistor pour l'utiliser dans PersistGate
export const persistor = (store: AppStore) => persistStore(store);
