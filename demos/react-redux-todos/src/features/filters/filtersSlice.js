import { createSlice } from '@reduxjs/toolkit';

export const StatusFilters = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
};

export const ColorsFilters = {
  Green: 'green',
  Blue: 'blue',
  Orange: 'orange',
  Purple: 'purple',
  Red: 'red',
};

const initialState = {
  status: StatusFilters.All,
  colors: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload;
    },
    colorFilterChanged(state, action) {
      state.colors = action.payload.changeType === 'selected' 
        ? [...state.colors, action.payload.color]
        : state.colors.filter(color => color !== action.payload.color);
    },
  },
});

export const {
  statusFilterChanged,
  colorFilterChanged,
} = filtersSlice.actions;

export default filtersSlice.reducer;
