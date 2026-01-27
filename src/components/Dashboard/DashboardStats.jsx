import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardStats = ({ title, value, icon: Icon, color, change, trend }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          <div className="mt-2 flex items-center">
            {trend === 'up' ? (
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
              from last month
            </span>
          </div>
        </div>
        <div className={`rounded-lg ${color} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;