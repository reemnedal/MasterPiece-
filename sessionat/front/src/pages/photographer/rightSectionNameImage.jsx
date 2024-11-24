import React, { useEffect, useState } from 'react';

const RightSection = () => {
  const [photographerData, setPhotographerData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchPhotographerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pho/phoProfile', {
          credentials: 'include'
        });
        const data = await response.json();
        setPhotographerData(data);
        setEditData(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching photographer data");
        setLoading(false);
      }
    };
    fetchPhotographerData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('profile_pic', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/pho/uploadProfilePic', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      const data = await response.json();
      
      if (response.ok) {
        setPhotographerData(prev => ({ ...prev, profile_pic: data.profile_pic }));
        setSelectedFile(null);
        setError(null);
      } else {
        throw new Error(data.message || "Failed to upload photo");
      }
    } catch (err) {
      setError("Error uploading photo");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto   rounded-lg   overflow-hidden">
      {/* Error Alert */}
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

      {/* Profile Content */}
      <div className="p-6">
        {photographerData && (
          <div className="text-center">
            {/* Profile Image */}
            <div className="relative inline-block">
              <img
                src={`http://localhost:5000${photographerData.profile_pic}`}
                alt={photographerData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 mx-auto mb-4"
              />
              {/* Camera Icon */}
              <div className="absolute -bottom-2 -right-2 bg-purple-100 p-2 rounded-full border-2 border-purple-200">
                <svg 
                  className="w-4 h-4 text-purple-600" 
                  fill="none" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {photographerData.name}
              </h2>
              <p className="text-purple-700 font-medium">{photographerData.role}</p>
              <p className="text-purple-600">{photographerData.city}</p>
              {photographerData.rating && (
                <div className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  ★ {photographerData.rating}
                </div>
              )}
            </div>

            {/* Upload Section */}
            <div className="space-y-4">
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100
                    cursor-pointer"
                  accept="image/*"
                />
              </label>

              {selectedFile && (
                <div className="text-sm text-gray-600">
                  Selected: {selectedFile.name}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`w-full px-4 py-2 rounded-lg font-medium text-white 
                  ${!selectedFile || uploading 
                    ? 'bg-[#704e81] cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 transition-colors'}
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
              >
                {uploading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  'Upload New Photo'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;