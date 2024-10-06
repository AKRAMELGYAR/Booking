const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    Brand : {
        type : String,
        required : [true , 'Car brand is required']
    },

    model : {
        type : String,
        required : [true , 'Car model is required']
    },

    year : {
        type : Number,
        required : [true , 'Manufacture year is required'],
    },

    type: {
        type: String,
        enum: ['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'truck', 'van'],
        required: [true, 'Car type is required'],
        default: 'sedan'
    },

    seats: {
        type: Number,
        required: [true, 'Number of seats is required'],
        min: [2, 'Car must have at least 2 seats']
    },

    pricePerMinute: {
        type: Number,
        required: [true, 'Price per minute is required'],
        min: [0, 'Price must be a positive number']
    },

    isAvailable : {
        type : Boolean,
        default : true
    },

    images:[
        {
            type: String,
            required: false,
        }
    ],

    features: {
        gps: { type: Boolean, default: false },
        bluetooth: { type: Boolean, default: false },
        airConditioning: { type: Boolean, default: false },
        automatic: { type: Boolean, default: false }
    },

    description: {
        type: String,
        trim: true,
        maxlength: 500
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Car' , CarSchema)