const mongoose = require('mongoose');
const { Schema } = mongoose;

const demandSchema = new Schema({
    estate: String
});

mongoose.model('demand', demandSchema);