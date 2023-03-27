require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const workoutRoutes= require('./routes/workoutRoutes')
const userRoutes= require('./routes/user')

//express app
const app =express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{       // setting up a global middleware which executees for every request
    console.log(req.path,req.method);   // logs the path and method for every request made as it runs for every request
    next()
})


//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)



// connect to db
mongoose.connect(process.env.MONGO_URI)  // it is an asynchronous function (takes some time to connect)
    .then(()=>{
        // listen for requests
        app.listen(process.env.PORT , ()=>{
            console.log('server is listening on port', process.env.PORT);
        })
    })
    .catch((error)=>{
        console.log(error);
    })


