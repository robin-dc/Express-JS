const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});


// Resource not found middleware
app.use((req, res, next) => {
  const error =  new Error("Sorry, the requested resource couldn't be found")
  error.statusCode = 404
  next(error);
})

// Catch all errors middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500)
  const body = {
    message: err.message,
    statusCode: err.statusCode || 500
  }
  res.json(body)
})

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
