import React from 'react';
import { propertyTypes } from '../../../data/mockData';

const PropertyDetailsStep = ({ data, onChange }) => {
  const amenitiesList = [
    'Parking', 'Gym', 'Pool', 'Pet Friendly', 'Garden', 'Security',
    'Elevator', 'Balcony', 'Fireplace', 'Air Conditioning'
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Property Type
          </label>
          <select
            value={data.type || 'apartment'}
            onChange={(e) => onChange({ ...data, type: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            value={data.status || 'active'}
            onChange={(e) => onChange({ ...data, status: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bedrooms
          </label>
          <input
            type="number"
            value={data.bedrooms || ''}
            onChange={(e) => onChange({ ...data, bedrooms: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bathrooms
          </label>
          <input
            type="number"
            value={data.bathrooms || ''}
            onChange={(e) => onChange({ ...data, bathrooms: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="0"
            step="0.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Area (sq ft)
          </label>
          <input
            type="number"
            value={data.area || ''}
            onChange={(e) => onChange({ ...data, area: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            min="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amenities
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                checked={data.amenities?.includes(amenity) || false}
                onChange={(e) => {
                  const amenities = data.amenities || [];
                  if (e.target.checked) {
                    onChange({ ...data, amenities: [...amenities, amenity] });
                  } else {
                    onChange({
                      ...data,
                      amenities: amenities.filter(a => a !== amenity),
                    });
                  }
                }}
                className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsStep;