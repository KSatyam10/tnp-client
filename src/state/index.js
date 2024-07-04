// src/state/index.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    resetUser: (state) => {
      state.email = '';
      state.role = '';
    },
  },
});

export const { setUser, setRole, resetUser } = userSlice.actions;
export default userSlice.reducer;
