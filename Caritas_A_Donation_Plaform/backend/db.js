const mongoose = require('mongoose');
mongoURI = "mongodb+srv://harinath:Hari99899@cluster0.wgdf4jg.mongodb.net/?retryWrites=true&w=majority";
//            mongodb+srv://HariNath:harinath@cluster0.odwvgjn.mongodb.net/?retryWrites=true&w=majority
const connectTOMongo = () => {
    mongoose.connect(mongoURI);
    console.log("mongodb connected Successfully");
}
module.exports = connectTOMongo;
