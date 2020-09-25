import { configureStore } from "@reduxjs/toolkit";
import reducer from "./product";

const store = configureStore({
  reducer: reducer,
});

export default store;
