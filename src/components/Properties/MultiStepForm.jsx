import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BasicInfoStep from './form-steps/BasicInfoStep';
import PropertyDetailsStep from './form-steps/PropertyDetailsStep';
import ImagesStep from './form-steps/ImagesStep';
import ReviewStep from './form-steps/ReviewStep';

const MultiStepForm = ({ steps, initialData, onSubmit, isEditMode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    type: 'apartment',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'active',
    amenities: [],
    images: [],
    ...initialData,
  });

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep data={formData} onChange={setFormData} />;
      case 1:
        return <PropertyDetailsStep data={formData} onChange={setFormData} />;
      case 2:
        return <ImagesStep data={formData} onChange={setFormData} />;
      case 3:
        return <ReviewStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  index <= currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  index <= currentStep
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`ml-2 h-0.5 w-8 ${
                    index < currentStep
                      ? 'bg-primary-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div>{renderStep()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between border-t pt-6 dark:border-gray-700">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {isEditMode ? 'Update Property' : 'Add Property'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;