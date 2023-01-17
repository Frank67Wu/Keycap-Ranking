require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const keycapsRoutes = require('./routes/keycaps')
mongoose.set('strictQuery', false);

//express app
const app = express()


// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/keycaps', keycapsRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, ()=> {
            console.log("hello world")
        })
    })
    .catch((error => {
        console.log(error)
    }))

