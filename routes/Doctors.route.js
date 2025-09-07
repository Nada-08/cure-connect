const express=require('express')
const router=express.Router()
const validation=require('../middlewares/Validation')
const AllowedTo=require('../middlewares/AllowedTo')
const DoctorController=require('../Controllers/Doctors.Controller')
const verifyToken = require('../middlewares/VerifyToken')

router.route('/')
            .get(verifyToken,AllowedTo('doctor'),DoctorController.get_pending_Appointment)

module.exports=router