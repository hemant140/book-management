import express from 'express'
import dotenv from 'dotenv'
import { errorHandler, notFound } from './app/middleware/error-handler.middleware.js';
import routes from './app/routes.js';
import { connectDB } from './app/config/db.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 9000

//Database connection
connectDB();

app.use(express.json());

app.use('/v1/api',routes)

app.get('/',(req,res)=>{
    res.json({message:`Server is running on port ${PORT}`})
})


// Error handler middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})