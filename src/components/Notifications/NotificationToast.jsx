import React, { useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X,
} from 'lucide-react';

const NotificationToast = ({ notification }) => {
  const { dismissNotification, markAsRead } = useNotifications();

  useEffect(() => {
    const timer = setTimeout(() => {
      dismissNotification(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, dismissNotification]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  return (
    <div
      className={`flex w-96 items-start space-x-3 rounded-lg border p-4 shadow-lg animate-slide-in ${getStyles()}`}
      onClick={() => markAsRead(notification.id)}
    >
      {getIcon()}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {notification.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {notification.message}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dismissNotification(notification.id);
        }}
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NotificationToast;