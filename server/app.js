import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import routeHandler from './src/middlewares/route_handler.middleware.js'
import connectDB from './src/configs/db.config.js'


dotenv.config();


const app=express();

app.use(cors());


app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({extended:true}));


await connectDB();

app.use(routeHandler);


export default app;