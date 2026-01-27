import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Eye,
  Archive,
} from 'lucide-react';
import { format } from 'date-fns';

const PropertyCard = ({ property }) => {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-lg bg-white shadow transition-transform hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        {property.isArchived && (
          <div className="absolute left-2 top-2">
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
              <Archive className="mr-1 inline h-3 w-3" />
              Archived
            </span>
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              property.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 truncate text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100">
          {property.title}
        </h3>
        <p className="mb-3 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="mr-1 h-4 w-4" />
          {property.location}
        </p>

        {/* Details */}
        <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <DollarSign className="mr-1 h-4 w-4" />
            <span className="font-medium">${property.price}/mo</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bed className="mr-1 h-4 w-4" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Bath className="mr-1 h-4 w-4" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Square className="mr-1 h-4 w-4" />
            <span>{property.area} sq ft</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-3 dark:border-gray-700">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Eye className="mr-1 h-4 w-4" />
            {property.views.toLocaleString()} views
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(property.createdAt), 'MMM dd, yyyy')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;