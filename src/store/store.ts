import { configureStore, Reducer } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { newsReducer } from "./news/slice";
import { AuthState } from "types/auth/state";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { uiReducer } from "./ui/slice";
import { loadingMiddleware } from "store/middleware/loadingMiddleware";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "isLoggedIn"],
};

const persistedAuthReducer: Reducer<AuthState & PersistPartial> =
  persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    news: newsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loadingMiddleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
