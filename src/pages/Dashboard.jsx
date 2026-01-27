import React from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import DashboardStats from '../components/Dashboard/DashboardStats';
import AnalyticsChart from '../components/Dashboard/AnalyticsChart';
import RecentProperties from '../components/Dashboard/RecentProperties';
import { 
  Building2, 
  Home, 
  Archive, 
  Calendar, 
  PlusCircle, 
  User  // Added missing imports
} from 'lucide-react';

const Dashboard = () => {
  const { getDashboardStats, getMonthlyAnalytics, getFilteredProperties } = useProperties();
  const stats = getDashboardStats();
  const analytics = getMonthlyAnalytics();
  const recentProperties = getFilteredProperties().slice(0, 5);

  const statCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: Building2,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Active Listings',
      value: stats.activeListings,
      icon: Home,
      color: 'bg-green-500',
      change: '+8%',
      trend: 'up',
    },
    {
      title: 'Archived Listings',
      value: stats.archivedListings,
      icon: Archive,
      color: 'bg-yellow-500',
      change: '-3%',
      trend: 'down',
    },
    {
      title: 'New This Month',
      value: stats.newThisMonth,
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+24%',
      trend: 'up',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>
        <Link
          to="/properties/add"
          className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <DashboardStats key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Monthly Performance
          </h3>
          <AnalyticsChart data={analytics} />
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Properties
          </h3>
          <RecentProperties properties={recentProperties} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Quick Actions
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/properties"
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-primary-500 hover:bg-primary-50 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-primary-900/20"
          >
            <Building2 className="mb-2 h-8 w-8 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              View All Properties
            </span>
          </Link>
          <Link
            to="/properties/add"
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-primary-500 hover:bg-primary-50 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-primary-900/20"
          >
            <PlusCircle className="mb-2 h-8 w-8 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Add New Property
            </span>
          </Link>
          <Link
            to="/archived"
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-primary-500 hover:bg-primary-50 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-primary-900/20"
          >
            <Archive className="mb-2 h-8 w-8 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              View Archived
            </span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-primary-500 hover:bg-primary-50 dark:border-gray-600 dark:hover:border-primary-500 dark:hover:bg-primary-900/20"
          >
            <User className="mb-2 h-8 w-8 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Update Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;