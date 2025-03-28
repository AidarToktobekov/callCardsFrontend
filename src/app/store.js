import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {listReducer} from "../features/list/listSlice.js";
import {userReducer} from "../features/user/userSlice.js";
import {reportsReducer} from "../features/reports/reportsSlice.js";
import {reasonsAndSolutionsReducer} from "../features/reasonsAndSolution/reasonsAndSolutionSlice.js";

const usersPersistConfig = {
    key: 'callCards:user',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    user: persistReducer(usersPersistConfig, userReducer),
    list: listReducer,
    reports: reportsReducer,
    reasonsAndSolutions: reasonsAndSolutionsReducer,
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