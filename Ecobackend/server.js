import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/Connect.js'
import autoRoute from './route/route.router.js'
const app=express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
  app.use('/abc',autoRoute);
const PORT =process.env.PORT;
await connectDB();
app.listen(PORT,()=>{
 console.log("The server is connected on port ",PORT);
})