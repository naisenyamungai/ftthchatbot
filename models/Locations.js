const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationsSchema = new Schema({
    estate: String
    
});

mongoose.model('location', locationsSchema);