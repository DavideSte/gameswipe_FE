import { configureStore } from "@reduxjs/toolkit";
import { gamesApi } from "./api/gamesApi";
import { rootReducer } from "./rootReducer";

export function setupStore(preloadedState?: RootState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
