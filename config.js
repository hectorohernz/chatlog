const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('useFindAndModify', false);
const connectMongoDB = async () => {
    try{
    await mongoose.connect(process.env.MONGODB_KEY, {
        useNewUrlParser: true, // NewUrlPaser 
        useUnifiedTopology: true, // Required for DeprecationWarning: current Server Discovery and Monitoring engine is deprecated,
        useCreateIndex: true
    })
    console.log("MongoDB Connected !!!")
    } catch(err){
        console.log(err.message);
        // Exit Process with failure
        process.exit(1);
    }
}

module.exports = connectMongoDB;
