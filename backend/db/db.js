const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error");
        console.log("Message: " + error);
    }
}

module.exports = {db};