//imports
require("dotenv").config()
const express = require("express");
const mongoose = require('mongoose')
const app = express();
const errorHandler = require('./middlewares/errorMiddleware')
const productRouter = require('./routes/product.route')

// log middleware
app.use((req, res, next) => {
    console.log(req.method, req.url)
    res.on('finish', () => {
        console.log(res.statusCode)
    })
    next()
})

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// serve static files
app.use('/static', express.static('public'))


// route handlers
app.get('/', (req, res) => {
    res.status(200).send("Okay")
})

app.use('/api/products', productRouter)


// error test
app.get('/error', (req, res) => {
    throw new Error("Hello Error!")
});

// no endpoint handler
app.use((req, res, next) => {
    const error = new Error("Resource not found!")
    error.statusCode = 404
    next(error)
})


// error middleware
app.use(errorHandler)

// MONGO DB connection
const port = process.env.PORT || 8080;

(async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        if(connection){
            console.log('Connected to the Database!')
            app.listen(port, () => console.log("Server listening on port " + port));
        }
        else{
            console.log("Database Failed to Connect!")
        }
    }
    catch(err){
        console.log("No Database Detected!", err.message)
    }
})()
