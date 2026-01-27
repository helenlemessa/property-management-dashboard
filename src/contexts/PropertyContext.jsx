import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProperties, propertyTypes } from '../data/mockData';

const PropertyContext = createContext();

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('properties');
    return saved ? JSON.parse(saved) : mockProperties;
  });

  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
  });

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const getPropertyById = (id) => {
    return properties.find(property => property.id === id);
  };

  const addProperty = (property) => {
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      views: Math.floor(Math.random() * 1000),
      isArchived: false,
    };
    setProperties(prev => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id, updates) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === id ? { ...property, ...updates } : property
      )
    );
  };

  const archiveProperty = (id) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === id ? { ...property, isArchived: true } : property
      )
    );
  };

  const restoreProperty = (id) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === id ? { ...property, isArchived: false } : property
      )
    );
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  };

  const getFilteredProperties = () => {
    let filtered = [...properties];

    // Apply search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(property =>
        filters.status === 'active' ? !property.isArchived : property.isArchived
      );
    } else {
      // Default to active properties only
      filtered = filtered.filter(property => !property.isArchived);
    }

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    // Apply price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= Number(filters.maxPrice));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    return filtered;
  };

  const getDashboardStats = () => {
    const totalProperties = properties.length;
    const activeListings = properties.filter(p => !p.isArchived).length;
    const archivedListings = properties.filter(p => p.isArchived).length;
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const newThisMonth = properties.filter(p => 
      new Date(p.createdAt) >= thisMonth && !p.isArchived
    ).length;

    return {
      totalProperties,
      activeListings,
      archivedListings,
      newThisMonth,
    };
  };

  const getMonthlyAnalytics = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return months.slice(Math.max(0, currentMonth - 5), currentMonth + 1).map((month, index) => ({
      month,
      views: Math.floor(Math.random() * 1000) + 500,
      listings: Math.floor(Math.random() * 20) + 10,
    }));
  };

  const value = {
    properties,
    filters,
    setFilters,
    getPropertyById,
    addProperty,
    updateProperty,
    archiveProperty,
    restoreProperty,
    deleteProperty,
    getFilteredProperties,
    getDashboardStats,
    getMonthlyAnalytics,
    propertyTypes,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};