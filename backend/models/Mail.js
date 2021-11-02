const mongoose = require('mongoose');

const MailSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true},
    phone: { type: String, required: true, trim: true},
    subject: { type: String, required: true, trim: true},
    message: { type: String, required: true, trim: true},
}, {timestamps: true});

module.exports = mongoose.model('Mail', MailSchema)