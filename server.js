const express = require('express')
const mongoose =require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config()
const adminRoutes = require('./routes/admin')


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
app.use(cors());


app.get('/', (req,res,next) =>{
   res.status(200).json({
    message:'this is get server menthod'
   })
})


app.use('/api', adminRoutes)


// use port

const port = process.env.PORT || 7777

app.listen(port, ()=> console.log(`server is running on port ${port}`))