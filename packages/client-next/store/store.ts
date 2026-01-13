// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // We'll create this next
import compReducer from "./componentSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import undoable, { includeAction } from "redux-undo";


const persistConfig = {
  key: "root",
  storage,
};

const undoableReducer = undoable(compReducer, {
  filter: includeAction([
    "comp/setComponents",
    "comp/addComponent",
    "comp/updateComponent",
    "comp/clearComponents",
    "comp/swapComponent",
    "comp/removeComponent",
  ]),
  limit: 30,
});

const persistedReducer = persistReducer(persistConfig, undoableReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add reducers here
    component: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;