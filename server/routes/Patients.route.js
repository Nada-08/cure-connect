const express=require('express')
const router=express.Router()
const validation=require('../middlewares/Validation')
const patientValidation=require('../middlewares/PatientValidation')
const AllowedTo=require('../middlewares/AllowedTo')
const PatientController=require('../Controllers/Patients.Controller')
const verifyToken = require('../middlewares/VerifyToken')

router.route('/')
            .post(verifyToken,AllowedTo('Patient'), patientValidation.addAppointment,PatientController.Add_Appointment)
router.route('/:AppointmentId')
            .get(verifyToken, AllowedTo('Patient'), PatientController.getAppointmentById)
            .patch(verifyToken,AllowedTo('Patient'),patientValidation.updateAppointment,PatientController.Update_Appointment)
            .delete(verifyToken,AllowedTo('Patient','doctor'), patientValidation.deleteAppointment,PatientController.Delete_Appointment)

module.exports=router