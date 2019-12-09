const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    serviceName: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    serviceUrl: {
        type: String,
        required: true
    },
    availableSpot: {
        type: Number,
        required: true
    },
    serviceColor: {
        type: String,
        required: true
    },
    serviceDuration: {
        type: String,
        required: true
    },
    dateRange: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    frequencyOfAvailableTime: {
        type: Number,
        required: true
    },
    acceptableAmountOfService: Number,
    minimumSchedulingNotice: Number,
    serviceBuffer: {
        beforeService: Number,
        afterService: Number
    },
    isSecret: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);