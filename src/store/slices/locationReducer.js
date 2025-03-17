import { createSlice } from '@reduxjs/toolkit';

const path = window.location.hash.replace('#', '') || '/';

export const locationReducer = createSlice({
  name: 'location',

  initialState: {
    value: path,
  },

  reducers: {
    change: (state, action) => {
      console.log('location change', state, action);
      state.value = action.payload;
    },
  },
});

export const { change } = locationReducer.actions;

export default locationReducer.reducer;
