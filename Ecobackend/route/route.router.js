import { Router } from 'express';
import { fetchOrder } from '../controller/controller_admin_user.js';
import { auth } from '../controller/controller_admin_user.js';
import { productOrderForUser } from '../controller/controller_admin_user.js';
import { fetchProduct } from '../controller/controller_admin_user.js';
import {editProducts,deleteProducts,loginUser,adminSignup,adminLogin,addProduct,fetchOrders,deleteOrder,Feedbacks,fetchFeedback,userSignup,fetchProducts,deleteFeedback,productOrder} from '../controller/controller_admin_user.js';
const router = Router();
router.post('/loginAdmin',adminLogin);
router.post('/adminSignup',adminSignup);
router.post('/feedback',Feedbacks);
router.get('/fetchFeedback',fetchFeedback);
router.post('/addProduct',addProduct);
router.post('/signupuser',userSignup);
router.post('/loginuser',loginUser);
router.delete('/deleteFeedback',deleteFeedback);
router.get('/fetchProducts',fetchProducts);
router.post('/orders',productOrder);
router.get('/fetchOrders',fetchOrders);
router.delete('/deleteOrder',deleteOrder);
router.delete('/deleteProduct',deleteProducts);
router.patch('/editProduct',editProducts);
router.get('/fetchproduct',fetchProduct);
router.get('/getOrders',auth,fetchOrder);
router.post('/userOrders',auth,productOrderForUser);
export default router;