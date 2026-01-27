import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import PropertyCard from '../components/Properties/PropertyCard';
import PropertyTable from '../components/Properties/PropertyTable';
import PropertyFilters from '../components/Properties/PropertyFilters';
import EmptyState from '../components/Common/EmptyState';
import LoadingSkeleton from '../components/Common/LoadingSkeleton';
import { Building2, Grid3x3, List, PlusCircle, Search } from 'lucide-react';
import { debounce } from 'lodash';

const Properties = () => {
  const { filters, setFilters, getFilteredProperties } = useProperties();
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const properties = getFilteredProperties();

  // Debounced search
  const debouncedSearch = useCallback(
    // eslint-disable-next-line react-hooks/use-memo
    debounce((value) => {
      setFilters(prev => ({ ...prev, search: value }));
      setIsLoading(false);
    }, 300),
    []
  );

  const handleSearch = (e) => {
    setIsLoading(true);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Properties
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your property listings and view detailed information
          </p>
        </div>
        <Link
          to="/properties/add"
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Property
        </Link>
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties by title or location..."
                defaultValue={filters.search}
                onChange={handleSearch}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* View Toggle */}
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

        {/* Advanced Filters */}
        <PropertyFilters />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold">{properties.length}</span> properties
        </p>
        <PropertyFilters.SortDropdown />
      </div>

      {/* Properties List */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : properties.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <PropertyTable properties={properties} />
        )
      ) : (
        <EmptyState
          icon={Building2}
          title="No properties found"
          description="Try adjusting your search or filter to find what you're looking for."
          action={
            <Link
              to="/properties/add"
              className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Your First Property
            </Link>
          }
        />
      )}
    </div>
  );
};

export default Properties;