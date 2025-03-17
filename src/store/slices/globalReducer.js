import { createSlice } from '@reduxjs/toolkit';

export const globalReducer = createSlice({
  name: 'global',

  initialState: {
    theme: 'light',
    sidebarStatus: 1,
  },

  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },

    changeSidebarStatus: (state, action) => {
      state.sidebarStatus = action.payload;
    },
  },
});

export const { changeTheme, changeSidebarStatus } = globalReducer.actions;

export default globalReducer.reducer;
