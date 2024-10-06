const Booking = require('../models/Booking')
const Car = require('../models/Car')
const User = require('../models/User')
const CatchAsync = require('../utils/Catchasync')
const AppError = require('../utils/AppError')

const findAvailableCar = CatchAsync(async(req,res,next)=>{
    const {starttime , endtime} = req.body

    const start = new Date(starttime)
    const end = new Date(endtime)
    if(starttime >= endtime)
    {
        return next(new AppError("End time must be greater than Start time",400))
    }

    const bookedCars = await Booking.find(
        {
        $or: [
            { starttime: { $lte: end }, endtime: { $gte: start } }
        ]
    }
).distinct('car')

    
    const availablecars = await Car.find({
        _id: { $nin: bookedCars } 
    })

     if(availablecars.length === 0)
     {
        return res.status(200).json({
            msg : "No cars available for the selected time, please try again in another time"
        })
     }
     return res.status(200).json({
        success : true,
        results : availablecars.length,
        availablecars
     })
})

const creatBooking = CatchAsync(async(req,res,next)=>{
    const carId = req.params.id

    const {starttime , endtime} = req.body

    const start = new Date(starttime)
    const end = new Date(endtime)

    if(starttime >= endtime)
        {
            return next(new AppError("End time must be greater than Start time",400))
        }

    const availablecar = await Booking.find({
        car : carId,
        $or : [
            {starttime : {$lt : end} , endtime : {$gt : start}}
        ]
    })

    if(availablecar.length !== 0)
    {
        return res.status(200).json({
            msg : "this car is not available for the selected time, please try again in another time"
        })
    }

    const car = await Car.findById(carId);
    const user = await User.findById(req.user._id)

    if (!car) {
        return res.status(404).json({ message: 'Car not found.' })
    }
    if (!user) {
        return res.status(404).json({ message: 'User not found.' })
    }

    const totalminutes = Math.abs(end - start) / (60*1000)
    const totalprice = car.pricePerMinute * totalminutes;

    const newBooking = new Booking({
        car,
        user,
        starttime: start,
        endtime: end,
        totalprice
    });

    await newBooking.save();

    res.status(201).json({
        success : true,
        msg: 'Booking created successfully.',
        newBooking
    });

})
module.exports = {
    findAvailableCar,
    creatBooking
}