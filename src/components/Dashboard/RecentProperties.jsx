import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const RecentProperties = ({ properties }) => {
  return (
    <div className="space-y-3">
      {properties.map((property) => (
        <Link
          key={property.id}
          to={`/properties/${property.id}`}
          className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex items-center space-x-4">
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {property.title}
              </h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {property.location.split(',')[0]}
                </span>
                <span className="flex items-center">
                  <DollarSign className="mr-1 h-3 w-3" />
                  ${property.price}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Eye className="mr-1 h-3 w-3" />
              {property.views}
            </span>
            <span className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {format(new Date(property.createdAt), 'MMM dd')}
            </span>
          </div>
        </Link>
      ))}
      {properties.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No recent properties</p>
        </div>
      )}
    </div>
  );
};

export default RecentProperties;