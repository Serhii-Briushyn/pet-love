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
import { PersistPartial } from "redux-persist/es/persistReducer";
import { UsersState } from "./users/types";
import { usersReducer } from "./users/slice";
import { uiReducer } from "./ui/slice";
import { newsReducer } from "./news/slice";
import { noticesReducer } from "./notices/slice";
import { friendsReducer } from "./friends/slice";
import { citiesReducer } from "./cities/slice";
import { loadingMiddleware } from "@middlewares/loadingMiddleware";

const usersPersistConfig = {
  key: "users",
  storage,
  whitelist: ["token", "isLoggedIn"],
};

const persistedUsersReducer: Reducer<UsersState & PersistPartial> =
  persistReducer(usersPersistConfig, usersReducer);

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
    ui: uiReducer,
    news: newsReducer,
    notices: noticesReducer,
    friends: friendsReducer,
    cities: citiesReducer,
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
