import { configureStore } from "@reduxjs/toolkit";
import demands from "@/reducers/demands";

const store = configureStore({
  reducer: {
    demands,
  },
});

export default store;
