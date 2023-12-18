const shortid = require('shortid');
const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const donorSchema = new Schema({
    uniqueId: {
        type: String,
        default: shortid.generate, // Generate a unique ID using shortid package
        unique: true // Ensure uniqueness of the ID in the collection
    },
    name: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
       
    },

    Address: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,

    }

});
module.exports = mongoose.model('Donor', donorSchema)