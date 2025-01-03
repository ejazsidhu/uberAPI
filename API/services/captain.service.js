const userModel = require('../models/user.model');
const Captain = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, platenumber, capacity, type
}) => {
    console.log(firstname, lastname, email, password, color, platenumber, capacity, type)
    if (!firstname || !email || !password || !color || !platenumber || !capacity || !type) {
        throw new Error('All fields are required');
    }

    const hashedPassword = await Captain.hashPassword(password);

    const captain = await Captain.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashedPassword,
        vehicle: {
            color,
            platenumber,
            capacity,
            type
        }
        });

    return captain;
};