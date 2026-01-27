import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import { useNotifications } from '../contexts/NotificationContext';
import ImageGallery from '../components/Properties/ImageGallery';
import ConfirmationModal from '../components/Common/ConfirmationModal';
import LoadingSkeleton from '../components/Common/LoadingSkeleton';
import {
  ArrowLeft,
  Edit,
  Archive,
  Trash2,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  Eye,
} from 'lucide-react';
import { format } from 'date-fns';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getPropertyById,
    archiveProperty,
    restoreProperty,
    deleteProperty,
  } = useProperties();
  const { addNotification } = useNotifications();
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const property = getPropertyById(id);

  if (!property) {
    return <LoadingSkeleton />;
  }

  const handleArchive = () => {
    if (property.isArchived) {
      restoreProperty(id);
      addNotification({
        type: 'success',
        title: 'Property Restored',
        message: 'Property has been restored successfully.',
      });
    } else {
      archiveProperty(id);
      addNotification({
        type: 'warning',
        title: 'Property Archived',
        message: 'Property has been moved to archive.',
      });
    }
    setShowArchiveModal(false);
  };

  const handleDelete = () => {
    deleteProperty(id);
    addNotification({
      type: 'error',
      title: 'Property Deleted',
      message: 'Property has been permanently deleted.',
    });
    setShowDeleteModal(false);
    navigate('/properties');
  };

  const details = [
    {
      icon: MapPin,
      label: 'Location',
      value: property.location,
    },
    {
      icon: DollarSign,
      label: 'Price',
      value: `$${property.price.toLocaleString()}/month`,
    },
    {
      icon: Home,
      label: 'Type',
      value: property.type.charAt(0).toUpperCase() + property.type.slice(1),
    },
    {
      icon: Bed,
      label: 'Bedrooms',
      value: property.bedrooms,
    },
    {
      icon: Bath,
      label: 'Bathrooms',
      value: property.bathrooms,
    },
    {
      icon: Square,
      label: 'Area',
      value: `${property.area} sq ft`,
    },
    {
      icon: Calendar,
      label: 'Listed On',
      value: format(new Date(property.createdAt), 'MMM dd, yyyy'),
    },
    {
      icon: Eye,
      label: 'Views',
      value: property.views.toLocaleString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start space-x-4">
          <Link
            to="/properties"
            className="mt-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {property.title}
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  property.isArchived
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}
              >
                {property.isArchived ? 'Archived' : 'Active'}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Property details and management options
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/properties/edit/${id}`}
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Property
          </Link>
          <button
            onClick={() => setShowArchiveModal(true)}
            className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2.5 text-sm font-medium text-yellow-700 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30 dark:focus:ring-offset-gray-800"
          >
            <Archive className="mr-2 h-4 w-4" />
            {property.isArchived ? 'Restore' : 'Archive'}
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-700 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 dark:focus:ring-offset-gray-800"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="rounded-lg bg-white shadow dark:bg-gray-800">
        <ImageGallery images={property.images} title={property.title} />
      </div>

      {/* Property Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Property Details
            </h2>
            <div className="space-y-4">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <detail.icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {detail.label}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Timeline */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Status History
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Created
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {format(new Date(property.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
              {property.updatedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last Updated
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {format(new Date(property.updatedAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        onConfirm={handleArchive}
        title={`${property.isArchived ? 'Restore' : 'Archive'} Property`}
        message={`Are you sure you want to ${
          property.isArchived ? 'restore' : 'archive'
        } this property? ${
          property.isArchived
            ? 'It will be visible in the active listings.'
            : 'It will be moved to the archive.'
        }`}
        confirmText={property.isArchived ? 'Restore' : 'Archive'}
        variant={property.isArchived ? 'success' : 'warning'}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Property"
        message="Are you sure you want to permanently delete this property? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default PropertyDetail;