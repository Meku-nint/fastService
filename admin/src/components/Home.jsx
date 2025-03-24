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
  const handleInput = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
  const editProduct = async (id) => {
    edited.productId = id;
    try {
      const res = await axios.patch('http://localhost:3000/abc/editProduct', edited);
      console.log(res.data.message);
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

      const res = await axios.delete('http://localhost:3000/abc/deleteProduct', {
        data: { productId },
      });
      alert(res.data.message);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error(error.response?.data?.message || 'There was an issue deleting the product');
    }
  };

  const handleEditClick = (productId) => {
    if (editProductId === productId) {
      setEditProductId(null);
    } else {
      setEditProductId(productId);
      setEdited(products.find((product) => product._id === productId));
    }
  };

  return (
    <div className='mt-20'>
          <NavBar/>
      <input type="search"placeholder='search by product name' className='w-1/6 h-10 left-1/2 px-3 py-2  text-red-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setSearch(e.target.value)} />
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {products
        .filter((product)=>{
         return search.toLowerCase()===''?product:product.desc.toLowerCase().includes(search);
        })
        .map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center justify-center p-4 m-4 bg-gray-200 rounded-lg shadow-lg transition-transform transform hover:bg-gray-100"
          >
            <img
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s' ||
                'default-image.jpg'
              }
              alt="Product Image"
              className="w-64 h-64 object-cover rounded-t-lg mb-4"
            />
            {editProductId === product._id ? (
              <div>
  <input
    type="text"
    value={edited.desc}
    name="desc"
    placeholder={product.desc}
    onChange={handleInput}
    className="w-26 p-2 mx-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-semibold leading-tight mb-2 break-words"
  />
  <input
    type="number"
    value={edited.price}
    name="price"
    placeholder={product.price}
    onChange={handleInput}
    className="w-26 p-2 mx-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-semibold leading-tight mb-2 break-words"
  />
</div>
            ) : (
              <div>
                <p className="text-black text-100 font-semibold leading-tight mb-2 break-words">
                  Product: {product.desc}
                </p>
                <p className="text-red-500 font-semibold">
                  <b>Price: </b>{product.price} Birr
                </p>
              </div>
            )}
            <div className="flex items-center space-x-4 mt-2">
              {editProductId === product._id && (
                <button
                  onClick={() => editProduct(product._id)}
                  className="bg-blue-500 text-white px-2 py-2 rounded cursor-pointer"
                >
                  Save Change
                </button>
              )}
              <p
                className="px-4 font-semibold text-2xl cursor-pointer"
                onClick={() => deleteProduct(product._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </p>
              <p
                className="px-4 text-2xl font-semibold cursor-pointer"
                onClick={() => handleEditClick(product._id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
