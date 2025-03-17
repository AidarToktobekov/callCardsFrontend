import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {listReducer} from "../features/list/listSlice.js";

const usersPersistConfig = {
    key: 'Skynet:user',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    list: listReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    },
});

export const persistor = persistStore(store);