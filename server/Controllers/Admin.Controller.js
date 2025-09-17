const Users= require('../models/Doctors.model');
const PatientUser=require('../models/Users.model')
const { validationResult } = require('express-validator');
const getAllDoctors = async (req, res) => {
    try 
    {
        let Doctors = await Users.find({},{'__v': false})
        res.status(200).json(Doctors)
    } 
    catch (err) {
        res.status(500).json({ message: 'Error from Server', error: err })
    }
}

const getDoctorById = async (req, res) => {
  try {
    let doctor = await Users.findById(req.params.doctorId, { '__v': false })
                            .populate('userId', 'name email role');

    if (!doctor) {
      return res.status(404).json({ error: 'Cannot find Doctor by this id' });
    }

    const formattedDoctor = {
      _id: doctor._id,
      userId: doctor.userId._id,      // keep reference
      name: doctor.userId.name,       // flatten name
      specialization: doctor.specialization,
      licensNum: doctor.licensNum,
      availableDay: doctor.availableDay,
      description: doctor.description,
      avatar: doctor.userId.avatar
    };

    res.status(200).json(formattedDoctor);
  } catch (err) {
    res.status(500).json({ message: 'Error from Server', error: err });
  }
};



const getAllPatients = async (req, res) => {
  try {
    const Patients = await PatientUser.find(
      { role: "Patient" },   // filter by role
      { __v: 0 }             // projection to exclude __v
    )
    res.status(200).json(Patients)
  } catch (err) {
    res.status(500).json({ message: "Error from Server", error: err })
  }
}

const getPatientById = async (req, res) => {
    try 
    {
        let Patient = await PatientUser.findById(req.params.patientId,{'__v': false})
                if (!Patient){
                    return res.status(404).json({ error:'Cannot find Patient by this id' })
                }
                else{
        res.status(200).json(Patient)
                }
    } 
    catch (err) {
        res.status(500).json({ message: 'Error from Server', error: err })
    }
}

const AddDoctor = async (req, res) => {
    try 
    {
        let errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()){
        return res.status(400).json({ message: 'Bad Request', errors: errors.array() })
        } 
        else{
        let newDoctor = new Users(req.body)
        await newDoctor.save()
        res.status(201).json({ message: 'Created Successfully' })
        }
    } 
    catch (err) 
    {
        res.status(500).json({ message: 'Error from Server', error: err })
    }
}

const UpdateDoctor=async (req,res)=>{
    try{
        let id=req.params.doctorId;
        let updatedDoctor= await Users.findByIdAndUpdate(id,{$set:{...req.body}})
        if(!updatedDoctor){
            return res.status(404).json({error:'Cannot find Doctor by this id'})
        }
        else{
            res.status(200).json({message: 'Updated Successfully'})
        }
    }
    catch(err){
        res.status(500).json({message: 'Error from Server', error: err })
    }
}

const DeleteDoctor=async(req,res)=>{
    try{
        let id=req.params.doctorId;
        await Users.deleteOne({_id:id})
        res.status(200).json({ message: 'Deleted Successfully' })
    } 
    catch(err) {
        res.status(500).json({ message: 'Error from Server', error: err })
    
    }
}

module.exports = {
    AddDoctor,
    getAllDoctors,
    getAllPatients,
    getDoctorById,
    getPatientById,
    UpdateDoctor,
    DeleteDoctor
}
