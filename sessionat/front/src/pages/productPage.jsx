import React, { useState } from 'react';
import useGetData from '../Hooks/useGetData';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaShoppingCart, FaSearch, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Products() {
  const { data, loading, error } = useGetData('http://localhost:5000/api/products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState({});

  const itemsPerPage = 8;

  const categories = [
    { id: '', label: 'All' },
    { id: 'camera', label: 'Cameras' },
    { id: 'lens', label: 'Lenses' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'camera bag', label: 'Camera Bags' },
    { id: 'memory card', label: 'Memory Cards' },
    { id: 'others', label: 'Others' }
  ];

  const closeModal = () => setSelectedProduct(null);
  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredData = data
    ?.filter((product) => 
      product.product_name.toLowerCase().includes(searchQuery) && 
      (selectedCategory === '' || product.category === selectedCategory)
    );

  const totalItems = filteredData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuantityChange = (productId, increment, price, stock) => {
    setCart(prevCart => {
      const newQuantity = Math.max(Math.min((prevCart[productId] || 1) + increment, stock), 1);
      return { ...prevCart, [productId]: newQuantity };
    });
  };

  const getTotalPrice = (productId, price) => {
    return (cart[productId] || 1) * price;
  };

  const handleAddToCart = async (product) => {
    const token = Cookies.get('token');

    if (!token) {
      const result = await Swal.fire({
        title: 'Please Log In!',
        text: 'You need to be logged in to add products to the cart.',
        icon: 'warning',
        confirmButtonText: 'Go to Login',
        confirmButtonColor: '#704e81',
        showCancelButton: true,
        cancelButtonText: 'Continue Shopping',
        cancelButtonColor: '#gray',
      });

      if (result.isConfirmed) {
        window.location.href = '/Login';
      }
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart', {
        product_id: product.product_id,
        quantity: cart[product.product_id] || 1,
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        await Swal.fire({
          title: 'Added to Cart!',
          text: `${product.product_name} has been added to your cart.`,
          icon: 'success',
          confirmButtonText: 'Continue Shopping',
          confirmButtonColor: '#704e81',
        });
      }
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#704e81]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-red-500 text-xl">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#704e81] transition-colors"
              />
            </div>
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[#704e81] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedData && paginatedData.map((product) => (
            <div
              key={product.product_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div 
                className="relative h-48 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.image_url} 
                  alt={product.product_name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white bg-[#704e81] px-4 py-2 rounded-full">View Details</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h2 className="font-bold text-xl text-[#704e81] line-clamp-1">{product.product_name}</h2>
                  <p className="text-gray-600 text-sm mt-1 capitalize">{product.category}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold text-[#704e81]">
                    {Number(product.price).toFixed(2)} JD
                  </p>
                  <p className="text-gray-600 text-sm">
                    Stock: {product.stock}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(product.product_id, -1, product.price, product.stock)}
                      className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#704e81] hover:bg-[#704e81] hover:text-white transition duration-200"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{cart[product.product_id] || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(product.product_id, 1, product.price, product.stock)}
                      className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#704e81] hover:bg-[#704e81] hover:text-white transition duration-200"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-[#704e81]">
                    Total: {getTotalPrice(product.product_id, product.price).toFixed(2)} JD
                  </p>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#704e81] text-white px-4 py-2 rounded-lg hover:bg-[#5a3d6a] transition duration-200 flex items-center gap-2"
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-4">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition duration-200 ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#704e81] text-white hover:bg-[#5a3d6a]'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition duration-200 ${
                  currentPage === page
                    ? 'bg-[#704e81] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={`px-6 py-3 rounded-lg font-semibold transition duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#704e81] text-white hover:bg-[#5a3d6a]'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                  onClick={closeModal}
                >
                  <FaTimes size={24} />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={selectedProduct.image_url}
                      alt={selectedProduct.product_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-[#704e81]">
                      {selectedProduct.product_name}
                    </h2>
                    <p className="text-gray-600 capitalize">
                      Category: {selectedProduct.category}
                    </p>
                    <p className="text-2xl font-bold text-[#704e81]">
                      {Number(selectedProduct.price).toFixed(2)} JD
                    </p>
                    <p className="text-gray-600">
                      In Stock: {selectedProduct.stock} units
                    </p>
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-600">
                        {selectedProduct.description || 'No description available.'}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 pt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(selectedProduct.product_id, -1, selectedProduct.price, selectedProduct.stock)}
                          className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#704e81] hover:bg-[#704e81] hover:text-white transition duration-200"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="text-lg font-medium w-8 text-center">
                          {cart[selectedProduct.product_id] || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(selectedProduct.product_id, 1, selectedProduct.price, selectedProduct.stock)}
                          className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#704e81] hover:bg-[#704e81] hover:text-white transition duration-200"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4">
                    <p className="text-lg font-semibold text-[#704e81]">
                        Total: {getTotalPrice(selectedProduct.product_id, selectedProduct.price).toFixed(2)} JD
                      </p>
                      <button 
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          closeModal();
                        }}
                        className="bg-[#704e81] text-white px-6 py-3 rounded-lg hover:bg-[#5a3d6a] transition duration-200 flex items-center gap-2"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {paginatedData && paginatedData.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mt-8">
            <FaSearch className="text-gray-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;