import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import routeHandler from './src/middlewares/route_handler.middleware.js'
import connectDB from './src/configs/db.config.js'
import user_router from './src/routes/user.routes.js'
import event_router from './src/routes/event.routes.js'
import ticket_router from './src/routes/ticket.routes.js'
import organizer_router from './src/routes/organizer.routes.js'
import dashboard_router from './src/routes/dashboard.routes.js'

dotenv.config();


const app=express();

app.use(cors());
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({extended:true}));


await connectDB();

app.use('/v1/user',user_router);
app.use('/v1/user/event',event_router);
app.use('/v1/user/ticket',ticket_router);
app.use('/v1/organizer',organizer_router);
app.use('/v1/dashboard',dashboard_router);

app.use(routeHandler);


export default app;