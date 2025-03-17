import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalReducer';
import locationReducer from './slices/locationReducer';

export default configureStore({
  reducer: {
    global: globalReducer,
    location: locationReducer,
  },
});
