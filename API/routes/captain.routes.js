const express = require('express');
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const router = express.Router();


router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.platenumber').notEmpty().withMessage('Vehicle plate number is required').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),
    body('vehicle.capacity').notEmpty().withMessage('Vehicle capacity is required').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.type').notEmpty().withMessage('Vehicle type is required').isIn(['car', 'motorcycle', 'van', 'truck', 'auto rickshaw']).withMessage('Invalid vehicle type')
],captainController.registerCaptain );

router.get('/:id', captainController.getCaptainById);

// router.put('/:id', [
//     body('fullname.firstname').optional().notEmpty().withMessage('Name is required'),
//     body('email').optional().isEmail().withMessage('Valid email is required'),
//     body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//     body('vehicle.color').optional().notEmpty().withMessage('Vehicle color is required').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
//     body('vehicle.platenumber').optional().notEmpty().withMessage('Vehicle plate number is required').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),
//     body('vehicle.capacity').optional().notEmpty().withMessage('Vehicle capacity is required').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
//     body('vehicle.type').optional().notEmpty().withMessage('Vehicle type is required').isIn(['car', 'motorcycle', 'van', 'truck', 'auto rickshaw']).withMessage('Invalid vehicle type')
// ], captainController.updateCaptain);

router.delete('/:id', captainController.deleteCaptain);

router.get('/', captainController.getAllCaptains);

module.exports = router;