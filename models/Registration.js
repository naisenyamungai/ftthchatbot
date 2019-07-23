const mongoose = require('mongoose');
const {Schema } = mongoose;

const registrationSchema = new Schema({
    
    estate: String,
    
});

mongoose.model('registration, registrationSchema');