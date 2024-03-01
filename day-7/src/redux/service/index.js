import { todoApi } from "./todo-api";
import { userApi } from "./user-api";

export const apiReducer = {
  [userApi.reducerPath]: userApi.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
};

export default [userApi, todoApi];
