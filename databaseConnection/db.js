const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("DB connection established");
    } catch (error) {
        console.log("Error while connecting to DB", error);
    }
}

module.exports = dbConnection;