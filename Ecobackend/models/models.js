import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }})
   
const ProductSchema=new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    img_url:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})
const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
        default:"1221"
    }
})
const feedbackSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const OrderSchema=new mongoose.Schema({
    productDetail:{
        type:String,
        required:true
    },
    contactInformation:{
        type:String,
        required:true
    },
    deliveryLocation:{
        type:String,
        required:true
    },
    deliveryDate:{
        type:String,
        required:true,
    },
    deliveryTime:{
        type:String,
        required:true
    }, paymentMethod:{
        type:String,
        default:"none"
    },
    additionalInformation:{
        type:String,
        required:false
    }
},{timestamps:true}); 
const Feedback=mongoose.model('Feedback',feedbackSchema);
const Order=mongoose.model("Order",OrderSchema);
const Admin=mongoose.model('Admin',adminSchema);
const User=mongoose.model('User',userSchema);
const Product=mongoose.model('Product',ProductSchema);
export {User,Admin,Product,Feedback,Order};