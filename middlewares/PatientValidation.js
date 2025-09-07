const { body, param } = require('express-validator');
const patientValidation = {
  getDoctorById: [
    param('doctorId').isMongoId().withMessage('Invalid doctor ID'),
  ],

  addAppointment: [
    body('doctorId').isMongoId().withMessage('Valid doctor ID is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('time').notEmpty().withMessage('Time is required'),
    body('reason').notEmpty().withMessage('Reason is required'),
  ],

  updateAppointment: [
    param('AppointmentId').isMongoId().withMessage('Invalid appointment ID'),
    body('date').optional().isISO8601().withMessage('Invalid date'),
    body('time').optional().notEmpty().withMessage('Time is required'),
    body('reason').optional().notEmpty().withMessage('Reason is required'),
  ],

  deleteAppointment: [
    param('AppointmentId').isMongoId().withMessage('Invalid appointment ID'),
  ],
};
module.exports=patientValidation;