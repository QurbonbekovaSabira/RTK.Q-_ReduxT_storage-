import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../config/state";
const initialState = loadState("todo") || {
  user: [],
  count: 0,
};

const useReducer = createSlice({
  name: "useReducer",
  initialState,
  reducers: {
    add: (state, action) => {
      let newData;
      if (state.user?.length) {
        newData = state?.user?.find((item) => item.id == action.payload.id);
        if (newData) return state;
        else return { ...state, user: [...state.user, action.payload] };
      } else return { ...state, user: [...state.user, action.payload] };
    },
    itemDelete: (state, action) => {
      return {
        ...state,
        user: state.user.filter((item) => item.id !== action.payload.id),
      };
    },
    editItem: (state, action) => {
      return {
        ...state,
        user: [
          state?.user?.map((item) =>
            item.id == action.payload.id ? action.payload : item,
          ),
        ],
      };
    },
  },
});

const reducerUser = useReducer.reducer;

export const { add, editItem, itemDelete } = useReducer.actions;

export { reducerUser };
