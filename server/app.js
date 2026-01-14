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

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://event-listing-platform-esla.vercel.app"
  ],
  credentials: true
}));


app.use(cookieParser());

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit:'10mb'}));


await connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Backend is ready and running!",
    timestamp: new Date().toISOString()
  });
});

app.use('/v1/user/event',event_router);
app.use('/v1/user/ticket',ticket_router);
app.use('/v1/user',user_router);
app.use('/v1/organizer',organizer_router);
app.use('/v1/dashboard',dashboard_router);

app.use(routeHandler);


export default app;