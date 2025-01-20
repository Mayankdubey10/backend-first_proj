// require('dotenv').config({path:'./env'})

import express from 'express'
import connectDB from './db/index.js';
import { config } from "dotenv";

config(); 

const app=express();


connectDB();

