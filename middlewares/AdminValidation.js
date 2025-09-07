const { body, param } = require('express-validator');

const adminValidation = {
  addDoctor: [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 chars'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('specialization').notEmpty().withMessage('Specialization is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  ],

  updateDoctor: [
    param('doctorId').isMongoId().withMessage('Invalid doctor ID'),
    body('name').optional().isLength({ min: 3 }).withMessage('Name must be at least 3 chars'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('specialization').optional().notEmpty().withMessage('Specialization is required'),
  ],

  deleteDoctor: [
    param('doctorId').isMongoId().withMessage('Invalid doctor ID'),
  ],

  getDoctorById: [
    param('doctorId').isMongoId().withMessage('Invalid doctor ID'),
  ],

  getPatientById: [
    param('patientId').isMongoId().withMessage('Invalid patient ID'),
  ],
};
module.exports=adminValidation;