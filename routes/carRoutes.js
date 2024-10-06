const express = require('express')
const router = express.Router();
const carControllers = require('../controllers/carController')
const verifyToken = require('../middlewares/verifyToken')
const verifyRoles = require('../middlewares/verifyRoles')

router.route('/')
            .get(carControllers.getcars)

router.route('/')
            .post(verifyToken , verifyRoles('admin') , carControllers.addCar)

router.route('/:id')
            .patch(verifyToken,verifyRoles('admin'),carControllers.updatecar)

router.route('/:id')
            .delete(verifyToken,verifyRoles('admin'),carControllers.deletecar)

module.exports = router