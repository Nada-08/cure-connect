const express = require('express')
const userController = require('../Controllers/user.controller')
const multer = require('multer')
const verifyToken = require('../middlewares/VerifyToken')

const userRouter = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, 'uploads')
    },
    filename: function(req, file,cb){
        let ext = file.mimetype.split('/')[1]
        let fileName = `user-${Date.now()}.${ext}`
        cb(null, fileName)
    }
})

const fileFilter = function(req,file,cb){
    let type = file.mimetype.split('/')[0]
    if(type !=='image') return cb(new Error('This file is not an image'),false)
    
    cb(null,true)
}

const upload = multer({ storage:storage, fileFilter: fileFilter})

userRouter.route('/').get(verifyToken, userController.getAllUsers)

userRouter.route('/register').post(upload.single('avatar'), userController.register)

userRouter.route('/login').post(userController.login)

userRouter.route('/me').get(verifyToken, userController.getMe)

userRouter.route('/my-appointments').get(verifyToken, userController.getUserAppointments)

userRouter.route('/:AppointmentId').delete(verifyToken, userController.Delete_Appointment)

module.exports = userRouter