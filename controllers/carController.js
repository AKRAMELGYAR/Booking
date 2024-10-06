const Car = require('../models/Car')
const Catchasync = require('../utils/Catchasync')
const Apperror = require('../utils/AppError')
const User = require('../models/User')

const getcars = Catchasync(async(req,res,next)=>{
    const cars = await Car.find()
    res.status(200).json({
        success : true,
        Results : cars.length,
        cars
    })
})

const addCar = Catchasync(async(req,res,next)=>{
    const newcar = new Car({...req.body})
    await newcar.save({runValidators : true})
    res.status(201).json({
        success : true,
        msg : 'car added successfully',
        newcar
    })
})

const updatecar = Catchasync(async(req,res,next)=>{
    const car = await Car.findByIdAndUpdate(req.params.id,{...req.body})
    if(!car)
    {
        return next(new Apperror('Car not found',404))
    }
    return res.status(200).json({
        success : true,
        msg : "Car updated successfully",
        car
    })
})

const deletecar = Catchasync(async(req,res,next)=>{
    const car = await Car.findByIdAndDelete(req.params.id)
    if(!car)
    {
        return next(new Apperror('Car not found',404))
    }
    return res.status(200).json({
        success : true,
        msg : "Car deleted successfully",
    })
})

module.exports = {
    getcars,
    addCar,
    updatecar,
    deletecar
}