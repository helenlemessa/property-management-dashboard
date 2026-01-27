import React from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Bell, CheckCircle, XCircle, AlertCircle, Info, Check } from 'lucide-react';
import { format } from 'date-fns';

const NotificationPanel = ({ onClose }) => {
  const { notifications, notificationHistory, markAsRead, clearAllNotifications } =
    useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 z-40 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b px-4 py-3 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Notifications
            </h3>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y dark:divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex space-x-3">
                  {getIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(notification.timestamp), 'MMM dd, h:mm a')}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No new notifications
            </p>
          </div>
        )}
      </div>

      {/* Footer - View All Link */}
      {notificationHistory.length > 0 && (
        <div className="border-t px-4 py-3 dark:border-gray-700">
          <button
            onClick={() => {
              // Navigate to notification history page
              onClose();
            }}
            className="w-full text-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;