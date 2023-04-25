import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./modules/users";

const store = configureStore({
  reducer: {
    user: userReducer
  }
})
export default store