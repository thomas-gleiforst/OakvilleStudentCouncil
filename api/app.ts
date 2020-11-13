import express from 'express'

const app = express()
const port = process.env.PORT || 8080

// TODO: Configure body parser

// Home route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Register routes

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}.`)
})
