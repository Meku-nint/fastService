import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User,Admin,Product, Feedback,Order} from '../models/models.js';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { error } from 'console';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
export const addProduct = [
    upload.single('files'),
    async (req, res) => {
        const { price, desc, category } = req.body;

        try {
            if (!req.file) {
                return res.status(400).json({ msg: 'No file uploaded' });
            }
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            const newProduct = new Product({
                price,
                desc,
                category,
                img_url: fileUrl,
            });
            await newProduct.save();
            res.status(201).json({ message: 'Product added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding product'});
        }
    }
];
export const adminLogin = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const admin = await Admin.findOne({ email:email });
        if (!admin) {
            throw new Error('Admin not found');
        }
        const isEqual = await bcrypt.compare(password, admin.password);
        if (!isEqual) {
            throw new Error('Password is incorrect');
        }
        const token = jsonwebtoken.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '3days' }
        );
        return res.status(200).json({ token: token });
    }catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
export const adminSignup=async(req,res)=>{

    const {email,password,code}=req.body;
    try {
        if(!email||!password||!code){
           throw new Error("All Fields are required");
        }
        const exitCode=await Admin.findOne({code:code});
        if(!exitCode){
            throw new Error("Invalid Code");
        }
        const exist=await Admin.findOne({email:email});
        if(exist){
            throw new Error("The email is already exist");
        }     
        const hashedPassword=await bcrypt.hash(password,10);
        const newAdmin=new Admin({
            email,
            password:hashedPassword,
            code
        })
        await newAdmin.save();
        res.status(201).json({message:"signup is successful"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
export const fetchProducts=async(req,res)=>{
    try {
        const product=await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message:'There is no product'})
    }   
}
export const Feedbacks=async(req,res)=>{
    const {text,name}=req.body;
    try {
        const newFeedback=new Feedback({
            text,
            name
        })
        await newFeedback.save();
        res.status(201).json({message:"Thanks for your feedback"});
    } catch (error) {
        res.status(500).json({message:"Sorry your feedback is not posted."});
    } 
}
export const fetchFeedback=async(req,res)=>{
    try {
        const feedback=await Feedback.find();
        res.status(200).json(feedback);
    } catch (error) {
        res.status(400).json({message:'There is no feedback'})
    }
}
export const userSignup=async(req,res)=>{
    const {name,email,password}=req.body;
   try{
    const emailExist=await User.findOne({email:email});
    if(emailExist){
        return res.status(400).json({message:"The email is already exist"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
        name,
        email,
        password:hashedPassword
    })
    await newUser.save();
    res.status(201).json({message:"signup is successful"});

   }
    catch{
        res.status(404).json({message:error.message||"An error occurred"});
    }
}
export const deleteFeedback=async(req,res)=>{
    const {feedbackId}=req.body;
    try {
        const deleteFeedbacks=await Feedback.findByIdAndDelete(feedbackId);
        if(deleteFeedbacks){
           return  res.status(200).json({message:"The feedback is deleted "});
        }
        return res.status(400).json({message:"There is no feedback"})
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
export const productOrderForUser=async(req,res)=>{
    const { productDetail,contactInformation,deliveryLocation,deliveryDate,deliveryTime,paymentMethod,}=req.body;
    try {
     const newOrder=new Order({
        productDetail ,
        contactInformation ,
        deliveryLocation ,
        deliveryDate ,
        deliveryTime ,
        paymentMethod ,
        additionalInformation:req.user.id
     }
    )
    await newOrder.save();
    res.status(201).json({message:"Your order is successfully added we will contact soon"})
    } catch (error) {
        res.status(404).json({message:error.message||"An error occurred"});
    }
}
export const productOrder=async(req,res)=>{
    const { productDetail,contactInformation,deliveryLocation,deliveryDate,deliveryTime,paymentMethod,}=req.body;
    try {
     const newOrder=new Order({
        productDetail ,
        contactInformation ,
        deliveryLocation ,
        deliveryDate ,
        deliveryTime ,
        paymentMethod 
     }
    )
    await newOrder.save();
    res.status(201).json({message:"Your order is successfully added we will contact soon"})
    } catch (error) {
        res.status(404).json({message:error.message||"An error occurred"});
    }
}
export const fetchOrders=async(req,res)=>{
    try {
        const orders=await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status().json({message:"There is no orders."});
    }
}
export const deleteOrder = async (req, res) => {
    const { orderId } = req.body;
    
    try {
        const deletedOrders = await Order.findByIdAndDelete(orderId);
                if (!deletedOrders) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "The order was successfully deleted" });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the order" });
    }
}
export const deleteProducts=async(req,res)=>{
     const {productId}=req.body;
     try {
        const findProduct=await Product.findByIdAndDelete(productId);
        if(!findProduct){
            return res.status(404).json({message:"There product is not found ."});
        }
        const img_url=findProduct.img_url;
         if(img_url){
            const imageName = img_url.split('/').pop();
            const imagePath = path.join(__dirname, '../uploads', imageName);
            fs.unlink(imagePath, (err) => {
                if (err) {
                  console.error(err);}
              });
         }        
        res.status(200).json({message: "The product is deleted"});
     } catch (error) {
        res.status(500).json({message:"Server problem"});
     }
}
export const editProducts=async(req,res)=>{
    const {productId, price, desc}=req.body;
    try {
        const product= await Product.findByIdAndUpdate(productId,{price,desc},{new:true});
        if(!product){
            res.status(404).json({message:"The product is not founded"});
        }
       res.status(200).json({message:"Product updated successfully"})
    } catch (error) {
        res.status(404).json({message:"The product is not founded"});
    }    
} 
export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email:email});
        if(!user){
           return res.status(404).json({message:"There is no user with this email"});
        }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual){
     return res.status(401).json({message:"Password is incorrect"});
    }
       const token = jsonwebtoken.sign( { id: user._id}, process.env.JWT_SECRET, { expiresIn: '3d' });
    return res.status(200).json({token });
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}
export const auth = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
export const fetchProduct=async(req,res)=>{
    try {
        const product=await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message:"There is no product"})
    }
}
export const fetchOrder = async (req, res) => {
    try {
        const userOrder = await Order.find({additionalInformation:req.user.id});
        if (!userOrder || userOrder.length === 0) {
            throw new Error("No orders found for the user");
        }
        return res.status(200).json(userOrder);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
