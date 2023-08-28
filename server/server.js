import chalk from 'chalk';
import express from 'express';
import dotenv from 'dotenv'

const app = express();
const Port = process.env.PORT || 5000

// Database Connection 
import connectDb from './config/db.js'
dotenv.config({path: './config/.env'});
connectDb();


app.listen(Port, () => console.log(chalk.blueBright(`Server is upto ${Port}`)))