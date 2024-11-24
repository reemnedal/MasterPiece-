import React, { useState, useEffect } from 'react';

const ProfilePortfolio = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pho/profilePortfolio', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.photographer_images) {
        setImages(data.photographer_images);
      }
    } catch (err) {
      setError('Error fetching images');
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pho/deleteImage/${imageId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Error deleting image');
      }
      setImages(images.filter(image => image.image_id !== imageId));
    } catch (err) {
      setError('Error deleting image');
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      setError('Please select only image files');
      return;
    }

    setSelectedFiles(validFiles);
    const urls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      setError('Please select files to upload');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/pho/uploadMultipleImages', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const newImages = await response.json();
      setImages(prev => [...prev, ...newImages]);
      setSelectedFiles([]);
      setPreviewUrls([]);
      setError(null);
    } catch (err) {
      setError('Error uploading images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start">
          <svg
            className="w-5 h-5 text-red-500 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-3 text-red-700">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              isDragging
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            <input
              type="file"
              onChange={handleFileSelect}
              multiple
              accept="image/*"
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer block"
            >
              <svg
                className="mx-auto h-4 w-12 text-purple-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-700">
                  Drop your images here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports: JPG, PNG, GIF (Max 10MB each)
                </p>
              </div>
            </label>
          </div>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square group overflow-hidden rounded-lg shadow-md"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFiles.length || loading}
            className={`w-full px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all duration-300
              ${
                !selectedFiles.length || loading
                  ? 'bg-[#704e81] cursor-not-allowed'
                  : 'bg-[#704e81] hover:bg-[#704e81] hover:shadow-xl active:scale-95'
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span>Upload Images</span>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={image.image_id || index}
            className="relative aspect-square group overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={`http://localhost:5000${image.img_url}`}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <button
              onClick={() => handleDeleteImage(image.image_id)}
              className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 transform hover:scale-110"
              aria-label="Delete image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePortfolio;