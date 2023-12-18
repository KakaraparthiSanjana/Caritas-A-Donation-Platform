// payment.model.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentMethodId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor', // Assuming you have a User schema
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', paymentSchema);
