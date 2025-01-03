
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');


module.exports.registerCaptain    = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
console.log('request',req.body)
    const existingCaptain = await captainModel.findOne({email});
    if (existingCaptain) { 
        return res.status(400).json({ error: 'Captain already exists' });
    }
    const existingVehicle = await captainModel.findOne({ 'vehicle.platenumber': vehicle.platenumber });
    if (existingVehicle) {
        return res.status(400).json({ error: 'Vehicle with this plate number already exists' });
    }

           try {
            const newCaptain = await captainService.createCaptain({
                firstname:fullname.firstname,
                lastname:fullname.lastname,
                email,
                password,
                color:vehicle.color,
                platenumber:vehicle.platenumber,
                capacity:vehicle.capacity,
                type:vehicle.type,
            });
    
            const token = newCaptain.generateAuthToken();
            res.status(201).json({ token,newCaptain });
           } catch (error) {
               res.status(500).json({ error: 'Server error' });
           }
          
        
  
}

module.exports.getAllCaptains = async (req, res) => {
    try {
        const captains = await captainModel.find();
        res.status(200).json(captains);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.getCaptainById = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.params.id);
        if (!captain) {
            return res.status(404).json({ error: 'Captain not found' });
        }
        res.status(200).json(captain);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.updateCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedCaptain = await captainModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCaptain) {
            return res.status(404).json({ error: 'Captain not found' });
        }
        res.status(200).json(updatedCaptain);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.deleteCaptain = async (req, res) => {
    try {
        const deletedCaptain = await captainModel.findByIdAndDelete(req.params.id);
        if (!deletedCaptain) {
            return res.status(404).json({ error: 'Captain not found' });
        }
        res.status(200).json({ message: 'Captain deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}