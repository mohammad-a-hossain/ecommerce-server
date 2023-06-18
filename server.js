const express = require('express')
const mongoose =require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookiParser = require('cookie-parser')
const expressValidator= require('express-validator')
const cors = require("cors");
require('dotenv').config()
const crypto = require('crypto')
//const uuidv1 = require('uuid') 
const { notFound,errorHandler } = require("./Admin-pannel/helper/dbErrorHandler");




const adminRouter = require('./Admin-pannel/routes/admin')


// app scaffolding
const app = express()


const uri = process.env.DATABASE;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: 
true });

const connection = mongoose.connection;


try{
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
} catch(err) {
console.log(err);
}

// middleware
app.use(morgan('dev'));
app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json({limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookiParser())
app.use(expressValidator())
app.use(cors());


// app.get('/', (req,res,next) =>{
//    res.status(200).json({
//     message:'this is get server menthod'
//    }) 
// })


app.use('/api/admin', adminRouter)
app.use(notFound);
app.use(errorHandler);

// use port

const port = process.env.PORT || 7777

app.listen(port, ()=> console.log(`server is running on port ${port}`))












// //import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// //import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import userRoutes from './routes/userRoutes.js';

// const port = process.env.PORT || 5000;

// connectDB();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use('/api/users', userRoutes);

// // if (process.env.NODE_ENV === 'production') {
// //   const __dirname = path.resolve();
// //   app.use(express.static(path.join(__dirname, '/frontend/dist')));

// //   app.get('*', (req, res) =>
// //     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
// //   );
// // } else {
// //   app.get('/', (req, res) => {
// //     res.send('API is running....');
// //   });
// // }

// // app.use(notFound);
// // app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`));















































// const express = require('express')
// const mongoose =require('mongoose')
// const morgan = require('morgan')
// const bodyParser = require('body-parser')
// const cookiParser = require('cookie-parser')
// const expressValidator= require('express-validator')
// const cors = require("cors");
// require('dotenv').config()
// const crypto = require('crypto')
// //const uuidv1 = require('uuid') 




// const adminRoutes = require('./Admin-pannel/routes/admin')


// // app scaffolding
// const app = express()


// const uri = process.env.DATABASE;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: 
// true });

// const connection = mongoose.connection;


// try{
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })
// } catch(err) {
// console.log(err);
// }

// // middleware
// app.use(morgan('dev'));
// app.use(express.json({ limit: "5mb" }));
// app.use(bodyParser.json({limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cookiParser())
// app.use(expressValidator())
// app.use(cors());


// app.get('/', (req,res,next) =>{
//    res.status(200).json({
//     message:'this is get server menthod'
//    }) 
// })


// app.use('/api', adminRoutes)


// // use port

// const port = process.env.PORT || 7777

// app.listen(port, ()=> console.log(`server is running on port ${port}`))