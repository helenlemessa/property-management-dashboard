import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import { useNotifications } from '../contexts/NotificationContext';
import PropertyCard from '../components/Properties/PropertyCard';
import PropertyTable from '../components/Properties/PropertyTable';
import ConfirmationModal from '../components/Common/ConfirmationModal';
import EmptyState from '../components/Common/EmptyState';
import {
  Archive,
  RotateCcw,
  Trash2,
  Search,
  Filter,
  Grid3x3,
  List,
  ArrowLeft,
} from 'lucide-react';

const ArchivedProperties = () => {
  const { properties, restoreProperty, deleteProperty, setFilters } = useProperties();
  const { addNotification } = useNotifications();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [restoreModal, setRestoreModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  // Filter only archived properties
  const archivedProperties = properties.filter(property => property.isArchived);

  // Apply search filter
  const filteredProperties = archivedProperties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestore = (propertyId) => {
    restoreProperty(propertyId);
    addNotification({
      type: 'success',
      title: 'Property Restored',
      message: 'Property has been restored successfully.',
    });
    setRestoreModal(null);
  };

  const handleDelete = (propertyId) => {
    deleteProperty(propertyId);
    addNotification({
      type: 'error',
      title: 'Property Deleted',
      message: 'Property has been permanently deleted.',
    });
    setDeleteModal(null);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/properties"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Archived Properties
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage your archived property listings
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Archived</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {archivedProperties.length}
              </p>
            </div>
            <Archive className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 Days</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {archivedProperties.filter(p => {
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return new Date(p.updatedAt) > thirtyDaysAgo;
                }).length}
              </p>
            </div>
            <Filter className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Space Used</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.round((archivedProperties.length / properties.length) * 100)}%
              </p>
            </div>
            <Archive className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search archived properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-4">
            {searchQuery && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Clear filters
              </button>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
              <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded p-2 ${
                    viewMode === 'grid'
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`rounded p-2 ${
                    viewMode === 'table'
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold">{filteredProperties.length}</span> archived properties
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Properties List */}
      {filteredProperties.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProperties.map((property) => (
              <div key={property.id} className="relative">
                <PropertyCard property={property} />
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setRestoreModal(property)}
                    className="rounded-full bg-green-100 p-2 text-green-600 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
                    title="Restore property"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteModal(property)}
                    className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                    title="Delete permanently"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white shadow dark:bg-gray-800">
            <PropertyTable
              properties={filteredProperties}
              showActions={true}
              onRestore={(property) => setRestoreModal(property)}
              onDelete={(property) => setDeleteModal(property)}
            />
          </div>
        )
      ) : (
        <EmptyState
          icon={Archive}
          title={searchQuery ? "No matching properties" : "No archived properties"}
          description={
            searchQuery
              ? "Try adjusting your search to find what you're looking for."
              : "Properties you archive will appear here. Archived properties are hidden from the main listings."
          }
          action={
            !searchQuery && (
              <Link
                to="/properties"
                className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Properties
              </Link>
            )
          }
        />
      )}

      {/* Archive Info */}
      {archivedProperties.length > 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <div className="flex">
            <Archive className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                About Archived Properties
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                <p>
                  Archived properties are hidden from active listings but can be restored at any time.
                  This is useful for seasonal properties, properties under renovation, or listings you
                  want to temporarily hide.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {restoreModal && (
        <ConfirmationModal
          isOpen={!!restoreModal}
          onClose={() => setRestoreModal(null)}
          onConfirm={() => handleRestore(restoreModal.id)}
          title="Restore Property"
          message={`Are you sure you want to restore "${restoreModal.title}"? It will be moved back to active listings.`}
          confirmText="Restore"
          variant="success"
        />
      )}

      {deleteModal && (
        <ConfirmationModal
          isOpen={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          onConfirm={() => handleDelete(deleteModal.id)}
          title="Delete Property Permanently"
          message={`Are you sure you want to permanently delete "${deleteModal.title}"? This action cannot be undone and all property data will be lost.`}
          confirmText="Delete Permanently"
          variant="danger"
        />
      )}
    </div>
  );
};

export default ArchivedProperties;