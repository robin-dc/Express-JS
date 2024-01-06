const express = require("express")
const app = express()



app.get('/', (req, res) => {
    res.status(201)
    res.send("Welcome to the backend world!")
})

app.get('/prospect/lead', (req, res) => {
    res.status(201)
    res.send("Prospect Lead Page!!")
})

const port = 5001
app.listen(port, () => console.log('Server listening on port ', port))
