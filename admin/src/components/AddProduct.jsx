import axios from 'axios';
import React, { useState } from 'react';
import NavBar from './NavBar';

const AddProduct = () => {
  const [response, setResponse] = useState('');
  const [product, setProduct] = useState({
    desc: '',
    category: '',
    files: null,
    price: ''
  });

  const productHandler = (event) => {
    const { name, value, files } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'files' ? files[0] : value
    }));
  };

  const addProductHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('desc', product.desc);
    formData.append('category', product.category);
    formData.append('files', product.files);
    formData.append('price', product.price);
    
    try {
      const res = await axios.post('http://localhost:3000/abc/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(res.data.message);
      setProduct({
        desc: '',
        category: '',
        files: null,
        price: ''
      });
    } catch (error) {
      setResponse(error.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto my-12 p-6 sm:p-8 bg-white rounded-lg shadow-xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Add New Product</h1>
        <form onSubmit={addProductHandler} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="desc" className="block text-base sm:text-lg font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              id="desc"
              name="desc"
              value={product.desc}
              onChange={productHandler}
              required
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="block text-base sm:text-lg font-semibold text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={productHandler}
              required
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Select a Category</option>
              <option value="food">Food</option>
              <option value="electronic device">Electronic Device</option>
              <option value="cloth">Cloth</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="files" className="block text-base sm:text-lg font-semibold text-gray-700">Product Image</label>
            <input
              accept=".png,.jpg,.jpeg"
              type="file"
              id="files"
              name="files"
              onChange={productHandler}
              required
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="price" className="block text-base sm:text-lg font-semibold text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={productHandler}
              required
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <p className='mt-4 text-center text-green-500 text-lg sm:text-xl animate-bounce'>{response}</p>
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;