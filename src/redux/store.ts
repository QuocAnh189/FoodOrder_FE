import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import localStorage from 'redux-persist/es/storage';

//slices
import authReducer, { AuthSliceKey } from './slices/authSlice';

//api
import { apiAuth } from './services/authApi';
import { apiUser } from './services/userApi';

const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: [AuthSliceKey],
  blacklist: []
};

const combinedReducer = combineReducers({
  [AuthSliceKey]: authReducer,

  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiUser.reducerPath]: apiUser.reducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logOut') {
    state.auth = undefined;
  }

  return combinedReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'socket/createSocket',
          'apiAuth/executeMutation/fulfilled',
          'apiUser/executeMutation/fulfilled'
        ],
        ignoredActionPaths: [
          'socket.socket',
          'payload',
          'meta.baseQueryMeta.request',
          'meta.baseQueryMeta.response'
        ],
        ignoredPaths: [
          'socket',
          'meta.baseQueryMeta.request',
          'meta.baseQueryMeta.respone'
        ]
      },
      immutableCheck: {
        ignoredPaths: [
          'ignoredPath',
          'ignoredNested.one',
          'ignoredNested.two',
          'items.data'
        ]
      }
    }).concat([apiAuth.middleware, apiUser.middleware])
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const persistor = persistStore(store);
