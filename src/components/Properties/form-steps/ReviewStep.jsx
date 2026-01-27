import React from 'react';
import {
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  CheckCircle,
} from 'lucide-react';

const ReviewStep = ({ data }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
              Ready to Submit
            </h3>
            <p className="mt-1 text-sm text-green-700 dark:text-green-400">
              Review all information before submitting your property listing.
            </p>
          </div>
        </div>
      </div>

      {/* Property Summary */}
      <div className="rounded-lg border dark:border-gray-700">
        {/* Header */}
        <div className="border-b px-6 py-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {data.title || 'Property Title'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{data.location}</p>
        </div>

        {/* Details Grid */}
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Home className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {data.type?.charAt(0).toUpperCase() + data.type?.slice(1)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(data.price || 0)}/month
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Bed className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {data.bedrooms || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Bath className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {data.bathrooms || 0}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Square className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Area</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {data.area?.toLocaleString() || 0} sq ft
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {data.status?.charAt(0).toUpperCase() + data.status?.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {data.description && (
          <div className="border-t px-6 py-4 dark:border-gray-700">
            <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </h4>
            <p className="text-gray-600 dark:text-gray-300">{data.description}</p>
          </div>
        )}

        {/* Amenities */}
        {data.amenities && data.amenities.length > 0 && (
          <div className="border-t px-6 py-4 dark:border-gray-700">
            <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Images */}
        {data.images && data.images.length > 0 && (
          <div className="border-t px-6 py-4 dark:border-gray-700">
            <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Images ({data.images.length})
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {data.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="h-20 w-full rounded object-cover"
                />
              ))}
              {data.images.length > 4 && (
                <div className="flex h-20 items-center justify-center rounded bg-gray-100 text-sm text-gray-500 dark:bg-gray-700">
                  +{data.images.length - 4} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;