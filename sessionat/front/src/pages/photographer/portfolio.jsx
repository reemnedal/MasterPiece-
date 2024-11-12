import React, { useState, useEffect } from 'react';

const ProfilePortfolio = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pho/profilePortfolio', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.photographer_images) {
        setImages(data.photographer_images);
      }
    } catch (err) {
      setError('Error fetching images');
    }
  };
  

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate files
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      setError('Please select only image files');
      return;
    }

    setSelectedFiles(validFiles);

    // Create preview URLs
    const urls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setError(null);
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
        body: formData
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

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 text-sm font-medium mb-2">Select Images</span>
            <input
              type="file"
              onChange={handleFileSelect}
              multiple
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
                cursor-pointer"
            />
          </label>

          {/* Preview Section */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!selectedFiles.length || loading}
            className={`w-full px-4 py-2 rounded-lg font-medium text-white 
              ${!selectedFiles.length || loading 
                ? 'bg-purple-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 transition-colors'}
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload Images'
            )}
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={image.image_id || index} className="relative aspect-square group">
            <img
              src={`http://localhost:5000${image.img_url}`}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePortfolio;