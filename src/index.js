// require('dotenv').config({path:'./env'})

import express from 'express'
import connectDB from './db/index.js';
import { config } from "dotenv";

config(); 

const app=express();


connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("listening server at port "+process.env.PORT)
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed".err);
})

