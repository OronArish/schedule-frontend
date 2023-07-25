import { createSlice, configureStore } from "@reduxjs/toolkit";


let user = false;
export const userReduce = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    setUserHander(state, action) {
      user = action.payload.role
      state = action.payload.role
      return action.payload.role
      
    },
  },
});

const store = configureStore({
  reducer: {
    user: userReduce.reducer,
  },
});

export const { setUserHander } =
  userReduce.actions;

export default store;