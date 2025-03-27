import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate();
  const [response,setResponse]=useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isChecked,setIsChecked]=useState(false);
  const [orderData,setOrderData]=useState({
    productDetail: '',
    contactInformation: '',
    deliveryLocation: '',
    deliveryDate: '',
    deliveryTime: '',
    paymentMethod: '',
    additionalInformation:''
  })
  useEffect(() => {
    const fetchProducts = async () => {
      const token=localStorage.getItem('token');
      if(!token){
        navigate('/signup');
        return;
      }
      try {
        const res = await axios.get('https://fastservice.onrender.com/abc/fetchproduct',{
          headers:{Authorization:`Bearer ${token}`}
        });
        const productsWithQuantity = res.data.map((product) => ({
          ...product,
          quantity: 0, 
        }));
        setProducts(productsWithQuantity);
        setFilteredProducts(productsWithQuantity);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);
  const filterByCategory = (category) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredBySearch = filteredProducts.filter(
    (product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const orderHandler=async(event)=>{
    const { name, value } = event.target;
    setOrderData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }
  const handleSort = () => {
    const sorted = [...filteredBySearch].sort((a, b) => a.price - b.price);
    setFilteredProducts(sorted);
  };
  const handleIncrement = (id) => {
    const updatedProducts = products.map((product) =>
      product._id === id ? { ...product, quantity: product.quantity + 1 } : product
    );
    setTotalQuantity(totalQuantity + 1);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    updateCartItems(updatedProducts);
  };
  const handleDecrement = (id) => {
    setTotalQuantity(totalQuantity + 1);
    const updatedProducts = products.map((product) =>
      product._id === id && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    updateCartItems(updatedProducts);
  };
  const submitOrders=async(event)=>{
    event.preventDefault();
        for(let i=0;i<cartItems.length;i++){
          orderData.productDetail+=cartItems[i].desc+ "  Quantity "+ cartItems[i].quantity +"    ";
          if(i===cartItems.length-1){
             orderData.productDetail+="Total Price " +totalPrice;
          }
        }
    try {
      const res=await axios.post("https://fastservice.onrender.com/abc/orders",orderData);
      console.log(res.data.message);
      setResponse(res.data.message);
    } catch (error) {
      setResponse(error.response.data.message);
      console.log(error.res?.message||"There is a problem");
    }
    setOrderData({
      productDetail: '',
      contactInformation: '',
      deliveryLocation: '',
      deliveryDate: '',
      deliveryTime: '',
      paymentMethod: '',
      additionalInformation:''
    })
  }
  const updateCartItems = (products) => {
    const itemsInCart = products.filter((product) => product.quantity > 0);
    setCartItems(itemsInCart);

    const total = itemsInCart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotalPrice(total);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-16">
      <div className="flex flex-wrap items-center justify-between mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-wrap space-x-2 bg-red-100 rounded-md py-4 px-2">

<button
  onClick={() => filterByCategory('electronic device')}
  className="cursor-pointer px-2 py-2 m-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-300"
>
  Electronic Devices
</button>
<button
  onClick={() => filterByCategory('cloth')}
  className="cursor-pointer px-2 m-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition ease-in-out duration-300"
>
  Cloth & Shoes
</button>
<button
  onClick={() => filterByCategory('food')}
  className="cursor-pointer px-2 py-2 m-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-300"
>
  Foods
</button>
<button
  onClick={handleSort}
  className="cursor-pointer m-4 px-2 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ease-in-out duration-300"
>
  Sort by Price
</button>
<button
  onClick={() => filterByCategory('All')}
  className="cursor-pointer px-2 py-2 m-4  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
>
  All Products
</button>
<input
  type="search"
  placeholder="product name 🔍"
  value={searchTerm}
  onChange={handleSearchChange}
  className="w-full sm:w-1/3 mt-4 sm:mt-0 px-2 py-2 bg-white text-gray-800 border-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
/>
</div>
      
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBySearch.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">No products found</p>
          ) : (
            filteredBySearch.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"|| 'default-image.jpg'}
                  alt={item.desc}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-6  bg-white">
                  <h4 className="text-lg text-gray-600 mt-2 font-medium">{item.desc}</h4>
                  <h5 className="text-xl font-bold  mt-2">{item.price} Birr</h5>
                  </div>
                  <div className="flex items-center gap-4 mt-4   justify-between">
                    <p
                      className="cursor-pointer hover:bg-gray-300 p-1 rounded text-white"
                      onClick={() => handleDecrement(item._id)}
                    >
                      ➖
                    </p>
                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                    <p href="#bottom"
                      className="cursor-pointer hover:bg-gray-300 p-1 rounded text-white"
                      onClick={() => handleIncrement(item._id)}
                    >
                      ➕
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    {totalQuantity >0&& (
  <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto" id="carts">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Cart Summary</h3>
  <table className="w-full mt-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 text-left">Product</th>
        <th className="px-4 py-2 text-left">Quantity</th>
        <th className="px-4 py-2 text-left">Price</th>
        <th className="px-4 py-2 text-left">Total</th>
      </tr>
    </thead>
    <tbody>
      {cartItems.map((item) => (
        <tr key={item._id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-2">{item.desc}</td>
          <td className="px-4 py-2">{item.quantity}</td>
          <td className="px-4 py-2">{item.price.toFixed(2)} Birr</td>
          <td className="px-4 py-2">{(item.price * item.quantity).toFixed(2)} Birr</td>
        </tr>
      ))}
    </tbody>
  </table>
  <p className="text-xl text-gray-700 mt-4">
    Total Price: <span className="font-bold">{totalPrice.toFixed(2)} Birr</span>
  </p>
  <label className="flex items-center mt-6 space-x-2">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
      className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
    />
    <span className="text-gray-700">
      Are you sure to purchase the above products with the respective quantity?
    </span>
  </label>
  
  {isChecked && (
    <form onSubmit={submitOrders} className="mt-6 space-y-4">
      <div className="space-y-2">
        <textarea
          name="contactInformation"
          placeholder="Enter contact information (phone, etc.)"
          value={orderData.contactInformation}
          onChange={orderHandler}
          required
          rows="2"
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white "
        />
        <textarea
          name="deliveryLocation"
          placeholder="Enter delivery location"
          value={orderData.deliveryLocation}
          onChange={orderHandler}
          required
          rows="2"
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
  type="date"
  min={new Date().toISOString().split("T")[0]}
  name="deliveryDate"
  value={orderData.deliveryDate}
  onChange={orderHandler}
  required
  className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
/>
        <input
          type="time"
          name="deliveryTime"
          value={orderData.deliveryTime}
          onChange={orderHandler}
          required
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>  

      <select
          name="paymentMethod"
          required
          value={orderData.paymentMethod}
          onChange={orderHandler}
          className="border-2 border-gray-300 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-500 hover:border-indigo-500 transition-colors appearance-none wrap"
        >
          <option value="" disabled>Select Payment Method And Pay the required amount</option>
          <option value="telebirr">TeleBirr (+251654323452)</option>
          <option value="cbe">CBE (1000000000000)</option>
          <option value="abilysinia">Abysinia (5643243)</option>
        </select>
        <p className="mt-4 text-center text-black-700 text-xl">Send the screenshot of the payment on telegram bot  <a href='' className="text-indigo-500 hover:text-indigo-600 transition-colors"> @fast_Service</a></p>
        {<p className="mt-4 text-center text-red-500 text-xl animate-bounce motion-reduce:animate-none">{response}</p>}    
      
      <button
        type="submit"
        className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit Order
      </button>
    </form>
  )}
</div>
    )}
    </div>
  );
};
export default Home;
