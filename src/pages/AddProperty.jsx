import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import { useNotifications } from '../contexts/NotificationContext';
import MultiStepForm from '../components/Properties/MultiStepForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, addProperty, updateProperty } = useProperties();
  const { addNotification } = useNotifications();
  const [property, setProperty] = useState(null);
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const existingProperty = getPropertyById(id);
      if (existingProperty) {
        setProperty(existingProperty);
      } else {
        navigate('/properties');
      }
    }
  }, [id, isEditMode, getPropertyById, navigate]);

  const handleSubmit = (formData) => {
    if (isEditMode) {
      updateProperty(id, formData);
      addNotification({
        type: 'success',
        title: 'Property Updated',
        message: 'Property has been successfully updated.',
      });
    } else {
      const newProperty = addProperty(formData);
      addNotification({
        type: 'success',
        title: 'Property Added',
        message: 'New property has been added successfully.',
      });
    }
    navigate('/properties');
  };

  const steps = [
    {
      title: 'Basic Information',
      fields: ['title', 'description', 'location', 'price', 'status'],
    },
    {
      title: 'Property Details',
      fields: ['type', 'bedrooms', 'bathrooms', 'area', 'amenities'],
    },
    {
      title: 'Images',
      fields: ['images'],
    },
    {
      title: 'Review',
      fields: [],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/properties"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isEditMode ? 'Edit Property' : 'Add New Property'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditMode
                ? 'Update property information'
                : 'Fill in the details to add a new property'}
            </p>
          </div>
        </div>
      </div>

      {/* Multi-step Form */}
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <MultiStepForm
          steps={steps}
          initialData={property || {}}
          onSubmit={handleSubmit}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default AddProperty;