import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImagesStep = ({ data, onChange }) => {
  const [previewUrls, setPreviewUrls] = useState(data.images || []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newUrls]);
    onChange({ ...data, images: [...previewUrls, ...newUrls] });
  };

  const removeImage = (index) => {
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newUrls);
    onChange({ ...data, images: newUrls });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Property Images
        </label>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload images of your property. The first image will be used as the main thumbnail.
        </p>
      </div>

      {/* Image Preview Grid */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Property ${index + 1}`}
                className="h-32 w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -right-2 -top-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
              {index === 0 && (
                <span className="absolute left-2 top-2 rounded bg-primary-600 px-2 py-1 text-xs font-medium text-white">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div className="mt-4">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 hover:border-primary-500 dark:border-gray-600">
          <Upload className="h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            Click to upload images
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Image Tips */}
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <div className="flex">
          <ImageIcon className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Image Tips
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
              <ul className="list-disc space-y-1 pl-5">
                <li>Use high-quality, well-lit photos</li>
                <li>Include photos of all rooms and exterior</li>
                <li>First image should be the best overall shot</li>
                <li>Recommended size: 1200x800 pixels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesStep;