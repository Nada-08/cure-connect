const AppointmentModel = require("../models/Appointment.model")
const { validationResult } = require('express-validator');
const Add_Appointment = async (req, res) => {
    try 
    {
        let errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()){
        return res.status(400).json({ message: 'Bad Request', errors: errors.array() })
        } 
        else{
        let newAppointment = new AppointmentModel(req.body)
        await newAppointment.save()
        res.status(201).json({ message: 'Created Successfully' })
        }
    } 
    catch (err) 
    {
        res.status(500).json({ message: 'Error from Server', error: err })
    }
}

const Update_Appointment=async (req,res)=>{
    try{
        let id=req.params.AppointmentId;
        let updated_Appointment= await AppointmentModel.findByIdAndUpdate(id,{$set:{...req.body}},{new:true})
        if(!updated_Appointment){
            return res.status(404).json({error:'Cannot find Appointment by this id'})
        }
        else{
            res.status(200).json({message: 'Updated Successfully'})
        }
    }
    catch(err){
        res.status(500).json({message: 'Error from Server', error: err })
    }
}

const Delete_Appointment=async(req,res)=>{
    try{
        let id=req.params.AppointmentId;
        const deleted=await  AppointmentModel.deleteOne({_id:id})
        if(deleted.deletedCount ===0){
            return res.status(404).json({ error: 'Cannot find Appointment by this id' });
        }
        res.status(200).json({ message: 'Deleted Successfully' })
    } 
    catch(err) {
        res.status(500).json({ message: 'Error from Server', error: err })
    
    }
}

module.exports={
    Add_Appointment,
    Delete_Appointment,
    Update_Appointment
}