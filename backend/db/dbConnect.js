const mongoose = require("mongoose");

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected..");

    } catch (error) {
        console.log(`Database Not Connected  ${error}`);
    }
}

module.exports = { connect }