const Appointment=require('../models/Appointment.model')
const { validationResult } = require('express-validator')
const get_pending_Appointment=async (req, res) => {
    try 
    {
        let appointment = await Appointment.find({},{'__v': false})
            if (!appointment){
                    return res.status(404).json({ error: 'No appointments found' })
                }
        res.status(200).json(appointment)
                
    } 
    catch (err) {
        res.status(500).json({ message: 'Error from Server', error: err })
    }
}
module.exports={
    get_pending_Appointment
}