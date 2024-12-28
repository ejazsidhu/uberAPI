const mongoose = require('mongoose');

async function connecttoDb() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('DB connected');
    } catch (err) {
        console.log('DB connection error:', err);
    }
}

module.exports = connecttoDb;