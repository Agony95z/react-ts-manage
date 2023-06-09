import {configureStore} from "@reduxjs/toolkit";
import type {Reducer, AnyAction} from "@reduxjs/toolkit";
import type {UsersState} from './modules/users';
import userReducer from "./modules/users";
import { PersistPartial } from "redux-persist/es/persistReducer";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from "react-redux";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['token']
}
const store = configureStore({
  reducer: {
    users: persistReducer(persistConfig, userReducer) as Reducer<UsersState & PersistPartial, AnyAction>, // 配置token持久化
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
    serializableCheck: false
  }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
persistStore(store)
export default store