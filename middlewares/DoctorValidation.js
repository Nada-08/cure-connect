const { body, param } = require('express-validator');const doctorValidation = {
  getPatientById: [
    param('patientId').isMongoId().withMessage('Invalid patient ID'),
  ],
  deleteAppointment: [
    param('AppointmentId').isMongoId().withMessage('Invalid appointment ID'),
  ],
};

module.exports = doctorValidation;