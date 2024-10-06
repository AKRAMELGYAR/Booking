const express = require('express')
const router = express.Router();
const BookingControllers = require('../controllers/bookingController')
const verifytoken = require('../middlewares/verifyToken')

router.route('/')
        .post(BookingControllers.findAvailableCar)

router.route('/:id')
        .post(verifytoken,BookingControllers.creatBooking)



module.exports = router