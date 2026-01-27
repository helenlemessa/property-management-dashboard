import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  DollarSign,
  Eye,
  Calendar,
  Archive,
  Edit,
  MoreVertical,
} from 'lucide-react';
import { format } from 'date-fns';

const PropertyTable = ({ properties, showActions, onRestore, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Property
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Views
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Listed
            </th>
            {showActions && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-gray-700">
          {properties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3">
                <Link
                  to={`/properties/${property.id}`}
                  className="flex items-center space-x-3"
                >
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {property.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {property.type}
                    </p>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="mr-1 h-4 w-4" />
                  {property.location.split(',')[0]}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                  <DollarSign className="mr-1 h-4 w-4" />
                  ${property.price.toLocaleString()}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Eye className="mr-1 h-4 w-4" />
                  {property.views.toLocaleString()}
                </div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    property.isArchived
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : property.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {property.isArchived ? 'Archived' : property.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {format(new Date(property.createdAt), 'MMM dd, yyyy')}
                </div>
              </td>
              {showActions && (
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {onRestore && (
                      <button
                        onClick={() => onRestore(property)}
                        className="rounded-lg p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                        title="Restore"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    )}
                    <Link
                      to={`/properties/edit/${property.id}`}
                      className="rounded-lg p-2 text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(property)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {properties.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">No properties found</p>
        </div>
      )}
    </div>
  );
};

export default PropertyTable;