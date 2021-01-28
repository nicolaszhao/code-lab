import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { 
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter(n => !n.read).length;
  let unreadNotificationsBadge;

  if (numUnreadNotifications) {
    unreadNotificationsBadge = (
      <strong className="badge">{numUnreadNotifications}</strong>
    );
  }

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        <div className="nav-content">
          <div className="nav-links">
            <Link to="/">Posts</Link>
            <span> | </span>
            <Link to="/users">Users</Link>
            <span> | </span>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};
