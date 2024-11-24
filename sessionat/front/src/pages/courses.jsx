import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Play, BookOpen, ChevronRight, X, Image, Video } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const getYoutubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const ContentDisplay = ({ type, url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError('Failed to load content');
    setIsLoading(false);
  };

  const handleVideoLoadedMetadata = () => {
    setIsVideoReady(true);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setIsVideoReady(false);
  }, [url]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  switch (type) {
    case 'image':
      return (
        <>
          {isLoading && (
            <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#704e81] border-t-transparent"></div>
            </div>
          )}
          <img
            src={url}
            alt={title}
            className={`w-full h-auto rounded-lg ${isLoading ? 'hidden' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      );
    case 'video':
      const videoId = getYoutubeVideoId(url);
      
      if (videoId) {
        return (
          <div className="relative aspect-video">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#704e81] border-t-transparent"></div>
              </div>
            )}
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleLoad}
            />
          </div>
        );
      } else {
        return (
          <div className="relative">
            {isLoading && !isVideoReady && (
              <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#704e81] border-t-transparent"></div>
              </div>
            )}
            <video
              ref={videoRef}
              className={`w-full rounded-lg ${!isVideoReady ? 'hidden' : ''}`}
              controls
              autoPlay
              muted
              preload="metadata"
              onLoadedMetadata={handleVideoLoadedMetadata}
              onError={handleError}
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }
    case 'text':
      return (
        <div className="prose max-w-none">
          {isLoading && (
            <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#704e81] border-t-transparent"></div>
            </div>
          )}
          <iframe
            src={url}
            title={title}
            className={`w-full min-h-[400px] rounded-lg ${isLoading ? 'hidden' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      );
    default:
      return <p>Unsupported content type</p>;
  }
};

const ImageCard = ({ tip, onClick }) => (
  <div 
    onClick={onClick}
    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="aspect-video bg-gray-100 relative">
      <img 
        src={tip.link || '/api/placeholder/400/300'} 
        alt={tip.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Image className="w-8 h-8 text-white" />
      </div>
    </div>
    <div className="p-4 bg-white">
      <h4 className="text-lg font-semibold mb-2">{tip.title}</h4>
      <p className="text-sm text-gray-500 mb-2">By: {tip.photographer_name || 'Unknown'}</p>
      <span className="text-xs px-3 py-1 bg-[#704e81] text-white rounded-full">
        {tip.category}
      </span>
    </div>
  </div>
);

const TextCard = ({ tip, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-xl border-l-4 border-[#704e81] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-[#704e81]" />
          <h4 className="text-lg font-semibold">{tip.title}</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tip.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By: {tip.photographer_name || 'Unknown'}</span>
          <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
            {tip.category}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-[#704e81] ml-4" />
    </div>
  </div>
);

const Courses = () => {
  const [tips, setTips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipsRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/tips'),
          axios.get('http://localhost:5000/api/categories'),
        ]);
        setTips(tipsRes.data.tips);
        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredTips = tips.filter(
    (tip) =>
      (selectedCategory === 'all' || tip.category === selectedCategory) &&
      tip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const imageTips = filteredTips.filter(tip => tip.type === 'image');
  const textTips = filteredTips.filter(tip => tip.type === 'text');
  const videoTips = filteredTips.filter(tip => tip.type === 'video');

  const handleItemClick = (tip) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    if (!selectedTip) return null;
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{selectedTip.title}</h2>
        <p className="text-gray-600 mb-6">{selectedTip.description}</p>
        <ContentDisplay
          type={selectedTip.type}
          url={selectedTip.link}
          title={selectedTip.title}
        />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mt-32 mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#704e81] mb-4">
          Photography Tips & Resources
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enhance your photoshoot experience with our curated collection of tips, 
          tutorials, and guides. Learn from professionals and make your session remarkable.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search for tips and resources..."
          className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#704e81]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`p-6 rounded-xl border transition-all ${
            selectedCategory === 'all' ? 'border-[#704e81] bg-[#704e81] text-white' : 'border-gray-200 hover:border-[#704e81]'
          }`}
        >
          <h3 className="text-lg font-semibold">All Categories</h3>
        </button>
        {categories.map((category) => (
          <button
            key={category.category_id}
            onClick={() => setSelectedCategory(category.name)}
            className={`p-6 rounded-xl border transition-all ${
              selectedCategory === category.name ? 'border-[#704e81] bg-[#704e81] text-white' : 'border-gray-200 hover:border-[#704e81]'
            }`}
          >
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </button>
        ))}
      </div>

    
      {/* Video Content Section */}
      {videoTips.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#704e81]">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTips.map((tip) => (
              <button
                key={tip.id}
                onClick={() => handleItemClick(tip)}
                className="p-6 border border-gray-200 rounded-xl hover:border-[#704e81] transition-all text-left"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-[#704e81]" />
                      <h4 className="text-lg font-semibold">{tip.title}</h4>
                    </div>
                    <span className="text-sm text-gray-500 mt-2">
                      By: {tip.photographer_name || 'Unknown'}
                    </span>
                  </div>
              <Play className="w-5 h-5 text-[#704e81]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{tip.category}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">Video Tutorial</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

    
      {/* Image Content Section */}
      {imageTips.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#704e81]">Photography Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTips.map((tip) => (
              <ImageCard
                key={tip.id}
                tip={tip}
                onClick={() => handleItemClick(tip)}
              />
            ))}
          </div>
        </div>
      )}

     

    


 {/* Text Content Section */}
      {textTips.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[#704e81]">Articles & Guides</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {textTips.map((tip) => (
              <TextCard
                key={tip.id}
                tip={tip}
                onClick={() => handleItemClick(tip)}
              />
            ))}
          </div>
        </div>
      )}
      {/* No Results Message */}
      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTip(null);
        }}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Courses;