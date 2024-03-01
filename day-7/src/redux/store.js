import { configureStore } from "@reduxjs/toolkit";
import service from "./service";
import { apiReducer } from "./service";
import { localReducer } from "./reducer";
import { saveState } from "../config/state";
export const store = configureStore({
  reducer: {
    ...apiReducer,
    ...localReducer,
  },

  middleware: (defaultMiddleware) => {
    return defaultMiddleware().concat(...service.map((api) => api.middleware));
  },
});

store.subscribe(() => saveState("todo", store.getState().user));
