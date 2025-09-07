const { body } = require('express-validator');
const authValidation = {
  register: [
    body('name').notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email').notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').notEmpty().withMessage('Role is required')
      .isIn(['admin', 'doctor', 'patient']).withMessage('Role must be (admin,doctor or patient)'),
  ],

  login: [
    body('email').notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ]
};
module.exports=authValidation;