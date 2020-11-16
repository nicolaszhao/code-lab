import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(`/api/notifications?since=${latestTimestamp}`);
    return response.notifications;
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload);
      state.sort((a, b) => b.date.localeCompare(a.date));
    },
  },
});

export const selectAllNotifications = state => state.notifications;

export default notificationsSlice.reducer;
