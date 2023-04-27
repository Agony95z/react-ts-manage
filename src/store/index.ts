import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./modules/users";
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
    users: persistReducer(persistConfig, userReducer), // 配置token持久化
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