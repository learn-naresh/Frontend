import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage" ;
import { persistReducer } from "redux-persist" ;
import { combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const reducer = combineReducers({
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default appStore;
