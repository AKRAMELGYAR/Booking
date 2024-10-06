const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    car : {
        type : mongoose.Schema.ObjectId,
        ref : 'Car',
        required : true
    },

    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'user',
        required : true
    },

    starttime : {
        type : Date,
        required : [true , "Booking start time is required"],
    },

    endtime : {
        type : Date,
        required : [true , "Booking end time is required"],
    },

    duration : {
        type : Number,
    },

    totalprice : {
        type : Number,
    },

    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Booking' , bookingSchema)