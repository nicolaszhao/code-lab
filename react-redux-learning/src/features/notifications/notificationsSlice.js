import { 
  createSlice, 
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '../../api/client';

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

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
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true;
      });
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read;
      });
      notificationsAdapter.upsertMany(state, action.payload);
    },
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors(state => state.notifications);

export default notificationsSlice.reducer;
