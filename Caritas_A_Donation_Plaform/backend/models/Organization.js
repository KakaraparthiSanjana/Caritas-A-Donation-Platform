const shortid = require('shortid');
const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const OrganizationSchema = new Schema({
    uniqueId: {
        type: String,
        default: shortid.generate, // Generate a unique ID using shortid package
        unique: true // Ensure uniqueness of the ID in the collection
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    registrationnumber: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required:true,
    },
    Address: {
        type: String,
        require: true,
    },
    requirements: {
        type: String,
        
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    ManagerName:{
        type: String,
        require: true,
    },
    About:{
        type: String,
        require: true,
    }


});
module.exports = mongoose.model('Organization', OrganizationSchema)