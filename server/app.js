import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./src/config/database.config.js";
import user_router from "./src/routes/user.route.js";

import routeHandler from "./src/middlewares/route_handler.middleware.js";


dotenv.config();


const app=express();

app.use(cors());


app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({extended:true}));


await connectDB();

app.use('/v1/api',user_router);
app.use(routeHandler);


export default app;