 

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, DollarSign, MapPin, Clock, Camera } from "lucide-react";

function Catalog() {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("session_date");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Set to 3 for pagination
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/catalog");
      setSessions(response.data);
      console.log("Session Data:", response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredAndSortedSessions = () => {
    let filtered = sessions;
    if (searchTerm) {
      filtered = sessions.filter((session) =>
        session.photographer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.session_place.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return [...filtered].sort((a, b) => {
      if (sortOption === "price") {
        return a.price - b.price;
      }
      if (sortOption === "session_date") {
        return new Date(a.session_date) - new Date(b.session_date);
      }
      return 0;
    });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = (event) => {
    const option = event.target.value;
    setSortOption(option);
    setCurrentPage(1);
  };

  const handleViewDetails = (phoId) => {
    navigate(`/pp/${phoId}`);
  };

  const filteredAndSortedSessions = getFilteredAndSortedSessions();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedSessions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAndSortedSessions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="mt-20 min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#704e81] mb-4">
            Capture Your Perfect Moment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book professional photography sessions tailored to your story
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by photographer or location..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-purple-100 focus:border-[#704e81] focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
              />
            </div>
            <select
              value={sortOption}
              onChange={handleSort}
              className="px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-[#704e81] focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300 bg-white"
            >
              <option value="session_date">Sort by Date</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>

          <div className="mt-4 text-center text-gray-600">
            Found {filteredAndSortedSessions.length} photography sessions
          </div>
        </div>

        {/* Sessions Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#704e81] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((session) => (
              <div
                key={session.session_id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="text-[#704e81]" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold text-[#704e81]">
                        {session.photographer_name}
                      </h3>
                      <div className="flex items-center text-gray-500 mt-1">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{session.session_place}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>{session.session_date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>{session.time_from} - {session.time_to}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={16} className="mr-2" />
                      <span>${session.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      session.status === 'Available' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {session.status}
                    </span>
                    <button
                      onClick={() => handleViewDetails(session.photographer_id)}
                      className="bg-[#704e81] text-white px-6 py-2 rounded-lg hover:bg-[#604371] transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#704e81] text-white hover:bg-[#604371]'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                    currentPage === index + 1
                      ? 'bg-[#604371] text-white'
                      : 'bg-[#704e81] text-white hover:bg-[#604371]'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#704e81] text-white hover:bg-[#604371]'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Catalog;
