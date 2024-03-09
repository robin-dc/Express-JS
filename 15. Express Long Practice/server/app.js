const express = require('express');
const app = express();
require('express-async-errors')
const dogsRoute = require('./routes/dogs');
require('dotenv').config()

// logger middleware
console.log(process.env.NODE_ENV)
app.use((req, res, next) => {
  console.log(req.method, req.url)
  res.on('finish', () => {
    console.log(res.statusCode)
  })
  next()
})

// middlewares
app.use('/static', express.static('assets'))
app.use(express.json())

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});


app.use('/dogs', dogsRoute)



// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

app.use((req, res, next) => {
  const error = new Error("Resource not found")
  error.statusCode = 404
  next(error)
})

// error handler middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : "must be dev",
  })
})



const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
