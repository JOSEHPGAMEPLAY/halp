// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./redux/auth/authSlice";
import cartReducer from "./redux/cart/cartSlice";

// Configuración de persistencia para los slices
const persistConfig = {
    key: "root", // Clave principal para la persistencia
    storage, // Define que usará localStorage
    whitelist: ["auth", "cart"], // Define qué slices quieres persistir
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
