import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Home = () => {
  const [search, setSearch] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [edited, setEdited] = useState({
    productId: '',
    price: '',
    desc: '',
  });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/abc/fetchProducts');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('There was an issue fetching the products.');
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const editProduct = async (id) => {
    edited.productId = id;
    try {
      await axios.patch('http://localhost:3000/abc/editProduct', edited);
      window.location.reload();      
      setEditProductId(null); 
    } catch (error) {
      console.error(error.response?.data?.message || 'There was an issue editing');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const value = prompt('Are you sure you want to delete this product? (yes/no)');
      if (value !== 'yes') return;
      await axios.delete('http://localhost:3000/abc/deleteProduct', { data: { productId } });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error(error.response?.data?.message || 'There was an issue deleting the product');
    }
  };

  const handleEditClick = (productId) => {
    setEditProductId(editProductId === productId ? null : productId);
    setEdited(products.find((product) => product._id === productId) || {});
  };

  return (
    <div className='mt-20 px-4'>
      <NavBar />
      <div className='flex justify-center mb-4'>
        <input
          type='search'
          placeholder='Search product...'
          className='w-full max-w-sm h-10 px-3 py-2 text-red-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='flex flex-wrap justify-center gap-6 w-full'>
        {products.filter((product) => 
          search.toLowerCase() === '' ? product : product.desc.toLowerCase().includes(search)
        ).map((product) => (
          <div
            key={product._id}
            className='flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:bg-gray-100 w-full sm:w-80'
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCyeaNZhi9pxUHnqmr-5faSYhaQAWCR2PnhA&s"
              alt='Product'
              className='w-full h-40 object-cover rounded-t-lg mb-4'
            />
            {editProductId === product._id ? (
              <div className='flex flex-col w-full'>
                <input
                  type='text'
                  value={edited.desc}
                  name='desc'
                  placeholder='Product Description'
                  onChange={handleInput}
                  className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2'
                />
                <input
                  type='number'
                  value={edited.price}
                  name='price'
                  placeholder='Price'
                  onChange={handleInput}
                  className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2'
                />
              </div>
            ) : (
              <div className='text-center'>
                <p className='text-black font-semibold mb-2'>Product: {product.desc}</p>
                <p className='text-green-500 font-semibold'><b>Price: </b>{product.price} Birr</p>
              </div>
            )}
            <div className='flex items-center space-x-4 mt-2'>
              {editProductId === product._id && (
                <button
                  onClick={() => editProduct(product._id)}
                  className='bg-blue-500 text-white px-2 py-1 rounded'
                >
                  Save
                </button>
              )}
              <button onClick={() => deleteProduct(product._id)} className='text-red-500 text-xl'>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={() => handleEditClick(product._id)} className='text-blue-500 text-xl'>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;