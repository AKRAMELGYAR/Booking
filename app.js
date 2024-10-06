const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({path : './config.env'})
const mongoose = require('mongoose')

app.use(express.json())

/////////////ROUTES

///AUTH
const authRoutes = require('./routes/authRoutes')
app.use('/api/v1/auth',authRoutes)

///CARS
const carRoures = require('./routes/carRoutes')
app.use('/api/v1/cars/',carRoures)

///BOOKING
const bookingRoures = require('./routes/bookingRoutes')
app.use('/api/v1/booking/',bookingRoures)


mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT , console.log(`connected on port ${process.env.PORT}`))
)
.catch(err=>console.log(err))
